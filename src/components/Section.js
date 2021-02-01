export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  };

  addItem(element) {
    this._container.prepend(element);
  };

  clear() {
    this._container.innerHTML = '';
  };

  update() {
    if (!this._container.children.length) {
      this.clear();
    };
  }

  renderItems() {
    this.clear();

    this._renderedItems.reverse().forEach((item) => {
      this._renderer(item);
    });
  };
}
