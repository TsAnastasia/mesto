const page = document.querySelector('.page');
export const buttonEditProfile = page.querySelector('.button_action_edit');
export const buttonAddCard = page.querySelector('.button_action_add');
export const formAddCard = document.forms.addCard;
export const formEditProfile = document.forms.editProfile;
const formDeleteCard = document.forms.deleteCard;
export const inputProfileJob = formEditProfile.elements.job;
export const inputProfileName = formEditProfile.elements.name;
export const inputCardId = formDeleteCard.elements.cardId;

export const settingValidateForm = {
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button-submit',
  inputErrorClass: 'form__input_error',
  errorClass: 'form__error_visible'
};