import { $, $$ } from "../utils/utils.js";

export class Task {
  constructor(taskData) {
    this.taskData = taskData;
  }

  createHTML() {
    if (!this.taskData) return "";
    return this.taskData.reduce(
      (acc, cur, index) =>
        acc +
        `<li class="column__task--item" data-index="${index}">
              <section>
                <div class="section__header">
                  <input readonly type="text" class="column__task--title" value="${cur.title}" />
                  <img src="./svg/icon-delete.svg" class="column__task--delete-button" />
                </div>
                <textarea readonly class="column__task--comment" spellcheck="false">${cur.comment}</textarea>
                <span class="column__task--author">author by ${cur.author}</span>
              </section>
              
            </li>`,
      ""
    );
  }

  createRegistrationCardHTML() {
    return `
      <li class="column__task--item registration-card inactivation" data-index="0">
        <section>
          <div class="section__header">
            <input type="text" class="column__task--title" placeholder="제목을 입력하세요" />
            <img src="./svg/icon-delete.svg" class="column__task--delete-button" />
          </div>
          <textarea class="column__task--comment" spellcheck="false" placeholder="내용을 입력하세요"></textarea>
          <div class="column__task--button">
            <button class="column__task--cancel-button">취소</button>
            <button class="column__task--accent-button">등록</button>
          </div>
        </section>
      </li>
    `;
  }

  setEvents() {
    this.setClickEvent();
    this.setInputEvent();
    this.setKeyupEvent();
  }

  setInputEvent() {
    const columnTaskComments = $$(".column__task--comment");
    for (const element of columnTaskComments) {
      element.addEventListener("input", ({ target }) => this.autosizeTextArea(target));
    }
  }

  autosizeTextArea(target) {
    target.style.height = "1px";
    target.style.height = target.scrollHeight + "px";
  }

  setClickEvent() {
    const taskButton = $(".column__task--button");
    taskButton.addEventListener("click", ({ target }) => this.handleClickEvent(target));
  }

  handleClickEvent(target) {
    const list = target.closest(".column__task--list");
    const isCancelButton = target.classList.contains("column__task--cancel-button");
    if (!isCancelButton) return;
    this.removeRegistrationCard(list);
  }

  removeRegistrationCard(list) {
    this.registrationActivation = false;
    const firstTask = list.querySelector(".column__task--item");
    firstTask.remove();
  }

  setKeyupEvent() {
    const registrationCard = $(".registration-card");
    registrationCard.addEventListener("keyup", () => this.handleKeyupEvent(registrationCard));
  }

  handleKeyupEvent(registrationCard) {
    const title = registrationCard.querySelector("input");
    const comment = registrationCard.querySelector("textarea");
    if (comment.value.length > 500) comment.disabled = true;
    if (title.value || comment.value) registrationCard.classList.remove("inactivation");
    else registrationCard.classList.add("inactivation");
  }
}
