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

function renderAdded() {
  const cards = cardsContainer.querySelectorAll('.card');
  const noCards = page.querySelector('.no-cards');

  if (cards.length === 0) {
    noCards.classList.remove('no-cards_hidden');
  } else {
    noCards.classList.add('no-cards_hidden');
  }
}

function openPopupEditProfile(){
  inputProfileName.value = nameContainer.textContent;
  inputProfileJob.value = jobContainer.textContent;
  popupEditProfile.classList.add('popup_opened');
}

function openPopupAddCard(){
  popupAddCard.classList.add('popup_opened');
}

function openPopupViewCard(evt){
  const card = evt.target.closest('.card');
  popupViewCard.querySelector('.view-card__title').textContent = card.querySelector('.card__title').textContent;
  popupViewCard.querySelector('.view-card__image').src = card.querySelector('.card__image').src;
  popupViewCard.classList.add('popup_opened');
}

function closePopup(evt){
  evt.target.closest('.popup').classList.remove('popup_opened');
}

function formSubmitProfile (evt){
  evt.preventDefault(); // отмена стандартной отправки формы
  nameContainer.textContent = inputProfileName.value;
  jobContainer.textContent = inputProfileJob.value;
  closePopup(evt);
}

function formSibmitCard (evt){
  evt.preventDefault(); // отмена стандартной отправки формы
  addCardToBegin(inputAddCardName.value, inputAddCardUrl.value);
  closePopup(evt);
}

function addCardToBegin(name, link){
  const newCard = templateCard.cloneNode(true);
  newCard.querySelector('.card__image').src = link;
  newCard.querySelector('.card__image').alt = 'Фото ' + String(cardsContainer.querySelectorAll('.card').length + 1);
  newCard.querySelector('.card__title').textContent= name;
  newCard.querySelector('.button-like').addEventListener('click', function (evt){
    evt.target.classList.toggle('button-like_active');
  });
  newCard.querySelector('.button_action_delete-card').addEventListener('click', function(evt){
    evt.target.closest('.card').parentElement.remove();
    renderAdded();
  });  
  newCard.querySelector('.card__image-darkening').addEventListener('click', openPopupViewCard);
  cardsContainer.prepend(newCard);
  renderAdded();
}

function addInitialCards(){
  initialCards.reverse().forEach(item => addCardToBegin(item.name, item.link));
}

buttonEditProfile.addEventListener('click', openPopupEditProfile);
buttonAddCard.addEventListener('click', openPopupAddCard);
buttonsClose.forEach(button => button.addEventListener('click', closePopup));
submitEditProfile.addEventListener('click', formSubmitProfile);
submitAddCard.addEventListener('click', formSibmitCard);

addInitialCards();
renderAdded();