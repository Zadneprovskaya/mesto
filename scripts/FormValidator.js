export class FormValidator {
  constructor (validationConfig, popupName) {
    this.popupSelector = validationConfig.popupSelector;
    this.inputSelector = validationConfig.inputSelector;
    this.inputException = validationConfig.inputException;
    this.submitButtonSelector = validationConfig.submitButtonSelector;
    this.inactiveButtonClass = validationConfig.inactiveButtonClass;
    this.inputErrorClass = validationConfig.inputErrorClass;
    this.errorClass = validationConfig.errorClass;
    this.popupName = popupName;
  }

  _showInputError (inputElement) {
    const errorElement = this.popupName.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add(this.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this.errorClass);
  };

  _hideInputError (inputElement) {
    const errorElement = this.popupName.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove(this.inputErrorClass);
    errorElement.classList.remove(this.errorClass);
    errorElement.textContent = '';
  };

  _isValid (inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _hasInvalidInput (inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };

  _toggleButtonState (inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this.inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(this.inactiveButtonClass);
      buttonElement.disabled = false;
    }
  };

  _setEventListeners () {
    const inputList = Array.from(this.popupName.querySelectorAll(this.inputSelector));
    const buttonElement = this.popupName.querySelector(this.submitButtonSelector);

    this._toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  };

  enableValidation () {
    this._setEventListeners();
  }
}
