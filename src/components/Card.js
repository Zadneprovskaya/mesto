export class Card {
  constructor (data, templateSelector, { handleCardClick }) {
    this._title = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const elementCard = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return elementCard;
  }

  _likeCard() {
    this._likeButton.classList.toggle('element__like_active');
  }

  _deleteCard() {
    this._cardTrash.closest('.element').remove();
  }

  _showImage(event) {
    if(!event.target.classList.contains('element__trash')) {
      this._handleCardClick(this._title, this._link)
    }
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._likeCard();
    });

    this._cardTrash.addEventListener('click', () => {
      this._deleteCard();
    });

    this._cardImage.addEventListener('click', event => {
      this._showImage(event);
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector('.element__like');
    this._cardImage = this._element.querySelector('.element__image');
    this._cardTrash = this._element.querySelector('.element__trash');
    this._cardTitle = this._element.querySelector('.element__title');
    this._setEventListeners();

    this._cardImage.style = "background-image:url('" + this._link + "');";
    this._cardTitle.textContent = this._title;

    return this._element;
  }
}
