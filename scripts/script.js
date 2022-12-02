let container = document.querySelector('.container');
let profileInfo = container.querySelector('.profile-info');
let editButton = profileInfo.querySelector('.profile-info__edit-button');
let profileName = profileInfo.querySelector('.profile-info__name');
let profileJob = profileInfo.querySelector('.profile-info__description');
let formElement = container.querySelector('.popup');
let formContainer = formElement.querySelector('.popup__container');
let formProfile = formContainer.querySelector('.popup__form-profile');
let closeButton = formElement.querySelector('.popup__button-close');
let nameInput = formElement.querySelector('.popup__text_value_name');
let jobInput = formElement.querySelector('.popup__text_value_description');
let saveButton = formElement.querySelector('.popup__submit-btn');
let formPopup = document.forms.popupForm;



let openForm = () => {
  if (!formElement.classList.contains('popup_opened')) {
      formPopup.newName.value = profileName.textContent;
      formPopup.newDescription.value = profileJob.textContent;
      formElement.classList.add('popup_opened');
  }
}

let closeForm = (event) => {
    formElement.classList.remove('popup_opened');
}

let formSubmitHandler = (event) => {
  event.preventDefault();
  profileName.textContent = formPopup.newName.value;
  profileJob.textContent = formPopup.newDescription.value;
  closeForm(event);
}

  formProfile.addEventListener('submit', formSubmitHandler);
  editButton.addEventListener ('click',openForm);
  closeButton.addEventListener ('click',closeForm);
  