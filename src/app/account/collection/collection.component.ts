import { CardActionType } from './../../shared/components/guitar-card/guitar-card.component';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import firebase from 'firebase/app';
import 'firebase/auth';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit {
  loggedInUser$: Observable<firebase.User>;
  cardActionType = CardActionType;

  constructor(private accountService: AccountService) {
    this.loggedInUser$ = this.accountService.playerData$;
  }

  ngOnInit(): void {
  }

}
