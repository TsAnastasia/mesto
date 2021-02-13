export default class Card {
  constructor({ _id, name, link, likes}, isMine, isLike, cardSelector, handleCardClick, handleDeleteCard, changeLike) {
    this._title = name;
    this._imageLink = link;
    this._id = _id;
    this._likeCount = likes.length;
    this._isLike = isLike;
    this._isMine = isMine;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    this._changeLike = changeLike;
  };
  
  _deleteCard() {
    this._handleDeleteCard(this._id);
  };

  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector('li').cloneNode(true);
    return cardElement;
  };

  _setEventListeners() {
    this._likeContainer.addEventListener('click', (evt) => {
      evt.stopPropagation();
      this._toggleLike();
    });
    this._element.querySelector('.card__figure').addEventListener('click', () => {
      this._handleCardClick(this._title, this._imageLink);
    });
  };

  _toggleLike() {
    this._changeLike(this._isLike, this._id)
      .then( (data) => {
        console.log(data);
        this._isLike = !this._isLike;
        this._likeCount = data.likes.length;
        this._updateLike();
      })
      .catch( (err) => {
        console.log(err);
      });
  };

  _updateLike() {
    this._likesContainer.textContent = this._likeCount;
    if (this._isLike){
      this._likeContainer.classList.add('button-like_active');
    } else {
      this._likeContainer.classList.remove('button-like_active');
    }
  }

  generateCard() {
    this._element = this._getTemplate();

    this._element.id = `id${this._id}`;

    this._cardImage = this._element.querySelector('.card__image');
    this._cardImage.src = this._imageLink;
    this._cardImage.alt = this._title;

    this._element.querySelector('.card__title').textContent = this._title;

    this._likeContainer = this._element.querySelector('.button-like');
    this._likesContainer = this._element.querySelector('.card__like-count');
    this._updateLike();

    this._deleteButton = this._element.querySelector('.button_action_delete-card');
    
    if (this._isMine) {
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