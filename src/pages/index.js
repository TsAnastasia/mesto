import './index.css';

import {
  buttonAddCard,
  buttonEditProfile,
  formAddCard,
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
import Api from '../components/Api.js';

const createCard = (data) => {
  const imageCard = new Card(data, '.template-card', handleCardClick, handleDeleteCard);
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

const handleDeleteCard = () => {
  console.log('delete');
  popupDeleteCard.open();
}

const submitFormAddCard = ({ name, link }) => {
  api.postCard({name, link})
    .then((data) => {
      defaultCardList.addItem( createCard({ name: data.name, link: data.link , likes: data.likes}));
      popupAddCard.close();
    })
    .catch( (err) => {
      console.log(err);
    });
};

const submitFormProfile = ({ name, job}) => {
  api.patchUserInfo({name, job})
    .then( (data) => {
      userInfo.setUserInfo({ name: data.name, job: data.about });
      popupEditProfile.close();
    })
    .catch( (err) => {
      console.log(err);
    });
};

const submitDeleteCard = () => {
  popupDeleteCard.close()
}

const userInfo = new UserInfo({ 
  nameSelector: '.profile__item_el_name', 
  jobSelector: '.profile__item_el_job',
  avatarSelector: '.profile__avatar'
});

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-20',
  headers: {
    authorization: '468a6ac8-f9d9-4ce3-a0e9-898f734d821d',
    'Content-Type': 'application/json'
  }
});

const popupWithImage = new PopupWithImage('.popup_type_view-card');
const popupAddCard = new PopupWithForm('.popup_type_add-card', submitFormAddCard);
const popupEditProfile = new PopupWithForm('.popup_type_edit-profile', submitFormProfile);
const popupDeleteCard = new PopupWithForm('.popup_type_delete-card', submitDeleteCard)

const addCardValidator = new FormValidator(settingValidateForm, formAddCard);
const profileValidator = new FormValidator(settingValidateForm, formEditProfile);

const defaultCardList = new Section({
  renderer: (item) => {
    defaultCardList.addItem( createCard(item) );
  }
}, '.cards');

buttonAddCard.addEventListener('click',  openPopupAddCard);
buttonEditProfile.addEventListener('click', openPopupEditProfile);

popupWithImage.setEventListeners();
popupAddCard.setEventListeners();
popupEditProfile.setEventListeners();
popupDeleteCard.setEventListeners();

addCardValidator.enableValidation();
profileValidator.enableValidation();

api.getUserInfo()
  .then((data) => {
    userInfo.setUserInfo({
      name: data.name,
      job: data.about
    });
    userInfo.setAvatar(data.avatar);
  })
  .catch( (err) => {
    console.log(err);
  });

api.getInitialCards()
  .then((data) => {
    defaultCardList.clear();
    data.reverse().forEach((item) => {     
      //console.log(item) //!!!
      defaultCardList.addItem( 
        createCard({ 
          name: item.name,
          link: item.link,
          likes: item.likes 
        })
      );
    });
  })
  .catch( (err) => {
    console.log(err);
  })