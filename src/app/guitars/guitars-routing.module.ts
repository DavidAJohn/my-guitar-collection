import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { GuitarsComponent } from './guitars.component';
import { DetailsComponent } from './details/details.component';


const routes: Routes = [
  {path: '', pathMatch: 'full', component: GuitarsComponent,
    data: {
      breadcrumb: {
        label: 'Guitars',
        info: 'guitars'
      }
    }
  },
  {path: 'details', component: DetailsComponent},
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class GuitarsRoutingModule { }
