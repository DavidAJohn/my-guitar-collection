import { GuitarsService } from './../../services/guitars.service';
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Guitar } from '../../models/guitar';
import { CardActionType } from '../../models/cardActionType';

@Component({
  selector: 'app-guitar-card-list',
  templateUrl: './guitar-card-list.component.html',
  styleUrls: ['./guitar-card-list.component.scss']
})
export class GuitarCardListComponent implements OnInit {
  guitars$: Observable<Guitar[]>;
  @Input() items: number;
  @Input() orderByField: string;
  @Input() orderDirection: "desc" | "asc";
  @Input() includePrivate: boolean = false;
  @Input() ownerId: string = "";
  @Input() cardActionType: CardActionType = CardActionType.None;

  constructor(private guitarService: GuitarsService) { }

  ngOnInit(): void {
    if (this.ownerId != "") {
      this.loadGuitarsForPlayer();
    } else {
      this.loadAllGuitars();
    }
  }

  private loadAllGuitars() {
    this.guitars$ = this.guitarService.loadGuitars(
      this.items,
      this.orderByField,
      this.orderDirection,
      this.includePrivate
    );
  }

  private loadGuitarsForPlayer() {
    this.guitars$ = this.guitarService.loadGuitarsForPlayerCollection(
      this.items,
      this.orderByField,
      this.orderDirection,
      this.ownerId
    );
  }

}
