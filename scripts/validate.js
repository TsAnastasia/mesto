const showInputError = (formElement, inputElement, errorMessage, setting) => {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.add(setting.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(setting.errorClass);
};

const hideInputError = (formElement, inputElement, setting) => {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.remove(setting.inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(setting.errorClass);
};

const checkInputValidity = (formElement, inputElement, setting) =>{
  !inputElement.validity.valid ? showInputError(formElement, inputElement, inputElement.validationMessage, setting) : hideInputError(formElement, inputElement,setting);
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) =>{
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.setAttribute('disabled', true);
  }else{
    buttonElement.removeAttribute('disabled');
  };
};

const enableValidation = (setting) => {
  const formList = [...document.querySelectorAll(setting.formSelector)];
  formList.forEach((formElement) =>{
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });   
    const inputList = [...formElement.querySelectorAll(setting.inputSelector)];
    const buttonElement = formElement.querySelector(setting.submitButtonSelector);
    toggleButtonState (inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () =>{
        checkInputValidity(formElement, inputElement, setting);
        toggleButtonState (inputList, buttonElement);
      });
    });
  });
};

const renderForms = () => {
  enableValidation({
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__button-submit',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__error_visible'
  });
}