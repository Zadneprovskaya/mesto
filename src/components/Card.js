export class Card {
  constructor (templateSelector, userId, { data, handleCardClick, handleTrashClick, handleLikeClick }) {
    this._data = data;
    this._title = data.name;
    this._link = data.link;
    this._idOwner = data.owner._id;
    this._cardId = data._id;
    this._likes = data.likes;
    this._templateSelector = templateSelector;
    this._userId = userId;
    this._handleCardClick = handleCardClick;
    this._handleTrashClick = handleTrashClick;
    this._handleLikeClick = handleLikeClick;
  }

  _getTemplate() {
    const elementCard = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return elementCard;
  }

  _checkLike() {
    return this._likes.some(item => {
      return item._id === this._userId;
    });
  }

  changeStatusLike(likes) {
    this._element.querySelector('.element__count-like').textContent = likes.length;
    this._likes = likes;
    if (this._checkLike()) {
      this._likeButton.classList.add('element__like_active');
    } else {
      this._likeButton.classList.remove('element__like_active');
    }
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _showImage(event) {
    if(!event.target.classList.contains('element__trash')) {
      this._handleCardClick(this._data)
    }
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._handleLikeClick(this._cardId, this._checkLike(), this);
    });

    this._cardTrash.addEventListener('click', () => {
      this._handleTrashClick(this._cardId, this);
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

    this._cardImage.style = "background-image:url('" + this._link + "');";
    this._cardTitle.textContent = this._title;

    if (this._userId !== this._idOwner) {
      this._cardTrash.remove();
    }

    this.changeStatusLike(this._likes);
    this._setEventListeners();

    return this._element;
  }
}
