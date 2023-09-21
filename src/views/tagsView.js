class TagsView {
  constructor() {
    this.tagContainer = document.querySelector(".tag-container");
  }

  createTag(type, value, removeCallback) {
    const tagHTML = `
        <div class="tag-view inline-flex items-center h-[53px] p-3 bg-yellow-400" data-type="${type}" data-value="${value}">
          <span class="tag-content">${value}</span>
          <span class="tag-close space-x-2 cursor-pointer">X</span>
        </div>
      `;

    this.tagContainer.insertAdjacentHTML("beforeend", tagHTML);

    // Ecouteur d'événement pour la suppression d'un tag
    const tagElement = this.tagContainer.lastElementChild;
    const tagCloseBtn = tagElement.querySelector(".tag-close");

    tagCloseBtn.addEventListener("click", () => {
      removeCallback(type, value);
      tagElement.remove();
    });
  }
}
