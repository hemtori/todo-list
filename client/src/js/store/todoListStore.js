import { fetchData } from "../utils/utils.js";

export const getTodoListData = () => {
  return fetchData("https://raw.githubusercontent.com/hemtori/todo-list/develop2/server/data/db.json");
};

const subscribers = {
  //   registration: [list]
};

const activation = {
  //   registration: false
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

export const update = (key, title) => {
  activation[key] = [!activation[key], title];
};
