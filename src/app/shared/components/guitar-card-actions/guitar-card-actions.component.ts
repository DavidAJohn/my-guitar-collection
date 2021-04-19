import { Component, Input, OnInit } from '@angular/core';
import { CardActionType } from '../../models/cardActionType';

@Component({
  selector: 'app-guitar-card-actions',
  templateUrl: './guitar-card-actions.component.html',
  styleUrls: ['./guitar-card-actions.component.scss']
})
export class GuitarCardActionsComponent implements OnInit {
  @Input() cardActionType: CardActionType = CardActionType.None;
  @Input() likes: number = 0;
  cardActionTypesEnum = CardActionType;
  
  constructor() { }

  ngOnInit(): void {
  }

}
