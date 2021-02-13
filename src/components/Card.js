export default class Card {
  constructor({ name, link, likes, _id}, cardSelector, handleCardClick, handleDeleteCard) {
    this._title = name;
    this._imageLink = link;
    this._likes = likes;
    this._id = _id;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
  };
  
  _deleteCard() {
    this._handleDeleteCard(this._id);
  };

  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector('li').cloneNode(true);
    return cardElement;
  };

  _setEventListeners() {
    this._element.querySelector('.button-like').addEventListener('click', (evt) => {
      this._toggleLike(evt);
    });
    this._element.querySelector('.card__figure').addEventListener('click', () => {
      this._handleCardClick(this._title, this._imageLink);
    });
  };

  _toggleLike(evt) {
    evt.stopPropagation();
    evt.target.classList.toggle('button-like_active');
  };

  generateCard(isMine) {
    this._element = this._getTemplate();

    this._element.id = `id${this._id}`;

    this._cardImage = this._element.querySelector('.card__image');
    this._cardImage.src = this._imageLink;
    this._cardImage.alt = this._title;

    this._element.querySelector('.card__title').textContent = this._title;
    this._element.querySelector('.card__like-count').textContent = this._likes.length;

    this._deleteButton = this._element.querySelector('.button_action_delete-card');
    
    if (isMine) {
      this._deleteButton.addEventListener('click', () => {
        this._deleteCard();
      });
    } else {
      this._deleteButton.remove();
    }

    this._setEventListeners();

    return this._element;
  };
};