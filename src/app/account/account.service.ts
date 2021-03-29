import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from 'firebase/app';
import { first } from 'rxjs/operators';
import * as firebase from 'firebase/app';
import { environment } from 'src/environments/environment';
import { Player } from '../shared/models/player';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  playerData$: Observable<User>;
  currentLocalPlayer$: Observable<Player>;
  playerCollectionName = environment.playerCollectionName;

  constructor(private fireAuth: AngularFireAuth,
              private fireStore: AngularFirestore,
              private snackBar: MatSnackBar,
              private router: Router
              ) {
    this.playerData$ = this.fireAuth.authState;
  }

  getAuthState() {
    return this.playerData$;
  }

  getPlayer() {
    return this.playerData$.pipe(first());
  }

  getPlayerDetailsFromFirestore(uid: string) {
    // get the user details from Firestore, from their Firebase auth uid
    return this.fireStore.collection(this.playerCollectionName, ref => ref.where('uid', '==', uid)).get();
  }

  logInWithEmailAndPassword(email: string, password: string) {
    this.fireAuth.signInWithEmailAndPassword(email, password)
      .then(res => {
        this.snackBar.open('Login successful', '', { duration: 3000 });
        this.router.navigateByUrl('/account/collection');
        console.log('Successfully logged in as: ' + res.user.email);
      })
      .catch(error => {
        this.snackBar.open('Login failed', '', { duration: 3000 });
        console.log('Login failed:', error.message);
      });
  }

  logInWithGoogle(){
    return new Promise<any>((resolve, reject) => {
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');

      this.fireAuth.signInWithPopup(provider)
      .then(res => {
        resolve(res);
        this.snackBar.open('Login successful', '', { duration: 3000 });
        this.router.navigateByUrl('/account/collection');
        console.log('Successfully logged in with Google as: ' + res.user.email);
      }, err => {
        console.log(err);
        reject(err);
        this.snackBar.open('Login failed', '', { duration: 3000 });
      });
    });
  }

  logOut() {
    this.fireAuth.signOut()
    .then(() => {
      console.log('Logged out successfully');
      this.snackBar.open('Logged out', '', { duration: 2000 });
      this.router.navigateByUrl('/');
    })
    .catch((error) => {
      console.log(error);
      console.log('Log out failed');
    });
  }

  registerWithEmailAndPassword(email: string, password: string, displayName: string, biography: string)  {
    this.fireAuth.createUserWithEmailAndPassword(email, password)
      .then(() => {

        firebase.firestore()
          .collection(this.playerCollectionName)
          .doc(firebase.auth().currentUser.uid)
          .set({
            uid: firebase.auth().currentUser.uid,
            displayName,
            email,
            biography,
            profileImagePath: this.generateRandomProfileImage(),
            dateCreated: firebase.firestore.Timestamp.fromDate(new Date()),
            guitarsOwned: [],
            ampsOwned: []
          })
          .catch(error => {
            console.log('Something went wrong with adding user to firestore: ', error);
          })

          this.snackBar.open('Registration successful', '', { duration: 3000 });
          this.router.navigateByUrl('/account/collection');
      })
      .catch((error) => {
        console.log('Could not create user in firebase: ', error.message);
      });
  }

  registerWithGoogle() {
    throw new Error('Method not implemented.');
  }

  private generateRandomProfileImage() {
    // get a random profile image from 'randomuser.me' until image upload functionality is added
    const gender = Math.round(Math.random()); // should be 0 or 1
    const imageNumber = Math.floor(Math.random() * 100);

    const imagePath = 'https://randomuser.me/api/portraits/thumb/' + (gender === 1 ? 'men/' : 'women/') + imageNumber + '.jpg';
    return imagePath;
  }
}
