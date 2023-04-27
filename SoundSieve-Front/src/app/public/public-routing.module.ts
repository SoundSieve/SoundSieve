import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JoinComponent } from './pages/join/join.component';

const routes: Routes = [
  {
    path: '', component: JoinComponent
  },
  { path: 'search',
  loadChildren: () => import('./pages/search/search.module').then( m => m.SearchModule )
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
