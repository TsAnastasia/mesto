import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';

const initialCards = [
  {name: 'Архыз', link: './images/arkhyz.jpg'},
  {name: 'Челябинская область', link: './images/chelyabinsk-oblast.jpg'},
  {name: 'Иваново', link: './images/ivanovo.jpg'},
  {name: 'Камчатка', link: './images/kamchatka.jpg'},
  {name: 'Холмогорский район', link: './images/kholmogorsky-rayon.jpg'},
  {name: 'Байкал', link: './images/baikal.jpg' }
];

const page = document.querySelector('.page');
const buttonEditProfile = page.querySelector('.button_action_edit');
const buttonAddCard = page.querySelector('.button_action_add');
const buttonsClose = page.querySelectorAll('.button_action_close');
const cardsContainer = page.querySelector('.cards');
const jobContainer = page.querySelector('.profile__item_el_job');
const nameContainer = page.querySelector('.profile__item_el_name');
const formAddCard = document.forms.addCard;
const inputAddCardName = formAddCard.elements.name;
const inputAddCardUrl = formAddCard.elements.url;
const formEditProfile = document.forms.editProfile;
const inputProfileJob = formEditProfile.elements.job;
const inputProfileName = formEditProfile.elements.name;
const formsList = [...document.querySelectorAll('.form')];
const popupAddCard = page.querySelector('.popup_type_add-card');
const popupEditProfile = page.querySelector('.popup_type_edit-profile');
const popupViewCard = page.querySelector('.popup_type_view-card');
const popupsContainers = [...page.querySelectorAll('.popup')];
const viewCardImage = popupViewCard.querySelector('.view-card__image');
const viewCardTitle = popupViewCard.querySelector('.view-card__title');

const settingValidateForm = {
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button-submit',
  inputErrorClass: 'form__input_error',
  errorClass: 'form__error_visible'
};

const addCardValidator = new FormValidator(settingValidateForm, formAddCard);
const profileValidator = new FormValidator(settingValidateForm, formEditProfile);

const addInitialCards = () => {
  initialCards.reverse().forEach((item) => { 
    cardsContainer.prepend( createCard(item) );
  });
};

const createCard = (data) => {
  const imageCard = new Card(data, '.template-card', handleCardClick, cardsContainer);
  return imageCard.generateCard();
};

const openPopup = (popup) => {
  page.addEventListener('keyup',  closePopupKeyupEscape);
  popup.classList.add('popup_opened');
};

const openPopupAddCard = () => {
  inputAddCardName.value = '';
  inputAddCardUrl.value = '';
  addCardValidator.resetValidation();
  openPopup(popupAddCard);
};

const openPopupEditProfile = () => {
  inputProfileName.value = nameContainer.textContent;
  inputProfileJob.value = jobContainer.textContent;
  profileValidator.resetValidation();
  openPopup(popupEditProfile);
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

const handleCardClick = (name,link) => {
  viewCardTitle.textContent = name;
  viewCardImage.src = link;
  openPopup(popupViewCard);
};

const submitFormAddCard = (evt) => {
  evt.preventDefault();
  cardsContainer.prepend( createCard({name: inputAddCardName.value, link: inputAddCardUrl.value}) );
  closePopup(popupAddCard);
};

const submitFormProfile = (evt) => {
  evt.preventDefault();
  nameContainer.textContent = inputProfileName.value;
  jobContainer.textContent = inputProfileJob.value;
  closePopup(popupEditProfile);
};

buttonAddCard.addEventListener('click',  openPopupAddCard);
buttonEditProfile.addEventListener('click', openPopupEditProfile);
buttonsClose.forEach(button => button.addEventListener('click', (evt) => {
  closePopup(evt.target.closest('.popup'));
}));
formAddCard.addEventListener('submit', submitFormAddCard);
formEditProfile.addEventListener('submit', submitFormProfile);
popupsContainers.forEach(popup => {
  popup.addEventListener('click', (evt) => {
    const element = evt.target;
    if (element.classList.contains('popup')) {
      closePopup(element);
    };
  });
});

addCardValidator.enableValidation();
profileValidator.enableValidation();

addInitialCards();