import './index.css';
import { Section } from '../components/Section.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { UserInfo } from '../components/UserInfo.js';
import {
  validationConfig,
  initialCards,
  editButton,
  addButton,
  profilePopup,
  addCardPopup,
  formPopup
} from '../utils/constants.js';

const popupImage = new PopupWithImage('.popup-image');

function createCard(data) {
  const card = new Card(data,'.temp-element',{
    handleCardClick: () => {
      popupImage.open(data);
    }
  });
  const cardElement = card.generateCard();
  return cardElement;
}

const cardsList = new Section({
  data: initialCards,
  renderer: (item) => {
    cardsList.addItem(createCard(item));
    }
  },
  '.elements'
);

const userInfo = new UserInfo({
  selectorName: '.profile-info__name',
  selectorInfo: '.profile-info__description'
});

const popupFormProfile = new PopupWithForm('.popup-profile',{
  handleFormSubmit: (profileInfo) => {
    userInfo.setUserInfo({ name: profileInfo.newName, info: profileInfo.newDescription });
    popupFormProfile.close();
  }
});

const popupFormCard = new PopupWithForm('.popup-add',{
  handleFormSubmit: (item) => {
    cardsList.addItem(createCard(item));
    popupFormCard.close();
  }
});

cardsList.renderItems();
popupFormCard.setEventListeners();
popupFormProfile.setEventListeners();
popupImage.setEventListeners();

const openFormProfile = () => {
  const userData = userInfo.getUserInfo();
  formPopup.newName.value = userData.name;
  formPopup.newDescription.value = userData.info;
  profileFormValidation.resetValidation();
  popupFormProfile.open();
}

const openFormCard = () => {
  cardFormValidation.resetValidation();
  popupFormCard.open();
}

editButton.addEventListener ('click',openFormProfile);
addButton.addEventListener ('click',openFormCard);

const profileFormValidation = new FormValidator(validationConfig,profilePopup);
const cardFormValidation = new FormValidator(validationConfig,addCardPopup);
profileFormValidation.enableValidation();
cardFormValidation.enableValidation();
