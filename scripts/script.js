const container = document.querySelector('.container');
const profileInfo = container.querySelector('.profile-info');
const editButton = profileInfo.querySelector('.profile-info__edit-button');
const profileName = profileInfo.querySelector('.profile-info__name');
const profileJob = profileInfo.querySelector('.profile-info__description');
const addButton = container.querySelector('.profile__add-button');

const profilePopup = document.querySelector('.popup-profile');
const formProfile = profilePopup.querySelector('.popup-profile__form');
const inputListProfile = Array.from(formProfile.querySelectorAll('.popup__text'));

const closeButtonPopup = document.querySelector('.popup__button-close');
const closeButtonPopupAdd = document.querySelector('.popup-add__button-close');
const closeButtonPopupImage = document.querySelector('.popup-image__button-close');

const addCardPopup = document.querySelector('.popup-add');
const addCardForm = addCardPopup.querySelector('.popup-add__form');
const inputListCard= Array.from(addCardForm.querySelectorAll('.popup__text'));
const openImagePopup = document.querySelector('.popup-image');
const elementImage = openImagePopup.querySelector('.popup-image__image');
const elementTitle = openImagePopup.querySelector('.popup-image__title');

const formPopup = document.forms.popupForm;
const formPopupAdd = document.forms.popupAdd;

const elementsList = container.querySelector('.elements');
const elementTemplate = document.querySelector('.temp-element').content;

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

initialCards.forEach((el) => {
  elementsList.prepend(createCard(el.name,el.link));
});

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function likeCard (event) {
  event.target.classList.toggle('element__like_active');
}

function deleteCard (event) {
  const elementDeleteCard = event.target.closest('.element');
  elementDeleteCard.remove();
}

function showImage (event) {
  if(!event.target.classList.contains('element__trash')) {
    const imageLink = event.target.style.backgroundImage.slice(5,event.target.style.backgroundImage.length - 2);
    const imageTitle = event.target.closest('.element').querySelector('.element__title').textContent;
    elementImage.src = imageLink;
    elementImage.alt = imageTitle + " во весь экран";
    elementTitle.textContent = imageTitle;
    openPopup(openImagePopup);
  }
}

function createCard(nameCard,linkCard) {
  const elementCard = elementTemplate.querySelector('.element').cloneNode(true);
  const cardImage = elementCard.querySelector('.element__image');
  const cardTitle = elementCard.querySelector('.element__title');
  cardImage.style = "background-image:url('" + linkCard + "');";
  cardTitle.textContent = nameCard;

  const elementLike = elementCard.querySelector('.element__like');
  elementLike.addEventListener('click',likeCard);

  const elementTrash = elementCard.querySelector('.element__trash');
  elementTrash.addEventListener('click',deleteCard);

  const elementImageShow = elementCard.querySelector('.element__image');
  elementImageShow.addEventListener('click',showImage);

return elementCard;
}

const popupList = document.querySelectorAll('.popup');
popupList.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    const targetClassList = evt.target.classList;
    if (targetClassList.contains('popup') || targetClassList.contains('popup__button-close')) {
      closePopup(popup);
    }
  });
  popup.addEventListener('keydown', (evt) => {
    if (evt.key==='Escape') {
      closePopup(popup);
    };
  });
});

const openFormProfile = () => {
  formPopup.newName.value = profileName.textContent;
  formPopup.newDescription.value = profileJob.textContent;
  enableValidation(validationConfig);
  openPopup(profilePopup);
}

const editProfile = event => {
  event.preventDefault();

  if (!hasInvalidInput(inputListProfile)) {
    profileName.textContent = formPopup.newName.value;
    profileJob.textContent = formPopup.newDescription.value;
    const popup = event.target.closest('.popup');
    closePopup(popup);
  }
}

const openFormCard = () => {
  formPopupAdd.Name.value = '';
  formPopupAdd.Link.value = '';
  enableValidation(validationConfig);
  openPopup(addCardPopup);
}

const addCard = event => {
  event.preventDefault();
  if (!hasInvalidInput(inputListCard)) {
    const nameCard = formPopupAdd.Name.value;
    const linkCard = formPopupAdd.Link.value;
    elementsList.prepend(createCard(nameCard,linkCard));
    const popup = event.target.closest('.popup');
    closePopup(popup);
  }
}

  formProfile.addEventListener('submit', editProfile);
  editButton.addEventListener ('click',openFormProfile);
  addButton.addEventListener ('click',openFormCard);
  addCardForm.addEventListener('submit', addCard);
