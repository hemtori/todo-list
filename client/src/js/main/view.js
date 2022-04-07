import { $ } from "../utils/utils.js";
import { List } from "./list.js";
import { Task } from "./task.js";
import * as TodolistStore from "../store/todolistStore.js";

const autosizeTextArea = () => {
  const columnTaskComment = $(".column__task--comment");
  columnTaskComment.style.height = "1px";
  columnTaskComment.style.height = columnTaskComment.scrollHeight + "px";
};

const setEvents = () => {
  const columnTaskComment = $(".column__task--comment");
  columnTaskComment.addEventListener("input", autosizeTextArea);
};

export const mainInit = async (parent) => {
  const todolistData = await TodolistStore.getTodolistData();

  for (const list of todolistData) {
    for (const title in list) {
      const task = new Task(list[title]);
      new List(parent, title, task);
    }
  }

  setEvents();
};
