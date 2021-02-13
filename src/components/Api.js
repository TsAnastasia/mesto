export default class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  };

  _getData(url) {
    return  fetch(url, {
      method: 'GET',
      headers: this._headers
    })
    .then( (res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка ${res.status}`);
      }
    });
  }

  _patchData(url, data) {
    return fetch(url, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data)
    })
    .then( (res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка ${res.status}`);
      }
    });
  }

  _postData(url, data) {
    return fetch(url, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data)
    })
    .then( (res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка ${res.status}`);
      }
    });
  }

  getInitialCards() {
    return this._getData(`${this._baseUrl}/cards`);
  };

  getUserInfo() {
    return this._getData(`${this._baseUrl}/users/me`);
  };

  postCard({name, link}) {
    return this._postData(`${this._baseUrl}/cards`, {
      name, 
      link
    });
  }

  patchUserInfo({name, job}) {
    return this._patchData(`${this._baseUrl}/users/me`, {
      name: name,
      about: job
    });
  }
}

