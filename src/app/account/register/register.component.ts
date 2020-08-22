import { MatSnackBar } from '@angular/material/snack-bar';
import { AccountService } from './../account.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Player } from 'src/app/shared/models/player';

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

  constructor(private formBuilder: FormBuilder, private accountService: AccountService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.createRegisterForm();
  }

  // getter to simplify the template validation code
  get rf() { return this.registerForm.controls; }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
      realName: new FormControl('', [Validators.required, Validators.minLength(2)]),
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
      const formValues = this.registerForm.value;
      const { email, password, realName, biography, profileImagePath } = formValues; // destructure the object values

      const player: Player = this.accountService.createNewPlayer(email, password, realName, biography, profileImagePath);
      if (player != null) {
        console.log(player);
        this.snackBar.open('Created new player account!', '', { duration: 3000 });
      }
      else {
        // console.log('Could not create new player');
        this.snackBar.open('Could not create new player account', '', { duration: 3000 });
      }
    }
  }
}
