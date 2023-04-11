import './index.css';
import { Section } from '../components/Section.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js';
import { PopupWithConfirm } from '../components/PopupWithConfirm.js';
import {
  validationConfig,
  editButton,
  addButton,
  changeAvatarButton,
  profilePopup,
  addCardPopup,
  avatarPopup,
  formPopup
} from '../utils/constants.js';


function handleCardClick(card) {
  popupImage.open(card);
}

function handleTrashClick(id, card) {
  popupWithConfirm.setSubmitAction(() => handleDeleteConfirm(id, card))
  popupWithConfirm.open();
}

function handleDeleteConfirm(id, card) {
  api.removeCard(id)
    .then(() => {
      card.deleteCard();
      popupWithConfirm.close();
    })
    .catch((err) => {
      console.log(err);
    });
}

function handleLikeClick(id, isLiked, card) {
  if (isLiked) {
    api.dislikedCard(id)
      .then((data) => {
        card.likeCard(data.likes);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    api.likedCard(id)
      .then((data) => {
        card.likeCard(data.likes);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

function handleFormAddCard(card) {
  popupFormCard.processSaving(true);

  api.postNewCard(card)
    .then((data) => {
      cardsList.addItem(createCard(data, data.owner._id));
      popupFormCard.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupFormCard.processSaving(false);
    })
}

function handleFormEditProfile(dataProfile) {
  popupFormProfile.processSaving(true);

  api.saveUserChanges({ name: dataProfile.newName, about: dataProfile.newDescription })
    .then((data) => {
      userInfo.setUserInfo({ name: data.name, info: data.about, avatar: data.avatar });
      popupFormProfile.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupFormProfile.processSaving(false);
    })
}

function handleFormChangeAvatar(dataAvatar) {
  popupFormChangeAvatar.processSaving(true);

  api.changedAvatar(dataAvatar)
    .then((data) => {
      userInfo.setUserInfo({ name: data.name, info: data.about, avatar: data.avatar });
      popupFormChangeAvatar.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupFormChangeAvatar.processSaving(false);
    })
}


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

const openFormAvatar = () => {
  avatarFormValidation.resetValidation();
  popupFormChangeAvatar.open();
}

editButton.addEventListener ('click',openFormProfile);
addButton.addEventListener ('click',openFormCard);
changeAvatarButton.addEventListener ('click',openFormAvatar);


function createCard(data, id) {
  const card = new Card('.temp-element', id, {
    data: data,
    handleCardClick,
    handleTrashClick,
    handleLikeClick,
  });
  const cardElement = card.generateCard();
  return cardElement;
}

const cardsList = new Section({
  renderer: (cardItem, id) => {
    cardsList.addItemAppend(createCard(cardItem, id));
    }
  },
  '.elements'
);

const userInfo = new UserInfo({
  selectorName: '.profile-info__name',
  selectorInfo: '.profile-info__description',
  selectorAvatar: '.profile-image__avatar',
});

const popupImage = new PopupWithImage('.popup-image');
popupImage.setEventListeners();

const popupWithConfirm = new PopupWithConfirm('.popup-delete');
popupWithConfirm.setEventListeners();

const popupFormProfile = new PopupWithForm('.popup-profile', handleFormEditProfile);
popupFormProfile.setEventListeners();

const popupFormCard = new PopupWithForm('.popup-add', handleFormAddCard);
popupFormCard.setEventListeners();

const popupFormChangeAvatar = new PopupWithForm('.popup-avatar', handleFormChangeAvatar);
popupFormChangeAvatar.setEventListeners();

const profileFormValidation = new FormValidator(validationConfig,profilePopup);
profileFormValidation.enableValidation();

const cardFormValidation = new FormValidator(validationConfig,addCardPopup);
cardFormValidation.enableValidation();

const avatarFormValidation = new FormValidator(validationConfig,avatarPopup);
avatarFormValidation.enableValidation();


const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-63',
  headers: {
    authorization: 'a1f9f0af-27ca-45f0-9642-1f29074bddcb',
    'Content-Type': 'application/json'
  }
});

Promise.all([
    api.getUserData(),
    api.getInitialCards()
  ])
  .then((values) => {
    userInfo.setUserInfo({ name: values[0].name, info: values[0].about, avatar: values[0].avatar });
    cardsList.renderItems(values[1], values[0]._id);
  })
  .catch((err) => {
    console.log(err);
  });


