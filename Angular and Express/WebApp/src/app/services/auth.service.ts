import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}
  loginType: string = '';
  login(loginData: any, loginType: string) {
    //console.log('login type at auth', loginType);
    this.loginType = loginType;
    localStorage.setItem(loginType, JSON.stringify(loginData));
    return true;
  }
  logout() {
    localStorage.removeItem(this.loginType);
  }
  isUserLoggedIn() {
    if (localStorage.getItem(this.loginType)) {
      return true;
    } else {
      return false;
    }
  }
  isLoggedInAsTeacher() {
    if (localStorage.getItem(this.loginType)) {
      if (this.loginType == 'teacher') {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}
