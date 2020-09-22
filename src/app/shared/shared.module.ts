import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuitarCardComponent } from './components/guitar-card/guitar-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [GuitarCardComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule
  ],
  exports: [
    GuitarCardComponent
  ]
})
export class SharedModule { }
