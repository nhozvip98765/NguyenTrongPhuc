import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
 
  userLogin: any;
  constructor() { }

  ngOnInit(): void {
    
  }

  checkLogin() {
    let currentUser = localStorage.getItem("UserLogin");
    if(currentUser && currentUser.length > 0)
    {
      this.userLogin = JSON.parse(currentUser);
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem('UserLogin');
    // localStorage.clear();
    window.location.reload();
    alert("Đăng xuất thành công")
  }
}
