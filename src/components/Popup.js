export default class Popup {
  constructor(popupSelector){
    this._popup = document.querySelector(popupSelector);
    this._closeEsc = this._handleEscClose.bind(this);
  };

  _handleEscClose(evt) {
    if (evt.key === 'Escape'){
      this.close();
    }
  };

  _handleClosePopup(evt) {
    const elementClasses = evt.target.classList;
    if (elementClasses.contains('popup') || elementClasses.contains('popup__button-close')) {
      this.close();
    };
  }

  close() {
    document.removeEventListener('keyup', this._closeEsc);
    this._popup.classList.remove('popup_opened');
  };

  open() {
    document.addEventListener('keyup', this._closeEsc);
    this._popup.classList.add('popup_opened');
  };

  setEventListeners() {
    this._popup.addEventListener('click', this._handleClosePopup.bind(this));
  }
}