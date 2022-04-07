import { $ } from "./utils/utils.js";
import { headInit } from "./header/view.js";
import { sidebarInit } from "./sidebar/view.js";
import { mainInit } from "./main/view.js";
import { setTaskViewEvent } from "./main/taskView.js";
const header = $("header");
const main = $("main");
const aside = $("aside");

const init = () => {
  headInit(header);
  mainInit(main);
  sidebarInit(aside);
  setTaskViewEvent();
};

init();
