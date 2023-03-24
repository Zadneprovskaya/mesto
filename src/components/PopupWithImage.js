import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);

  }

  open(data) {
    super.open();

    this._link = data.link;
    this._name = data.name;

    this._container.querySelector('.popup-image__image').src = this._link;
    this._container.querySelector('.popup-image__image').alt = `${this._name} во весь экран`;
    this._container.querySelector('.popup-image__title').textContent = this._name;
  }
}
