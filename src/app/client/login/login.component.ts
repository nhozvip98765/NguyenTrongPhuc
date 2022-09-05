import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm!: FormGroup;
  constructor(private http: HttpClient ,private router:Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  onSubmit(): void {
   this.http.get<any>("http://localhost:3000/auth").subscribe(res => {
    const user = res.find((a:any) => {
      return a.username === this.loginForm.value.username && a.password === this.loginForm.value.password
    });
    let strUser = localStorage.setItem("UserLogin", JSON.stringify(user));
    console.log(strUser);
    if (this.loginForm.value.username == "admin") {
      alert("Đăng nhập thành công");
      this.router.navigate(['admin']);
    } else if (user) {
      alert("Đăng nhập thành công")
      this.router.navigate(['client']);
    }
     else {
      alert('Đăng nhập thất bại')
    }
   }, err => {
    alert("Something went wrong!!")
   } )
  }
}
