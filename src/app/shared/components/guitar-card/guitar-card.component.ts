import { Component, Input, OnInit } from '@angular/core';
import { CardActionType } from '../../models/cardActionType'

@Component({
  selector: 'app-guitar-card',
  templateUrl: './guitar-card.component.html',
  styleUrls: ['./guitar-card.component.scss']
})
export class GuitarCardComponent implements OnInit {
  @Input() cardActionType: CardActionType = CardActionType.None;
  @Input() likes: number = 0;
  cardActionTypesEnum = CardActionType;

  constructor() { }

  ngOnInit(): void {
  }

}
