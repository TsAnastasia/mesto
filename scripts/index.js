import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';

const page = document.querySelector('.page');
const buttonEditProfile = page.querySelector('.button_action_edit');
const buttonAddCard = page.querySelector('.button_action_add');
const buttonsClose = page.querySelectorAll('.button_action_close');
const popupEditProfile = page.querySelector('.popup_type_edit-profile');
const popupAddCard = page.querySelector('.popup_type_add-card');
export const popupViewCard = page.querySelector('.popup_type_view-card');
const nameContainer = page.querySelector('.profile__item_el_name');
const jobContainer = page.querySelector('.profile__item_el_job');
const formEditProfile = document.forms.editProfile;
const inputProfileName = document.forms.editProfile.elements.name;
const inputProfileJob = document.forms.editProfile.elements.job;
const formAddCard = document.forms.addCard;
const inputAddCardName = document.forms.addCard.elements.name;
const inputAddCardUrl = document.forms.addCard.elements.url;
export const cardsContainer = page.querySelector('.cards');
const popupContainers = [...page.querySelectorAll('.popup')];
const formList = [...document.querySelectorAll('.form')];
const settingValidateForm = {
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button-submit',
  inputErrorClass: 'form__input_error',
  errorClass: 'form__error_visible'
};

const initialCards = [
  {name: 'Архыз', link: './images/arkhyz.jpg'},
  {name: 'Челябинская область', link: './images/chelyabinsk-oblast.jpg'},
  {name: 'Иваново', link: './images/ivanovo.jpg'},
  {name: 'Камчатка', link: './images/kamchatka.jpg'},
  {name: 'Холмогорский район', link: './images/kholmogorsky-rayon.jpg'},
  {name: 'Байкал', link: './images/baikal.jpg' }
];

export const openPopup = (popup) => {
  page.addEventListener('keyup',  closePopupKeyupEscape);
  popup.classList.add('popup_opened');
};

const clearErrorsFormOnOpenPopup = (formElement, isSubmit = false) =>{
  const inputList = [...formElement.querySelectorAll(settingValidateForm.inputSelector)];
  inputList.forEach((inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
    inputElement.classList.remove(settingValidateForm.inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(settingValidateForm.errorClass);
  });
  const buttonElement = formElement.querySelector(settingValidateForm.submitButtonSelector);
  isSubmit ? buttonElement.removeAttribute('disabled') : buttonElement.setAttribute('disabled', true);
};

const openPopupEditProfile = () => {
  inputProfileName.value = nameContainer.textContent;
  inputProfileJob.value = jobContainer.textContent;
  clearErrorsFormOnOpenPopup(formEditProfile, true);
  openPopup(popupEditProfile);
};

const openPopupAddCard = () => {
  inputAddCardName.value = '';
  inputAddCardUrl.value = '';
  clearErrorsFormOnOpenPopup(formAddCard);
  openPopup(popupAddCard);
};

const closePopup = (popup) => {
  page.removeEventListener('keyup', closePopupKeyupEscape);
  popup.classList.remove('popup_opened');
};

const closePopupKeyupEscape = (evt) => {
  if (evt.key === 'Escape'){
    closePopup(page.querySelector('.popup_opened'));
  }
};

const submitFormProfile = (evt) => {
  evt.preventDefault();
  nameContainer.textContent = inputProfileName.value;
  jobContainer.textContent = inputProfileJob.value;
  closePopup(popupEditProfile);
};

const submitFormAddCard = (evt) => {
  evt.preventDefault();
  const imageCard = new Card({name: inputAddCardName.value, link: inputAddCardUrl.value}, '.template-card');
  cardsContainer.prepend( imageCard.generateCard() );
  closePopup(popupAddCard);
};

const addInitialCards = () => {
  initialCards.reverse().forEach((item) => { 
    const imageCard = new Card(item, '.template-card');
    cardsContainer.prepend( imageCard.generateCard() );
  });
};

buttonEditProfile.addEventListener('click', openPopupEditProfile);
buttonAddCard.addEventListener('click',  openPopupAddCard);
buttonsClose.forEach(button => button.addEventListener('click', (evt) => {
  closePopup(evt.target.closest('.popup'));
}));
popupContainers.forEach(popup => {
  popup.addEventListener('click', (evt) => {
    const element = evt.target;
    if (element.classList.contains('popup')) {
      closePopup(element);
    };
  });
});
formEditProfile.addEventListener('submit', submitFormProfile);
formAddCard.addEventListener('submit', submitFormAddCard);

formList.forEach((item) => {
  const formValidator = new FormValidator(settingValidateForm, item);
  formValidator.enableValidation();
});

addInitialCards();