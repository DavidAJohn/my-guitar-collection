import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  hidePassword: boolean;

  constructor() { }

  ngOnInit(): void {
    this.createLoginForm();
  }

  // getters to simplify the template validation code
  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  createLoginForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
    this.hidePassword = true;
  }

  onSubmit() {
    console.log(this.loginForm.value);
  }
}
