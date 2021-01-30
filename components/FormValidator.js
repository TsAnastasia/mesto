export default class FormValidator {
  constructor({ inputSelector, submitButtonSelector, inputErrorClass, errorClass }, formElement) {
    this._errorClass = errorClass;
    this._inputErrorClass = inputErrorClass;
    this._inputSelector = inputSelector;
    this._submitButtonSelector = submitButtonSelector;
    this._formElement = formElement;
    this._inputList = [...this._formElement.querySelectorAll(this._inputSelector)];
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
  };

  _checkInputValidity(inputElement) {
    !inputElement.validity.valid ? this._showInputError(inputElement, inputElement.validationMessage) : this._hideInputError(inputElement);
  };

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.name}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(this._errorClass);
  };

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.name}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  };

  _toggleButtonState = () => {
    if (this._hasInvalidInput()) {
      this._buttonElement.setAttribute('disabled', true);
    }else{
      this._buttonElement.removeAttribute('disabled');
    };
  };

  enableValidation() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  };

  resetValidation() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
    this._toggleButtonState();
  };
}