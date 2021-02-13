import './index.css';

import {
  buttonAddCard,
  buttonEditProfile,
  buttonEditAvatar,
  formAddCard,
  formEditProfile,
  formEditAvatar,
  inputProfileJob,
  inputProfileName,
  inputAvatarLink,
  settingValidateForm,
  inputCardId
} from '../utils/constants.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import FormValidator from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

const changeCardLike = (isLike, cardId) => {
  if (isLike) {
    return api.deleteCardLike(cardId);
  } else{
    return api.addCardLike(cardId);
  }
}

const createCard = (data, isMine) => {
  const isLike = data.likes.some( (item) => { return item._id === mineId });
  const imageCard = new Card(data, isMine, isLike, '.template-card', handleCardClick, handleDeleteCard, changeCardLike);
  return imageCard.generateCard();
};

const handleCardClick = (name,link) => {
  popupWithImage.open( {name, link} );
};

const handleDeleteCard = (cardId) => {
  inputCardId.value = cardId;
  popupDeleteCard.open();
}

const openPopupAddCard = () => {
  addCardValidator.resetValidation();
  popupAddCard.open();
};

const openPopupEditAvatar = () => {
  inputAvatarLink.value = userInfo.getAvatar();
  avatarValidator.resetValidation();
  popupEditAvatar.open();
}

const openPopupEditProfile = () => {
  const data = userInfo.getUserInfo();
  inputProfileName.value = data.name;
  inputProfileJob.value = data.job;
  profileValidator.resetValidation();
  popupEditProfile.open();
};

const submitFormAddCard = ({ name, link }) => {
  popupAddCard.renderLoading(true);
  api.addCard({name, link})
    .then((data) => {
      defaultCardList.addItem( createCard(data, true));
      popupAddCard.close();
    })
    .catch( (err) => {
      console.log(err);
    })
    .finally( () => {
      popupAddCard.renderLoading(false);
    })
};

const submitFormEditAvatar = ({link}) => {
  popupEditAvatar.renderLoading(true);
  api.changeAvatar(link)
    .then( (data) =>{
      userInfo.setAvatar(data.avatar);
      popupEditAvatar.close();
    })
    .catch( (err) => {
      console.log(err);
    })
    .finally( () => {
      popupEditAvatar.renderLoading(false);
    })
}

const submitFormProfile = ({ name, job}) => {
  popupEditProfile.renderLoading(true);
  api.changeUserInfo({name, job})
    .then( (data) => {
      userInfo.setUserInfo({ name: data.name, job: data.about });
      popupEditProfile.close();
    })
    .catch( (err) => {
      console.log(err);
    })
    .finally( () => {
      popupEditProfile.renderLoading(false);
    })
};

const submitDeleteCard = ({cardId}) => {
  api.deleteCard(cardId)
    .then( (data) => {
      document.querySelector(`#id${cardId}`).remove();
      popupDeleteCard.close();
    })
    .catch( (err) => {
      console.log(err);
    });
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
const popupEditAvatar = new PopupWithForm('.popup_type_edit-avatar', submitFormEditAvatar)
const popupDeleteCard = new PopupWithForm('.popup_type_delete-card', submitDeleteCard)

const addCardValidator = new FormValidator(settingValidateForm, formAddCard);
const profileValidator = new FormValidator(settingValidateForm, formEditProfile);
const avatarValidator = new FormValidator(settingValidateForm, formEditAvatar); 

const defaultCardList = new Section({
  renderer: (item) => {
    defaultCardList.addItem( createCard(item) );
  }
}, '.cards');

buttonAddCard.addEventListener('click',  openPopupAddCard);
buttonEditProfile.addEventListener('click', openPopupEditProfile);
buttonEditAvatar.addEventListener('click', openPopupEditAvatar);

popupWithImage.setEventListeners();
popupAddCard.setEventListeners();
popupEditProfile.setEventListeners();
popupEditAvatar.setEventListeners();
popupDeleteCard.setEventListeners();

addCardValidator.enableValidation();
profileValidator.enableValidation();
addCardValidator.enableValidation();

let mineId = '';

api.getUserInfo()
  .then((data) => {
    mineId = data._id;
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
      defaultCardList.addItem( createCard(item, item.owner._id === mineId) );
    });
  })
  .catch( (err) => {
    console.log(err);
  })