let container = document.querySelector('.container');
let profileInfo = container.querySelector('.profile-info');
let editButton = profileInfo.querySelector('.profile-info__edit-button');
let profileName = profileInfo.querySelector('.profile-info__name');
let profileJob = profileInfo.querySelector('.profile-info__description');
let formElement = container.querySelector('.popup');
let formContainer = formElement.querySelector('.popup__container');
let closeButton = formElement.querySelector('.popup__button-close');
let nameInput = formElement.querySelector('.popup__text_value_name');
let jobInput = formElement.querySelector('.popup__text_value_description');
let valueName = profileName.textContent;
let valueJob = profileJob.textContent;



let openForm = () => {
  if (formElement.classList.contains('popup_opened')) {
      formElement.classList.remove('popup_opened');
      nameInput.setAttribute('value',valueName);
      jobInput.setAttribute('value',valueJob);
  }
}

let closeForm = (event) => {
  if(!formContainer.contains(event.target) || event.target === closeButton) {
    event.preventDefault();
    formElement.classList.add('popup_opened');
  }
}

let formSubmitHandler = (event) => {
  event.preventDefault();
  profileName.textContent = document.forms.popupForm.newName.value;
  profileJob.textContent = document.forms.popupForm.newDescription.value;
  formElement.classList.add('popup_opened');
}

  formContainer.addEventListener('submit', formSubmitHandler);
  editButton.addEventListener ('click',openForm);
  formElement.addEventListener ('click',closeForm);
  