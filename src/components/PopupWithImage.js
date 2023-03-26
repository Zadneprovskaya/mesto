import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._image = this._popup.querySelector('.popup-image__image');
    this._imageTitle = this._popup.querySelector('.popup-image__title');
  }

  open(data) {
    super.open();

    this._image.src = data.link;
    this._imageTitle.alt = `${data.name} во весь экран`;
    this._imageTitle.textContent = data.name;
  }
}
