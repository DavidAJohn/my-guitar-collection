import { GuitarsService } from './../../shared/services/guitars.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Guitar } from 'src/app/shared/models/guitar';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  guitar: Guitar;

  constructor(private route: ActivatedRoute, private guitarsService: GuitarsService) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.queryParamMap.get('id');
    this.showGuitarDetails(id);
  }

  showGuitarDetails(id: string): void {
    this.guitarsService.loadGuitarById(id)
      .subscribe(guitar => {
        this.guitar = guitar;
      }, error => {
        console.log(error);
      });
  }
}
