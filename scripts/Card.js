import {cardsContainer, popupViewCard, openPopup} from './index.js';

export class Card {
  constructor(data, cardSelector) {
    this._imageLink = data.link;
    this._title = data.name;
    this._cardSelector = cardSelector;
  };
  
  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector).content.cloneNode(true);
    return cardElement;
  };

  _openPopupViewCard() {
    popupViewCard.querySelector('.view-card__title').textContent = this._title;
    popupViewCard.querySelector('.view-card__image').src = this._imageLink;
    openPopup(popupViewCard);
  };

  _toggleLike(evt) {
    evt.stopPropagation();
    evt.target.classList.toggle('button-like_active');
  };

  _deleteCard(evt) {
    evt.stopPropagation();
    evt.target.closest('.card').parentElement.remove();
    this._renderCards();
  };
  
  _renderCards() {
    if (!cardsContainer.children.length) {
      cardsContainer.textContent = '';
    };
  }

  _setEventListeners() {
    this._element.querySelector('.button-like').addEventListener('click', (evt) => {
      this._toggleLike(evt);
    });
    this._element.querySelector('.button_action_delete-card').addEventListener('click', (evt) => {
      this._deleteCard(evt);
    });
    this._element.querySelector('.card').addEventListener('click', () => {
      this._openPopupViewCard();
    });
  };

  generateCard() {
    this._element = this._getTemplate();

    this._element.querySelector('.card__image').src = this._imageLink;
    this._element.querySelector('.card__title').textContent = this._title;

    this._setEventListeners();

    return this._element;
  };
};