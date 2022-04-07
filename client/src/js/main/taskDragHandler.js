import { iconDelete } from "../constants/imagePath.js";

export const setTaskDragEvent = () => {
  const taskList = [...document.querySelectorAll(".column__task--list")];
  taskList.forEach((taskList) => {
    const taskItems = [...taskList.children];
    taskItems.forEach(setMouseEvent);
  });
};

const setMouseEvent = (element) => {
  element.addEventListener("mousedown", mouseDownHandler);
};

const isDeleteButton = (target) => target.classList.contains("column__task--delete-button");

const mouseDownHandler = (event) => {
  const target = event.target;

  if (isDeleteButton(target)) {
    return;
  }

  const taskElement = target.closest("li");
  const copyTaskElement = createCopyTask(taskElement);
  document.body.appendChild(copyTaskElement);

  const moveAt = createMoveAtFunc(event, taskElement, copyTaskElement);
  moveAt(event.pageX, event.pageY);
  setDocumentEvent(moveAt);
};

const createCopyTask = (taskElement) => {
  const [sectionElement] = [...taskElement.children];
  const copyTaskElement = document.createElement("li");
  copyTaskElement.style.width = "308px";
  copyTaskElement.ondragstart = () => false;
  copyTaskElement.dataset.index = taskElement.dataset.index;
  copyTaskElement.classList.add("column__task--item", "dragging");
  copyTaskElement.innerHTML = createTaskHTML([...sectionElement.children]);
  copyTaskElement.addEventListener("mouseup", mouseUpHandler);
  return copyTaskElement;
};

const createTaskHTML = ([header, comment, author]) => {
  const [title] = [...header.children];
  return /* html */ `
    <section>
      <div class="section__header">
        <input readonly type="text" class="column__task--title" value="${title.value}" />
        <img src="${iconDelete}" class="column__task--delete-button" />
      </div>
      <textarea readonly class="column__task--comment" spellcheck="false">${comment.value}</textarea>
      <span class="column__task--author">${author.innerText}</span>
    </section>`;
};

const getShiftCoordinate = (event, taskElement) => {
  const shiftX = event.clientX - taskElement.getBoundingClientRect().left;
  const shiftY = event.clientY - taskElement.getBoundingClientRect().top;
  return { shiftX: shiftX, shiftY: shiftY };
};

const createMoveAtFunc = (event, originElement, copyElement) => {
  const { shiftX, shiftY } = getShiftCoordinate(event, originElement);
  return (pageX, pageY) => {
    copyElement.style.left = pageX - shiftX + "px";
    copyElement.style.top = pageY - shiftY + "px";
  };
};

const removeDocumentEvent = () => {
  document.removeEventListener("mousemove", mouseMoveHandler);
};

const setDocumentEvent = (moveAtFunc) => {
  document.moveAt = moveAtFunc;
  document.addEventListener("mousemove", mouseMoveHandler);
};

const mouseMoveHandler = (event) => {
  const target = event.currentTarget;
  target.moveAt(event.pageX, event.pageY);
};

const mouseUpHandler = (event) => {
  const target = event.target;

  if (isDeleteButton(target)) {
    return;
  }

  const taskElement = target.closest("li");
  document.removeEventListener("mousemove", mouseMoveHandler);
  taskElement.removeEventListener("mouseup", mouseUpHandler);
  taskElement.remove();
};
