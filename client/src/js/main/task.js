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

  createRegisterationCardHTML() {
    return `
      <li class="column__task--item" data-index="0">
        <section>
          <div class="section__header">
            <input readonly type="text" class="column__task--title" value="HTML/CSS 공부하기" />
            <img src="./svg/icon-delete.svg" class="column__task--delete-button" />
          </div>
          <textarea readonly class="column__task--comment" spellcheck="false">input 태그 실습</textarea>
          <div class="column__task--button">
            <button class="column__task--cancle-button">취소</button>
            <button class="column__task--accent-button">등록</button>
          </div>
        </section>
      </li>
    `;
  }
}
