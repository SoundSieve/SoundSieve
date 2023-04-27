import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExploreComponent } from './pages/explore/explore.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: ExploreComponent},
      { path: 'my-music-sheets',
        loadChildren: () => import('./pages/my-music-sheets/my-music-sheets.module').then( m => m.MyMusicSheetsModule )
      },
      { path: 'my-profile',
        loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfileModule )
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProtectedRoutingModule { }
