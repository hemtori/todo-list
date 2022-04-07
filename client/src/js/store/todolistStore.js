import { fetchData } from "../utils/utils.js";

export const getTodoListData = () => {
  return fetchData("http://localhost:3000/todolist");
};
