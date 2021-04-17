import { Component, Input, OnInit } from '@angular/core';

export enum CardActionType {
  None = 0,
  Share = 1,
  Edit,
  Likes
}

@Component({
  selector: 'app-guitar-card',
  templateUrl: './guitar-card.component.html',
  styleUrls: ['./guitar-card.component.scss']
})
export class GuitarCardComponent implements OnInit {
  @Input() cardActionType: CardActionType = CardActionType.Share;
  cardActionTypesEnum = CardActionType;

  constructor() { }

  ngOnInit(): void {
  }

}
