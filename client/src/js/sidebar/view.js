import { $ } from "../utils/utils.js";
import { toggleActivation } from "../store/model.js";
import { sidebarData } from "../../../../server/data/sidebar.js";

const identifyCategory = (activity) => {
  switch (activity.action) {
    case "등록":
      return `${activity.category[0]}에 ${activity.title}${appendEulReul(activity.title)} 
      ${activity.action}하였습니다.`;
    case "이동":
      return `${activity.title}${appendEulReul(activity.title)} ${activity.category[0]}에서 
      ${activity.category[1]}${appenRoEro(activity.category[1])} ${activity.action}하였습니다.`;
    case "삭제":
      return `${activity.category}에서 ${activity.title}${appendEulReul(activity.title)} 
      ${activity.action}하였습니다.`;
    case "변경":
      return `${activity.category}에서 ${activity.title}이 ${action}되었습니다.`;
    default:
      return "동작이 잘못 되었습니다.";
  }
};

const createHTML = () => {
  const sidebarList = sidebarData.reduce(
    (acc, cur) =>
      acc +
      `<li class="sidebar__item">
          <img class="sidebar__item--profile" src="profile.svg" alt="profile" />
          <section>
            <h3 class="sidebar__item--nickname">@sam</h3>
            <p class="sidebar__item--activity">
               ${identifyCategory(cur)}
            </p>
            <p class="sidebar__item--time-stamp">${calcTimeForToday(cur.writeTime)}</p>
          </section>
        </li>`,
    ""
  );
  return `<ul class="sidebar__list">${sidebarList}</ul>`;
};

const render = (parent) => {
  parent.innerHTML = createHTML();
};

const toggleSidebar = () => {
  const sidebar = $("aside");
  const sidebarMenuBtn = $(".sidebar__menu-button img");
  sidebar.classList.toggle("show");
  sidebarMenuBtn.src = sidebar.classList.contains("show") ? "./icon-delete.svg" : "./icon-menu.svg";
};

const bindModel = () => {
  toggleActivation.toggleSidebar = toggleSidebar;
};

export const sidebarInit = (parent) => {
  render(parent);
  bindModel();
};
