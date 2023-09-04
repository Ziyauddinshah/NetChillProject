import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}
  logout() {
    localStorage.removeItem('Key');
    localStorage.removeItem('jwtToken');
  }
  isLoggedIn() {
    if (localStorage.getItem('Key') != null) {
      return true;
    } else {
      return false;
    }
  }
  asBuyer() {
    if (localStorage.getItem('Key') != null) {
      let data = localStorage.getItem('Key');
      var data1 = JSON.parse(data ? data : '');
      if (data1.UserType === 'Buyer') {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
  loggedInUserName() {
    if (localStorage.getItem('Key') != null) {
      let data = localStorage.getItem('Key');
      var data1 = JSON.parse(data ? data : '');
      return data1.UserName;
    }
  }
  loggedInUserId() {
    if (localStorage.getItem('Key') != null) {
      let data = localStorage.getItem('Key');
      var data1 = JSON.parse(data ? data : '');
      return data1.Id;
    }
  }
  getJwtToken() {
    if (localStorage.getItem('Key') != null) {
      let token = localStorage.getItem('jwtToken');
      return token;
    }
    return '';
  }
}
