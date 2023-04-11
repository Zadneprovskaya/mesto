import { Popup } from './Popup.js';

export class PopupWithConfirm extends Popup {
  constructor(selector) {
    super(selector);
    this._form = this._popup.querySelector('.popup__form');
  }

  setSubmitAction(submitAction) {
    this._handleSubmitCallback = submitAction;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (event) => {
      event.preventDefault();
      this._handleSubmitCallback();
    });
  }

}
