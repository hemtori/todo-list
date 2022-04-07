import { $ } from "./utils/utils.js";
import { headInit } from "./header/view.js";
import { sidebarInit } from "./sidebar/view.js";
import { mainInit } from "./main/view.js";
const header = $("header");
const todoColumnList = $(".column__list");
const aside = $("aside");

const init = () => {
  headInit(header);
  mainInit(todoColumnList);
  sidebarInit(aside);
};

init();
