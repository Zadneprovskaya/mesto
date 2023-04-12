export class FormValidator {
  constructor (validationConfig, popupForm) {
    this._popupSelector = validationConfig.popupSelector;
    this._inputSelector = validationConfig.inputSelector;
    this._inputException = validationConfig.inputException;
    this._submitButtonSelector = validationConfig.submitButtonSelector;
    this._inactiveButtonClass = validationConfig.inactiveButtonClass;
    this._inputErrorClass = validationConfig.inputErrorClass;
    this._popupForm = popupForm;
    this._inputList = Array.from(this._popupForm.querySelectorAll(this._inputSelector));
    this._buttonElement = this._popupForm.querySelector(this._submitButtonSelector);
  }

  _showInputError (inputElement) {
    const errorElement = this._popupForm.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
  };

  _hideInputError (inputElement) {
    const errorElement = this._popupForm.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = '';
  };

  _isValid (inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _hasInvalidInput () {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };

  _toggleButtonState () {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  };

  resetValidation() {
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

  _setEventListeners () {
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this._toggleButtonState();
      });
    });
  };

  enableValidation () {
    this._setEventListeners();
  }
}
