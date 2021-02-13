export default class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector}) {
    this._nameContainer = document.querySelector(nameSelector);
    this._jobContainer = document.querySelector(jobSelector);
    this._avatarContainer = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return { 
      name: this._nameContainer.textContent, 
      job: this._jobContainer.textContent 
    };
  };

  setUserInfo({name, job}) {
    this._nameContainer.textContent = name;
    this._jobContainer.textContent = job;
  };

  setAvatar(imageLink) {
    this._avatarContainer.src = imageLink;
  }
}