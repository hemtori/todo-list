import { $ } from "../utils/utils.js";
import { toggleActivation } from "../store/model.js";
import { sidebarData } from "../../../../server/data/sidebar.js";

const getFinalConsonant = (object) => {
  const koreanUnicode = 44032;
  const finalConsonantCount = 28;
  const finalWord = object.length - 1;
  const finalCharCode = object.charCodeAt(finalWord);
  const finalConsonantCode = (finalCharCode - koreanUnicode) % finalConsonantCount;
  return finalConsonantCode;
};

const hasFinalConsonant = (object) => {
  const finalConsonantCode = getFinalConsonant(object);
  return finalConsonantCode !== 0;
};

const appendEulReul = (object) => {
  return hasFinalConsonant(object) ? "을" : "를";
};

const appendRoEro = (object) => {
  const rieul = 8;
  return hasFinalConsonant(object) //
    ? getFinalConsonant(object) === rieul
      ? "로"
      : "으로"
    : "로";
};

const calcTimeForToday = (timeStampValue) => {
  const today = new Date();
  const timeStamp = new Date(timeStampValue);
  const timeDifference = today.getTime() - timeStamp.getTime();
  const [milliSecond, second, minute, hour, day, year] = [1000, 1, 60, 60, 24, 365];

  const minuteDifference = Math.floor(timeDifference / milliSecond / minute);
  if (minuteDifference < second) return "방금전";

  if (minuteDifference < hour) return `${minuteDifference}분전`;

  const HourDifference = Math.floor(minuteDifference / hour);
  if (HourDifference < day) return `${HourDifference}시간전`;

  const DayDifference = Math.floor(HourDifference / day);
  if (DayDifference < year) return `${DayDifference}일전`;

  return `${DayDifference}년전`;
};

const identifyCategory = (activity) => {
  switch (activity.action) {
    case "등록":
      return `${activity.category[0]}에 ${activity.title}${appendEulReul(activity.title)} 
      ${activity.action}하였습니다.`;
    case "이동":
      return `${activity.title}${appendEulReul(activity.title)} ${activity.category[0]}에서 
      ${activity.category[1]}${appendRoEro(activity.category[1])} ${activity.action}하였습니다.`;
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
          <img class="sidebar__item--profile" src="./svg/profile.svg" alt="profile" />
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
  return `<ul class="sidebar__list"><div class="sidebar__scroll">${sidebarList}</div></ul>`;
};

const render = (parent) => {
  parent.innerHTML = createHTML();
};

const toggleSidebar = () => {
  const sidebar = $("aside");
  const sidebarMenuBtn = $(".sidebar__menu-button img");
  sidebarMenuBtn.src = sidebar.classList.contains("show") ? "./svg/icon-menu.svg" : "./svg/icon-delete.svg";
  sidebar.classList.toggle("show");
};

const bindModel = () => {
  toggleActivation.toggleSidebar = toggleSidebar;
};

export const sidebarInit = (parent) => {
  render(parent);
  bindModel();
};
