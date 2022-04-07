import { $, debounce } from "../utils/utils.js";
import { toggleActivation } from "../store/model.js";
import { iconMenu } from "../constants/imagePath.js";

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
  toggleActivation().set();
};

const setEvents = () => {
  const sidebarMenuBtn = $(".sidebar__menu-button");
  sidebarMenuBtn.addEventListener(
    "click",
    debounce(() => handleSideBarMenuBtn(), 250)
  );
};

export const headInit = (parent) => {
  render(parent);
  setEvents();
};
