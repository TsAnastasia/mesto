let page = document.querySelector('.page');
let popup = page.querySelector('.popup');

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
  let nameContainer = page.querySelector('.profile__item_el_name');
  let jobContainer = page.querySelector('.profile__item_el_job');
  let formName = popup.querySelector('.form__item_el_name');
  let formJob = popup.querySelector('.form__item_el_job');
  formName.value = nameContainer.innerHTML;
  formJob.value = jobContainer.innerHTML;
  popup.classList.add('popup_opened');

}

let editButton = page.querySelector('.button_action_edit');
editButton.addEventListener('click', openPopup)

function closePopup(){
  popup.classList.remove('popup_opened')
}

let closeFormIcon = page.querySelector('.form__close-icon');
closeFormIcon.addEventListener('click', closePopup)


let formElement = page.querySelector('.form');

function formSubmitHandler (evt) {
  evt.preventDefault(); // отмена стандартной отправки формы

  let nameInput = formElement.querySelector('.form__item_el_name');
  let jobInput = formElement.querySelector('.form__item_el_job');

  let name = nameInput.value;
  let job = jobInput.value;
    
  let nameContainer = page.querySelector('.profile__item_el_name');
  let jobContainer = page.querySelector('.profile__item_el_job');

  nameContainer.textContent = name;
  jobContainer.textContent = job;

  popup.classList.remove('popup_opened')
}

formElement.addEventListener('submit', formSubmitHandler); 

renderAdded()