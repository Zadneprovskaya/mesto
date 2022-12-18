const container = document.querySelector('.container');
const profileInfo = container.querySelector('.profile-info');
const editButton = profileInfo.querySelector('.profile-info__edit-button');
const profileName = profileInfo.querySelector('.profile-info__name');
const profileJob = profileInfo.querySelector('.profile-info__description');
const formElement = container.querySelector('.popup');
const formProfile = formElement.querySelector('.popup__form-profile');
const closeButtonPopup = container.querySelector('.popup__button-close');
const closeButtonPopupAdd = container.querySelector('.popup-add__button-close');
const closeButtonPopupImage = container.querySelector('.popup-image__button-close');
const addButton = container.querySelector('.profile__add-button');
const formElementAdd = container.querySelector('.popup-add');
const cardAdd = formElementAdd.querySelector('.popup-add__form');
const formElementImage = container.querySelector('.popup-image');
const elementImage = formElementImage.querySelector('.popup-image__image');
const elementTitle = formElementImage.querySelector('.popup-image__title');

const formPopup = document.forms.popupForm;
const formPopupAdd = document.forms.popupAdd;

const elementsList = container.querySelector('.elements');
const elementTemplate = document.querySelector('.temp-element').content;

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


const openForm = classForm => {
  if (!classForm.classList.contains('popup_opened')) {
    classForm.classList.add('popup_opened');
  }
}

const editProfile = () => {
      formPopup.newName.value = profileName.textContent;
      formPopup.newDescription.value = profileJob.textContent;
      openForm(formElement);
}

const openFormAdd = () => {
  formPopupAdd.Name.value = '';
  formPopupAdd.Link.value = '';
  openForm(formElementAdd);
}

const closeForm = event => {
  const elementCloseBtn = event.target.parentElement.parentElement;
  elementCloseBtn.classList.remove('popup_opened');
}

const formSubmitHandler = event => {
  event.preventDefault();
  profileName.textContent = formPopup.newName.value;
  profileJob.textContent = formPopup.newDescription.value;
  closeForm(event);
}

const formAddSubmitHandler = event => {
  event.preventDefault();
  const nameCard = formPopupAdd.Name.value;
  const linkCard = formPopupAdd.Link.value;
  addCard(nameCard,linkCard)
  closeForm(event);
}

const likeCard = event => {
  event.target.classList.toggle('element__like_active');
  }

const elementDelete = event => {
  const elementDeleteCard = event.target.closest('.element');
  elementDeleteCard.remove();
}

const imageShow = event => {
  if(!event.target.classList.contains('element__trash')) {
    const imageLink = event.target.style.backgroundImage.slice(5,event.target.style.backgroundImage.length - 2);
    const imageTitle = event.target.nextElementSibling.firstElementChild.textContent;
    elementImage.src = imageLink;
    elementImage.alt = imageTitle + " во весь экран";
    if(elementImage.width > elementImage.height) {
      elementImage.style = 'max-width: 75vw; max-height: 75vh';
      elementTitle.style = 'max-width: 75vw';
    }
    else {
      elementImage.style = 'max-height: 75vh';
      const windowInnerHeight = document.documentElement.clientHeight;
      const elementImageHeight = elementImage.height;
      const elementImageWidth = Math.floor((windowInnerHeight * 0.75 * 800) / elementImageHeight);
      elementTitle.style = 'max-width: ' + elementImageWidth + 'px;'
    }
    elementTitle.textContent = imageTitle;
    openForm(formElementImage);
  }
}

const addCard = (nameCard,linkCard) => {
  const elementCard = elementTemplate.querySelector('.element').cloneNode(true);
  const cardImage = elementCard.querySelector('.element__image');
  const cardTitle = elementCard.querySelector('.element__title');

  cardImage.style = "background-image:url('" + linkCard + "');";
  cardTitle.textContent = nameCard;
  elementsList.prepend(elementCard);

  const elementLike = elementCard.querySelector('.element__like');
  elementLike.addEventListener('click',likeCard);

  const elementTrash = elementCard.querySelector('.element__trash');
  elementTrash.addEventListener('click',elementDelete);

  const elementImageShow = elementCard.querySelector('.element__image');
  elementImageShow.addEventListener('click',imageShow);
}

initialCards.forEach((el) => {
  addCard(el.name,el.link);
});

  formProfile.addEventListener('submit', formSubmitHandler);
  editButton.addEventListener ('click',editProfile);
  addButton.addEventListener ('click',openFormAdd);
  closeButtonPopup.addEventListener ('click',closeForm);
  closeButtonPopupAdd.addEventListener ('click',closeForm);
  closeButtonPopupImage.addEventListener ('click',closeForm);
  cardAdd.addEventListener('submit', formAddSubmitHandler);
