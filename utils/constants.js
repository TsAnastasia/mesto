export const initialCards = [
  {name: 'Архыз', link: './images/arkhyz.jpg'},
  {name: 'Челябинская область', link: './images/chelyabinsk-oblast.jpg'},
  {name: 'Иваново', link: './images/ivanovo.jpg'},
  {name: 'Камчатка', link: './images/kamchatka.jpg'},
  {name: 'Холмогорский район', link: './images/kholmogorsky-rayon.jpg'},
  {name: 'Байкал', link: './images/baikal.jpg' }
];

const page = document.querySelector('.page');
export const buttonEditProfile = page.querySelector('.button_action_edit');
export const buttonAddCard = page.querySelector('.button_action_add');
export const formAddCard = document.forms.addCard;
export const inputAddCardName = formAddCard.elements.name;
export const inputAddCardLink = formAddCard.elements.link;
export const formEditProfile = document.forms.editProfile;
export const inputProfileJob = formEditProfile.elements.job;
export const inputProfileName = formEditProfile.elements.name;

export const settingValidateForm = {
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button-submit',
  inputErrorClass: 'form__input_error',
  errorClass: 'form__error_visible'
};