import { GuitarsService } from './../../services/guitars.service';
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Guitar } from '../../models/guitar';

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
  @Input() includePrivate: boolean;

  constructor(private guitarService: GuitarsService) { }

  ngOnInit(): void {
    this.guitars$ = this.guitarService.loadGuitars(
      this.items, 
      this.orderByField,
      this.orderDirection,
      this.includePrivate
    );
  }

}
