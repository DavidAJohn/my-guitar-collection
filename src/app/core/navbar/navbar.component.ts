import { AccountService } from './../../account/account.service';
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Player } from 'src/app/shared/models/player';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import 'firebase/auth';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  currentFirebasePlayer$: Observable<firebase.User | null>;
  currentLocalPlayer$: Observable<Player>;

  constructor(private accountService: AccountService, private fireAuth: AngularFireAuth) {}

  ngOnInit(): void {
    this.fireAuth.onAuthStateChanged(user => {
      if (user !== null) {
        this.getFirebasePlayer();
      }
    })
  }

  getFirebasePlayer() {
    this.currentFirebasePlayer$ = this.accountService.playerData$;
    this.getCurrentPlayer();
  }

  getCurrentPlayer() {
    if (this.currentFirebasePlayer$ !== null) {
      this.accountService.getPlayer().pipe(
        switchMap((player: firebase.User) => {
          return this.accountService.getPlayerDetailsFromFirestore(player.uid);
        })
      ).subscribe(data => {
        data.docs.map(p => {
          if (p.exists) {
            const tempPlayer: string = JSON.stringify(p.data());
            this.currentLocalPlayer$ = of(JSON.parse(tempPlayer));
          }
        });
      });
    }
  }

  logout() {
    this.accountService.logOut();
  }
}
