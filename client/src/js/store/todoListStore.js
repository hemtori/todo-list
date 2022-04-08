import { fetchData } from "../utils/utils.js";

export const getTodoListData = () => {
  return fetchData("http://localhost:3000/todoList");
};

const subscribers = {
  //   registration: [list]
  //   newTask: []
};

const activation = {
  //   registration: false
  //   newTask:
};

export const subscribe = (key, notify) => {
  if (activation[key] === undefined) {
    activation[key] = false;
    let value = activation[key];
    Object.defineProperty(activation, key, {
      get: () => {
        return value;
      },
      set: ([newValue, title]) => {
        value = newValue;
        subscribers[key].forEach((notify) => {
          notify(activation[key], title);
        });
      },
    });
  }

  subscribers[key] = subscribers[key] || [];
  subscribers[key].push(notify);
};

export const update = (key, title, newTask) => {
  if (newTask) return (activation[key] = [newTask, title]);
  activation[key] = [!activation[key], title];
};
