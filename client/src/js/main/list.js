export class List {
  constructor(parent, title, task) {
    this.parent = parent;
    this.title = title;
    this.task = task;
    this.init();
  }

  init() {
    this.render(this.parent);
  }

  render(parent) {
    const position = "beforeend";
    parent.insertAdjacentHTML(position, this.createHTML(this.title));
  }

  createHTML(title) {
    return `<li class="column__item" data-title="${title}">
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
        </li>`;
  }
}
