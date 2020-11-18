let page = document.querySelector('.page');
let popup = page.querySelector('.popup');
let editButton = page.querySelector('.button_action_edit');
let formElement = page.querySelector('.form');
let nameInput = formElement.querySelector('.form__item_el_name');
let jobInput = formElement.querySelector('.form__item_el_job');
let nameContainer = page.querySelector('.profile__item_el_name');
let jobContainer = page.querySelector('.profile__item_el_job');
let closeFormIcon = page.querySelector('.form__button-close');
let elementsContainer = page.querySelector('.elements');

//проверка наличия фотографий
function renderAdded() {
  let elements = elementsContainer.querySelectorAll('.element');
  let noElements = elementsContainer.querySelector('.no-elements');

  if (elements.length === 0) {
    noElements.classList.remove('no-elements_hidden')
  } else {
    noElements.classList.add('no-elements_hidden')
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

editButton.addEventListener('click', openPopup)
closeFormIcon.addEventListener('click', closePopup)
formElement.addEventListener('submit', formSubmitHandler); 

renderAdded()