import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AccountService } from '../account.service';
import { User } from 'firebase';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  hidePassword: boolean;
  loggedInUser$: Observable<User>;

  constructor(private accountService: AccountService,
              private router: Router) {
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
    const { email, password } = formValues; // destructure the form object values

    this.logInWithEmailAndPassword(email, password);
  }

  logInWithEmailAndPassword(email: string, password: string) {
    this.accountService.logInWithEmailAndPassword(email, password);
  }

  // logInWithGoogle() {
  //   this.accountService.logInWithGoogle();
  // }
}
