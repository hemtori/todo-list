import { $ } from "../utils/utils.js";
import { List } from "./list.js";
import { Task } from "./task.js";
import * as TodoListStore from "../store/todoListStore.js";
import { setTaskDragEvent } from "./taskDragHandler.js";

const createTodoList = async () => {
  const todoListData = await TodoListStore.getTodoListData();
  const parent = $(".column__list");
  for (const list of todoListData) {
    for (const title in list) {
      const task = new Task(list[title]);
      new List(parent, title, task);
    }
  }
  setTaskDragEvent();
};

const createHTML = () => {
  return `<ul class="column__list"></ul>`;
};

const render = (parent) => {
  parent.innerHTML = createHTML();
};

export const mainInit = (parent) => {
  render(parent);
  createTodoList();
};
