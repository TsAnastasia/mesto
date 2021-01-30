import {
  initialCards,
  buttonAddCard,
  buttonEditProfile,
  formAddCard,
  inputAddCardName,
  inputAddCardLink,
  formEditProfile,
  inputProfileJob,
  inputProfileName,
  settingValidateForm
} from '../utils/constants.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import FormValidator from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo.js';

//const cardsContainer = page.querySelector('.cards');

const createCard = (data) => {
  const imageCard = new Card(data, '.template-card', handleCardClick/*, cardsContainer*/);
  return imageCard.generateCard();
};

const openPopupAddCard = () => {
  addCardValidator.resetValidation();
  popupAddCard.open();
};

const openPopupEditProfile = () => {
  const data = userInfo.getUserInfo();
  inputProfileName.value = data.name;
  inputProfileJob.value = data.job;
  profileValidator.resetValidation();
  popupEditProfile.open();
};

const handleCardClick = (name,link) => {
  popupWithImage.open( {name, link} );
};

const submitFormAddCard = (evt) => {
  evt.preventDefault();
  defaultCardList.addItem( createCard({
    name: inputAddCardName.value, 
    link: inputAddCardLink.value
  }));
  popupAddCard.close();
};

const submitFormProfile = (evt) => {
  evt.preventDefault();
  userInfo.setUserInfo({
    name: inputProfileName.value, 
    job: inputProfileJob.value
  });
  popupEditProfile.close();
};

const userInfo = new UserInfo({ 
  nameSelector: '.profile__item_el_name', 
  jobSelector: '.profile__item_el_job'
});

const popupWithImage = new PopupWithImage('.popup_type_view-card');
const popupAddCard = new PopupWithForm('.popup_type_add-card', submitFormAddCard);
const popupEditProfile = new PopupWithForm('.popup_type_edit-profile', submitFormProfile);

const addCardValidator = new FormValidator(settingValidateForm, formAddCard);
const profileValidator = new FormValidator(settingValidateForm, formEditProfile);

const defaultCardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, '.template-card', handleCardClick/*, cardsContainer*/);
    defaultCardList.addItem( card.generateCard() );
  }
}, '.cards');

buttonAddCard.addEventListener('click',  openPopupAddCard);
buttonEditProfile.addEventListener('click', openPopupEditProfile);

popupWithImage.setEventListeners();
popupAddCard.setEventListeners();
popupEditProfile.setEventListeners();

addCardValidator.enableValidation();
profileValidator.enableValidation();

defaultCardList.renderItems();