import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from '../core/guards/auth.guard';
import { CollectionComponent } from './collection/collection.component';
import { AddNewGuitarComponent } from './add-new-guitar/add-new-guitar.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'collection', canActivate: [AuthGuard], component: CollectionComponent,
    data: {
      breadcrumb: {
        label: 'Your Collection'
      }
    }
  },
  {path: 'add-new-guitar', canActivate: [AuthGuard], component: AddNewGuitarComponent,
    data: {
      breadcrumb: {
        label: 'Add New Guitar'
      }
    }
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AccountRoutingModule { }
