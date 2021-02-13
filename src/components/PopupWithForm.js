import Popup from './Popup.js';

export default class PopupWithForm extends Popup{
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._form = this._popup.querySelector('.form');
    this._inputList = this._form.querySelectorAll('.form__input');
    this._submitButton = this._form.querySelector('.form__button-submit');
    this._submitText = this._submitButton.textContent;
    this._submitForm = submitForm;
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  close() {
    super.close();
    this._inputList.forEach((input) => {
      input.value = '';
    });
  }

  renderLoading(isLoading, textLoading) {
    if (isLoading) {
      this._submitButton.textContent = textLoading;
    } else {
      this._submitButton.textContent = this._submitText;
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitForm( this._getInputValues() );
    });
  }
}