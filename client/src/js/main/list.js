import { $$ } from "../utils/utils.js";

export class List {
  constructor(parent, title, task) {
    this.parent = parent;
    this.title = title;
    this.task = task;
    this.init();
  }

  init() {
    this.render(this.parent);
    this.setEvents();
  }

  render(parent) {
    const position = "beforeend";
    parent.insertAdjacentHTML(position, this.createHTML(this.title));
  }

  createHTML(title) {
    return `<li class="column__item" data-title="${title}">
    <div class="task__scroll">
          <div class="column__item--title">
            <div class="column__item--title-text">
              <h2 class="column__title">${title}</h2>
              <div class="column__task--count">2</div>
            </div>
            <div class="column__item--title-menu">
              <img src="./svg/icon-add.svg" class="column__task--add-button" />
              <img src="./svg/icon-delete.svg" class="column__list--delete-button" />
            </div>
          </div>
          <ul class="column__task--list">
              ${this.task.createHTML()}
          </ul>
          </div>
        </li>`;
  }

  setEvents() {
    this.setTarget();
    this.setClickEvent();
    this.task.setInputEvent();
  }

  setTarget() {
    const columnMenus = $$(".column__item--title-menu");
    this.columnMenu = columnMenus[columnMenus.length - 1];
  }

  setClickEvent() {
    this.columnMenu.addEventListener("click", ({ target }) => {
      this.handleClickEvent(target);
    });
  }

  handleClickEvent(target) {
    const list = target.closest(".column__item").querySelector(".column__task--list");
    const isAddButton = target.classList.contains("column__task--add-button");
    if (!isAddButton) return;
    this.task.registrationActivation ? this.removeRegistrationCard(list) : this.addRegistrationCard(list);
  }

  addRegistrationCard(list) {
    list.insertAdjacentHTML("afterbegin", this.task.createRegistrationCardHTML());
    this.task.registrationActivation = true;
    this.task.setEvents();
  }

  removeRegistrationCard(list) {
    if (!this.task.registrationActivation) return;
    const firstTask = list.querySelector(".column__task--item");
    this.task.registrationActivation = false;
    firstTask.remove();
  }
}
