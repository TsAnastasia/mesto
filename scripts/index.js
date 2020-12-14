const page = document.querySelector('.page');
const buttonEditProfile = page.querySelector('.button_action_edit');
const buttonAddCard = page.querySelector('.button_action_add');
const buttonsClose = page.querySelectorAll('.button_action_close');
const submitEditProfile = page.querySelector('.submit-profile');
const submitAddCard = page.querySelector('.submit-card');
const popupEditProfile = page.querySelector('.popup_type_edit-profile');
const popupAddCard = page.querySelector('.popup_type_add-card');
const popupViewCard = page.querySelector('.popup_type_view-card');
const nameContainer = page.querySelector('.profile__item_el_name');
const jobContainer = page.querySelector('.profile__item_el_job');
const inputProfileName = popupEditProfile.querySelector('.form__item_el_name');
const inputProfileJob = popupEditProfile.querySelector('.form__item_el_job');
const inputAddCardName = popupAddCard.querySelector('.form__item_el_name');
const inputAddCardUrl = popupAddCard.querySelector('.form__item_el_url');
const templateCard = page.querySelector('.template-card').content;
const cardsContainer = page.querySelector('.cards');

const initialCards = [
  {name: 'Архыз', link: './images/arkhyz.jpg'},
  {name: 'Челябинская область', link: './images/chelyabinsk-oblast.jpg'},
  {name: 'Иваново', link: './images/ivanovo.jpg'},
  {name: 'Камчатка', link: './images/kamchatka.jpg'},
  {name: 'Холмогорский район', link: './images/kholmogorsky-rayon.jpg'},
  {name: 'Байкал', link: './images/baikal.jpg' }
];

const renderAdded = () => {
  const cards = cardsContainer.querySelectorAll('.card');
  const noCards = page.querySelector('.no-cards');

  cards.length === 0 ? noCards.classList.remove('no-cards_hidden') : noCards.classList.add('no-cards_hidden');
}

const openPopup = (popup) => {
  popup.classList.add('popup_opened');
}

const openPopupEditProfile = () => {
  inputProfileName.value = nameContainer.textContent;
  inputProfileJob.value = jobContainer.textContent;
  openPopup(popupEditProfile);
}

const openPopupViewCard = (card) => {
  popupViewCard.querySelector('.view-card__title').textContent = card.querySelector('.card__title').textContent;
  popupViewCard.querySelector('.view-card__image').src = card.querySelector('.card__image').src;
  openPopup(popupViewCard);
}

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
}

const createCard = (name, link) => {
  const newCard = templateCard.cloneNode(true);
  const imageContainer = newCard.querySelector('.card__image');
  const nameContainer = newCard.querySelector('.card__title');
  const buttonLike = newCard.querySelector('.button-like');
  const buttonDelete = newCard.querySelector('.button_action_delete-card');
  const imageDarkening = newCard.querySelector('.card__image-darkening');
  imageContainer.src = link;
  nameContainer.textContent= name;
  buttonLike.addEventListener('click', (evt) => {
    evt.target.classList.toggle('button-like_active');
  });
  buttonDelete.addEventListener('click', (evt) => {
    evt.target.closest('.card').parentElement.remove();
    renderAdded();
  });
  imageDarkening.addEventListener('click', (evt) => {
    openPopupViewCard(evt.target.closest('.card'));
  });
  return newCard;
}

const addCardToBegin = (card) => {
  cardsContainer.prepend(card);
  renderAdded();
}

const formSubmitProfile = (evt) => {
  evt.preventDefault();
  nameContainer.textContent = inputProfileName.value;
  jobContainer.textContent = inputProfileJob.value;
  closePopup(evt.target.closest('.popup'));
}

const formSibmitCard = (evt) => {
  evt.preventDefault();
  addCardToBegin(createCard(inputAddCardName.value, inputAddCardUrl.value));
  closePopup(evt.target.closest('.popup'));
}

const addInitialCards = () => {
  initialCards.reverse().forEach((item) => { 
    addCardToBegin(createCard(item.name, item.link));
  });
}

buttonEditProfile.addEventListener('click', openPopupEditProfile);
buttonAddCard.addEventListener('click',  () => {
  openPopup(popupAddCard);
});
buttonsClose.forEach(button => button.addEventListener('click', (evt) => {
  closePopup(evt.target.closest('.popup'));
}));
submitEditProfile.addEventListener('click', formSubmitProfile);
submitAddCard.addEventListener('click', formSibmitCard);

addInitialCards();
renderAdded();