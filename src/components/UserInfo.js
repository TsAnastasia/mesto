export default class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector}) {
    this._nameContainer = document.querySelector(nameSelector);
    this._jobContainer = document.querySelector(jobSelector);
    this._avatarContainer = document.querySelector(avatarSelector);
  }

  getAvatar() {
    const url = this._avatarContainer.style.backgroundImage;
    return url.slice(5, url.length - 2);
  }

  getUserInfo() {
    return { 
      name: this._nameContainer.textContent, 
      job: this._jobContainer.textContent 
    };
  };

  setAvatar(imageLink) {
    this._avatarContainer.style.backgroundImage = `url("${imageLink}")`;
  };

  setUserInfo({name, job}) {
    this._nameContainer.textContent = name;
    this._jobContainer.textContent = job;
  };
}