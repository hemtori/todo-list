import { iconDelete } from "../constants/imagePath.js";

export const setTaskViewEvent = () => {
  const taskList = [...document.querySelectorAll(".column__task--list")];
  taskList.forEach((taskList) => {
    const taskItems = [...taskList.children];
    taskItems.forEach(setMouseEvent);
  });
};

const setMouseEvent = (element) => {
  element.addEventListener("mousedown", mouseDownHandler);
};

const mouseDownHandler = (event) => {
  const target = event.target;

  if (target.classList.contains("column__task--delete-button")) {
    return;
  }

  const taskElement = target.closest("li");
  const copyTaskElement = createCopyTask(taskElement);
  document.body.appendChild(copyTaskElement);
};

const createCopyTask = (taskElement) => {
  const [sectionElement] = [...taskElement.children];
  const copyTaskElement = document.createElement("li");
  copyTaskElement.style.width = "308px";
  copyTaskElement.ondragstart = () => false;
  copyTaskElement.dataset.index = taskElement.dataset.index;
  copyTaskElement.classList.add("column__task--item", "dragging");
  copyTaskElement.innerHTML = createTaskHTML([...sectionElement.children]);
  return copyTaskElement;
};

const createTaskHTML = ([title, comment, author]) => {
  return /* html */ `
    <section>
      <input readonly type="text" class="column__task--title" value="${title.value}" />
      <textarea readonly class="column__task--comment" spellcheck="false">${comment.value}</textarea>
      <span class="column__task--author">${author.innerText}</span>
    </section>
    <img src="${iconDelete}" class="column__task--delete-button" />`;
};
