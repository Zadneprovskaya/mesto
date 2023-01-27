const validationConfig = {
  popupSelector: '.popup',
  inputSelector: '.popup__text',
  popupException: 'popup-image',
  inputException: 'name-card-input',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_type_invalid',
  inputErrorClass: 'popup__text_type_error',
  errorClass: 'popup__text-error_active'
};

const container = document.querySelector('.container');
const profileInfo = container.querySelector('.profile-info');
const editButton = profileInfo.querySelector('.profile-info__edit-button');
const profileName = profileInfo.querySelector('.profile-info__name');
const profileJob = profileInfo.querySelector('.profile-info__description');
const addButton = container.querySelector('.profile__add-button');

const profilePopup = document.querySelector('.popup-profile');
const formProfile = profilePopup.querySelector('.popup-profile__form');

const addCardPopup = document.querySelector('.popup-add');
const addCardForm = addCardPopup.querySelector('.popup-add__form');
const addCardButton = addCardPopup.querySelector(validationConfig.submitButtonSelector);

const formPopup = document.forms.popupForm;
const formPopupAdd = document.forms.popupAdd;

const elementsList = container.querySelector('.elements');


const initialCards = [
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


function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
}

function closeByEscape (evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

import { Card } from "./Card.js";

initialCards.forEach((el) => {
  const dataCard = {
    nameCard: el.name,
    linkCard: el.link
  }

  const card = new Card(dataCard,'.temp-element',openPopup);
  elementsList.prepend(card.generateCard());
});

const popupList = document.querySelectorAll('.popup');
popupList.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    const targetClassList = evt.target.classList;
    if (targetClassList.contains('popup') || targetClassList.contains('popup__button-close')) {
      closePopup(popup);
    }
  });
});

const openFormProfile = () => {
  formPopup.newName.value = profileName.textContent;
  formPopup.newDescription.value = profileJob.textContent;
  openPopup(profilePopup);
}

const editProfile = event => {
  event.preventDefault();
  profileName.textContent = formPopup.newName.value;
  profileJob.textContent = formPopup.newDescription.value;
  const popup = event.target.closest('.popup');
  closePopup(popup);
}

const openFormCard = () => {
  formPopupAdd.Name.value = '';
  formPopupAdd.Link.value = '';
  addCardButton.classList.add(validationConfig.inactiveButtonClass);
  addCardButton.disabled = true;
  openPopup(addCardPopup);
}

const addCard = event => {
  event.preventDefault();
  const dataCard = {
    nameCard: formPopupAdd.Name.value,
    linkCard: formPopupAdd.Link.value
  }

  const card = new Card(dataCard,'.temp-element',openPopup);
  elementsList.prepend(card.generateCard());
  const popup = event.target.closest('.popup');
  closePopup(popup);
}

  formProfile.addEventListener('submit', editProfile);
  editButton.addEventListener ('click',openFormProfile);
  addButton.addEventListener ('click',openFormCard);
  addCardForm.addEventListener('submit', addCard);

import { FormValidator } from "./FormValidator.js";
const profileFormValidation = new FormValidator(validationConfig,profilePopup);
const cardFormValidation = new FormValidator(validationConfig,addCardPopup);
profileFormValidation.enableValidation();
cardFormValidation.enableValidation();
