export class UserInfo {
  constructor({ selectorName, selectorInfo, selectorAvatar }) {
    this._name = document.querySelector(selectorName);
    this._info = document.querySelector(selectorInfo);
    this._avatar = document.querySelector(selectorAvatar);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      info: this._info.textContent
    }
  }

  setUserInfo(data) {
    this._name.textContent = data.name;
    this._info.textContent = data.info;
    this._avatar.src = data.avatar;
  }
}
