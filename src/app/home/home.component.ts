import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CardActionType } from '../shared/components/guitar-card/guitar-card.component';
import { Guitar } from '../shared/models/guitar';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  recentGuitars$: Observable<Guitar[]>;
  cardActionType = CardActionType;
  
  constructor(private homeService: HomeService) { }

  ngOnInit(): void {
    this.loadRecentGuitars();
  }

  loadRecentGuitars() {
    this.recentGuitars$ = this.homeService.loadRecentGuitars();
  }
}
