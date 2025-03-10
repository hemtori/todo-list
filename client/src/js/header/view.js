import { $, debounce } from "../utils/utils.js";
import { iconMenu, iconDelete } from "../constants/imagePath.js";
import * as TodoListStore from "../store/todoListStore.js";

const createHTML = () => {
  return `<h1 class="header__title">TO-DO LIST</h1>
      <button class="sidebar__menu-button">
        <img src="${iconMenu}" alt="icon-menu" />
      </button>`;
};

const render = (parent) => {
  parent.innerHTML = createHTML();
};

const handleSideBarMenuBtn = () => {
  TodoListStore.update("sidebar");
};

const setEvents = () => {
  const sidebarMenuBtn = $(".sidebar__menu-button");
  sidebarMenuBtn.addEventListener(
    "click",
    debounce(() => handleSideBarMenuBtn(), 250)
  );
};

const notify = (isShow) => {
  const sidebarMenuBtn = $(".sidebar__menu-button img");
  sidebarMenuBtn.src = isShow ? iconDelete : iconMenu;
};

const headInit = (parent) => {
  render(parent);
  setEvents();
  TodoListStore.subscribe("sidebar", notify);
};

export { headInit };
