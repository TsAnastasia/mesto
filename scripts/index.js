let page = document.querySelector('.page');
let popup = page.querySelector('.popup');
const editButton = page.querySelector('.button_action_edit');
const addButton = page.querySelector('.button_action_add');
const likeButton = page.querySelector('.button_action_like');
let formElement = page.querySelector('.form');
let nameInput = formElement.querySelector('.form__item_el_name');
let jobInput = formElement.querySelector('.form__item_el_job');
let nameContainer = page.querySelector('.profile__item_el_name');
let jobContainer = page.querySelector('.profile__item_el_job');
let closeFormIcon = page.querySelector('.form__button-close');
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

function openPopup(){
  nameInput.value = nameContainer.innerHTML;
  jobInput.value = jobContainer.innerHTML;
  popup.classList.add('popup_opened');
}

function closePopup(){
  popup.classList.remove('popup_opened')
}

function formSubmitHandler (evt) {
  evt.preventDefault(); // отмена стандартной отправки формы

  nameContainer.textContent = nameInput.value;
  jobContainer.textContent = jobInput.value;

  popup.classList.remove('popup_opened')
}

function addCardToEnd(card){
  const newCard = templateCard.cloneNode(true);
  newCard.querySelector('.card__image').src = card.link;
  newCard.querySelector('.card__image').alt = 'Фото ' + String(cardsContainer.querySelectorAll('.card').length + 1);
  newCard.querySelector('.card__title').textContent= card.name;
  cardsContainer.append(newCard);
  renderAdded();
}

function addInitialCards(){
  initialCards.forEach(item => addCardToEnd(item));
}

editButton.addEventListener('click', openPopup)
closeFormIcon.addEventListener('click', closePopup)
formElement.addEventListener('submit', formSubmitHandler); 
addButton.addEventListener('click', openPopupAddCard);

addInitialCards()
renderAdded()