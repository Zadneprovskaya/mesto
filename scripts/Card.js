export class Card {
  constructor (data, templateSelector, openPopup) {
    this._title = data.nameCard;
    this._link = data.linkCard;
    this._templateSelector = templateSelector;
    this._openPopup = openPopup;
  }

  _getTemplate() {
    const elementCard = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return elementCard;
  }

  _likeCard () {
    this._element.querySelector('.element__like').classList.toggle('element__like_active');
  }

  _deleteCard () {
    this._element.querySelector('.element__trash').closest('.element').remove();
  }

  _checkClick () {
    const clickTrash = this._element.addEventListener('click',this._click);
    console.log(clickTrash);
    return clickTrash
  }

  _showImage (event) {
    if(!event.target.classList.contains('element__trash')) {
      const openImagePopup = document.querySelector('.popup-image');
      const elementImage = openImagePopup.querySelector('.popup-image__image');
      const elementTitle = openImagePopup.querySelector('.popup-image__title');
      elementImage.src = this._element.querySelector('.element__image').style.backgroundImage.slice(5,this._element.querySelector('.element__image').style.backgroundImage.length - 2);
      elementImage.alt = this._element.querySelector('.element__image').closest('.element').querySelector('.element__title').textContent + " во весь экран";
      elementTitle.textContent = this._element.closest('.element').querySelector('.element__title').textContent;
      this._openPopup(openImagePopup);
    }
  }

  _setEventListeners() {
    this._element.querySelector('.element__like').addEventListener('click', () => {
      this._likeCard();
    });

    this._element.querySelector('.element__trash').addEventListener('click', () => {
      this._deleteCard();
    });

    this._element.querySelector('.element__image').addEventListener('click', event => {
      this._showImage(event);
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.element__image').style = "background-image:url('" + this._link + "');";
    this._element.querySelector('.element__title').textContent = this._title;

    return this._element;
  }
}
