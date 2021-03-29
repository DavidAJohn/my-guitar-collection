import { AccountService } from './../account.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

// import custom validator to check that password and confirm password fields match
import { MustMatch } from '../../shared/helpers/must-match.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  hidePassword: boolean;
  hideConfirmPassword: boolean;
  isSubmitting = false;

  constructor(private formBuilder: FormBuilder,
              private accountService: AccountService) { }

  ngOnInit(): void {
    this.createRegisterForm();
  }

  // getter to simplify the template validation code
  get rf() { return this.registerForm.controls; }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required,
                // Password with the following requirements:
                // At least 8 characters long
                // At least 1 uppercase letter, at least 1 lowercase and at least 1 number
                Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$')]),
      confirmPassword: new FormControl('', [Validators.required]),
      displayName: new FormControl('', [Validators.required, Validators.minLength(2)]),
      biography: new FormControl('', [Validators.maxLength(150)]),
      profileImagePath: new FormControl({value: 'Your profile image will be set automatically', disabled: true})
    }, {
      validator: MustMatch('password', 'confirmPassword') // custom validator from 'shared/helpers/must-match.validator'
    });

    this.hidePassword = true;
    this.hideConfirmPassword = true;
  }

  onSubmit() {
    if (this.registerForm.value) {
      this.isSubmitting = true;

      const formValues = this.registerForm.value;
      const { email, password, displayName, biography } = formValues; // destructure the form input values

      this.accountService.registerWithEmailAndPassword(email, password, displayName, biography);
    }
  }

  // registerWithGoogle() {
  //   this.accountService.registerWithGoogle();
  // }

}
