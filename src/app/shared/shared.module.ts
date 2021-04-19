import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuitarCardListComponent } from './components/guitar-card-list/guitar-card-list.component';
import { GuitarCardActionsComponent } from './components/guitar-card-actions/guitar-card-actions.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [GuitarCardListComponent, GuitarCardActionsComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule
  ],
  exports: [
    GuitarCardListComponent,
    GuitarCardActionsComponent
  ]
})
export class SharedModule { }
