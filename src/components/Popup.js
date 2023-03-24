export class Popup {
  constructor (selector) {
    this._container = document.querySelector(selector);
  }

  open() {
    this._container.classList.add('popup_opened');
    document.addEventListener('keydown', () => {
      this._handleEscClose(event);
    });
  }

  close() {
    this._container.classList.remove('popup_opened');
    document.removeEventListener('keydown', () => {
      this._handleEscClose(event);
    });
  }

  _handleEscClose(event) {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    this._container.addEventListener('click', (event) => {
      const targetClassList = event.target.classList;
      if (targetClassList.contains('popup') || targetClassList.contains('popup__button-close')) {
        this.close();
      }
    });
  }
}
