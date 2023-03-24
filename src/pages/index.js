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
  formPopup,
  formPopupAdd
} from '../utils/constants.js';

const popupImage = new PopupWithImage('.popup-image');

const cardsList = new Section({
  data: initialCards,
  renderer: (item) => {
    const card = new Card(item,'.temp-element',{
      handleCardClick: () => {
        popupImage.open(item);
      }
    });
    const cardElement = card.generateCard();
    cardsList.addItem(cardElement);
    }
  },
  '.elements'
);

const userInfo = new UserInfo({
  selectorName: '.profile-info__name',
  selectorInfo: '.profile-info__description'
});

const popupFormProfile = new PopupWithForm('.popup-profile',{
  handleFormSubmit: () => {
    userInfo.setUserInfo({ name: formPopup.newName.value, info: formPopup.newDescription.value });
    popupFormProfile.close();
  }
});

const popupFormCard = new PopupWithForm('.popup-add',{
  handleFormSubmit: (item) => {
    const card = new Card(item,'.temp-element',{
      handleCardClick: () => {
        popupImage.open(item);
      }
    });
    const cardElement = card.generateCard();
    cardsList.addItem(cardElement);
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
  formPopupAdd.name.value = '';
  formPopupAdd.link.value = '';
  cardFormValidation.resetValidation();
  popupFormCard.open();
}

editButton.addEventListener ('click',openFormProfile);
addButton.addEventListener ('click',openFormCard);

const profileFormValidation = new FormValidator(validationConfig,profilePopup);
const cardFormValidation = new FormValidator(validationConfig,addCardPopup);
profileFormValidation.enableValidation();
cardFormValidation.enableValidation();
