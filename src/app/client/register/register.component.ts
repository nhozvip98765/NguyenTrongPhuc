import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public RegisterForm!: FormGroup;
  constructor(private http: HttpClient,private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.RegisterForm = this.formBuilder.group({
      fullname: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      phone: ['', Validators.required],
    })
  }

  onSubmit(): void {
    this.http.post<any>("http://localhost:3000/auth", this.RegisterForm.value)
    .subscribe(res => {
      alert("Đăng ký thành công");
      this.RegisterForm.reset();
      this.router.navigate(['client/login']);
    }, err => {
      alert("Đăng ký thất bại")
    })
  }
}
