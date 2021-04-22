import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GuitarsComponent } from './guitars.component';
import { DetailsComponent } from './details/details.component';
import { GuitarsRoutingModule } from './guitars-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [GuitarsComponent, DetailsComponent],
  imports: [
    CommonModule,
    SharedModule,
    GuitarsRoutingModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule
  ]
})
export class GuitarsModule { }
