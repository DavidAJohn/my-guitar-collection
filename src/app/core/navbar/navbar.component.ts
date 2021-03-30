import { AccountService } from './../../account/account.service';
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Player } from 'src/app/shared/models/player';
import { User } from 'firebase';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  currentFirebasePlayer$: Observable<firebase.User | null>;
  currentLocalPlayer$: Observable<Player>;

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.getFirebasePlayer();
    this.getCurrentPlayer();
  }

  getFirebasePlayer() {
    this.currentFirebasePlayer$ = this.accountService.playerData$;
  }

  getCurrentPlayer() {
    this.accountService.getPlayer().pipe(
      switchMap((player: User) => {
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

  logout() {
    this.accountService.logOut();
  }
}
