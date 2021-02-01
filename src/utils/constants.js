import image001 from '../images/arkhyz.jpg';
import image002 from '../images/chelyabinsk-oblast.jpg';
import image003 from '../images/ivanovo.jpg';
import image004 from '../images/kamchatka.jpg';
import image005 from '../images/kholmogorsky-rayon.jpg';
import image006 from '../images/baikal.jpg';

export const initialCards = [
  {name: 'Архыз', link: image001},
  {name: 'Челябинская область', link: image002},
  {name: 'Иваново', link: image003},
  {name: 'Камчатка', link: image004},
  {name: 'Холмогорский район', link: image005},
  {name: 'Байкал', link: image006}
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