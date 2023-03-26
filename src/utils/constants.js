export const validationConfig = {
  popupSelector: '.popup',
  inputSelector: '.popup__text',
  inputException: 'name-card-input',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_type_invalid',
  inputErrorClass: 'popup__text_type_error',
  errorClass: 'popup__text-error_active'
};

export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

export const container = document.querySelector('.container');
export const profileInfo = container.querySelector('.profile-info');
export const editButton = profileInfo.querySelector('.profile-info__edit-button');
export const addButton = container.querySelector('.profile__add-button');
export const profilePopup = document.querySelector('.popup-profile');
export const addCardPopup = document.querySelector('.popup-add');
export const formPopup = document.forms.popupForm;
