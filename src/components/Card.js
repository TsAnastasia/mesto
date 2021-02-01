export default class Card {
  constructor({ name, link }, cardSelector, handleCardClick) {
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._imageLink = link;
    this._title = name;
  };
  
  _deleteCard() {
    this._element.remove()
  };

  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector('li').cloneNode(true);
    return cardElement;
  };

  _setEventListeners() {
    this._element.querySelector('.button-like').addEventListener('click', (evt) => {
      this._toggleLike(evt);
    });
    this._element.querySelector('.button_action_delete-card').addEventListener('click', () => {
      this._deleteCard();
    });
    this._element.querySelector('.card__figure').addEventListener('click', () => {
      this._handleCardClick(this._title, this._imageLink);
    });
  };

  _toggleLike(evt) {
    evt.stopPropagation();
    evt.target.classList.toggle('button-like_active');
  };

  generateCard() {
    this._element = this._getTemplate();

    this._cardImage = this._element.querySelector('.card__image');
    this._cardImage.src = this._imageLink;
    this._cardImage.alt = this._title;

    this._element.querySelector('.card__title').textContent = this._title;

    this._setEventListeners();

    return this._element;
  };
};