import { $ } from "../utils/utils.js";
import * as TodoListStore from "../store/todoListStore.js";

const createHTML = () => {
  return /* html */ `<div class="dimmed">
  <div class="delete">
    <h3 class="delete--title">선택한 카드를 삭제할까요?</h3>
    <div class="delete--button">
      <button class="delete--cancel-button">취소</button>
      <button class="delete--delete-button">삭제</button>
    </div>
  </div>
</div>`;
};

const render = () => {
  document.body.innerHTML += createHTML();
};

const setEvents = (task) => {
  const cancelButton = $(".delete--cancel-button");
  const deleteButton = $(".delete--delete-button");
  cancelButton.addEventListener("click", handleCancelButtonClick);
  deleteButton.addEventListener("click", () => handleDeleteButtonClick(task));
};

const handleCancelButtonClick = ({ target }) => {
  const alert = target.closest(".dimmed");
  alert.remove();
};

const handleDeleteButtonClick = (task) => {
  TodoListStore.deleteListTask(task.listTitle, task.taskData.title);
};

export const deleteMenuInit = (task) => {
  render();
  setEvents(task);
};
