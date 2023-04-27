import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import { ResultListComponent } from './pages/result-list/result-list.component';
import { MusicSheetDetailsComponent } from './pages/music-sheet-details/music-sheet-details.component';


@NgModule({
  declarations: [
    ResultListComponent,
    MusicSheetDetailsComponent
  ],
  imports: [
    CommonModule,
    SearchRoutingModule
  ]
})
export class SearchModule { }
