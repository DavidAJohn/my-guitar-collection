import { GuitarsService } from './../../shared/services/guitars.service';
import { CardActionType } from './../../shared/components/guitar-card/guitar-card.component';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Guitar } from 'src/app/shared/models/guitar';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit {
  currentFirebaseAuthPlayer$: Observable<firebase.User | null>;
  ownerId: string = "";
  guitars$: Observable<Guitar[] | null>;
  cardActionType = CardActionType;

  constructor(private accountService: AccountService, private guitarsService: GuitarsService) {
  }

  ngOnInit(): void {
    this.getCurrentFirebaseAuthPlayer();
  }

  getCurrentFirebaseAuthPlayer() {
    this.currentFirebaseAuthPlayer$ = this.accountService.getPlayer();

    this.currentFirebaseAuthPlayer$
      .subscribe((user: firebase.User) => {
        this.ownerId = user.uid;

        this.guitars$ = this.guitarsService.loadGuitarsForPlayerCollection(
          10, "createdAt", "desc", this.ownerId
        );
      });
  }

}
