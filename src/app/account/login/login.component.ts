import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AccountService } from '../account.service';
import firebase from 'firebase/app';
import 'firebase/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  hidePassword: boolean;
  loggedInUser$: Observable<firebase.User>;

  constructor(private accountService: AccountService) {
    this.loggedInUser$ = this.accountService.playerData$;
  }

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
    const formValues = this.loginForm.value;
    const { email, password } = formValues;

    this.accountService.logInWithEmailAndPassword(email, password);
  }

  logInWithGoogle() {
    this.accountService.logInWithGoogle();
  }
}
