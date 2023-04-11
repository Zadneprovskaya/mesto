export class Section {
  constructor ({ renderer }, selector) {
    this._renderer = renderer;

    this._container = document.querySelector(selector);
  }

  renderItems(items, id) {
    items.forEach((item) => {
      this._renderer(item, id)
    });
  }

  addItem(element) {
    this._container.prepend(element);

  }

  addItemAppend(element) {
    this._container.append(element);
  }
}
