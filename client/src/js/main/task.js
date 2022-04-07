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
                <input readonly type="text" class="column__task--title" value="${cur.title}" />
                <textarea readonly class="column__task--comment" spellcheck="false">${cur.comment}</textarea>
                <span class="column__task--author">author by ${cur.author}</span>
              </section>
              <img src="./svg/icon-delete.svg" class="column__task--delete-button" />
            </li>`,
      ""
    );
  }
}
