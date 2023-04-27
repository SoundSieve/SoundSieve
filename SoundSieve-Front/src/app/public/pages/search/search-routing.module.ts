import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResultListComponent } from './pages/result-list/result-list.component';
import { MusicSheetDetailsComponent } from './pages/music-sheet-details/music-sheet-details.component';
import { MainComponent } from './pages/main/main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', component: ResultListComponent },
      { path: 'details/:id', component: MusicSheetDetailsComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchRoutingModule { }
