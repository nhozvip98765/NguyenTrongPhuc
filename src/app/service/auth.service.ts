import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userLogin: any;
  constructor() { }

  checkLogin() {
    let currentUser = localStorage.getItem("UserLogin");
    if(currentUser && currentUser.length > 0)
    {
      this.userLogin = JSON.parse(currentUser);
      return true;
    }
    return false;
  }
}
