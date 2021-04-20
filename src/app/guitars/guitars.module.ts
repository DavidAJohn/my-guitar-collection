import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GuitarsComponent } from './guitars.component';
import { DetailsComponent } from './details/details.component';
import { GuitarsRoutingModule } from './guitars-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [GuitarsComponent, DetailsComponent],
  imports: [
    CommonModule,
    SharedModule,
    GuitarsRoutingModule,
    RouterModule
  ]
})
export class GuitarsModule { }
