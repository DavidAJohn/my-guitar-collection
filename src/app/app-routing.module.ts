import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', component: HomeComponent,
    data: {
      breadcrumb: {
        label: 'Home',
        info: 'home'
      }
    }
  },
  {path: 'account', loadChildren: () => import('./account/account.module')
    .then(mod => mod.AccountModule),
    data: {
      breadcrumb: {skip: true}
    }
  },
  {path: 'guitars', loadChildren: () => import('./guitars/guitars.module')
    .then(mod => mod.GuitarsModule),
    data: {
      breadcrumb: {skip: true}
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
