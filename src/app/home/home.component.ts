import { Component, OnInit } from '@angular/core';
import { CardActionType } from './../shared/models/cardActionType';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  cardActionType: CardActionType;

  constructor() { }

  ngOnInit(): void {
    this.cardActionType = CardActionType.Likes;
  }

}
