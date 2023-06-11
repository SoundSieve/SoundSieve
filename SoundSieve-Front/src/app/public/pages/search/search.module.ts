import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import { ResultListComponent } from './pages/result-list/result-list.component';
import { MusicSheetDetailsComponent } from './pages/music-sheet-details/music-sheet-details.component';
import { MainComponent } from './pages/main/main.component';
import { SharedModule } from "../../../shared/shared.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from 'src/app/pipes/pipes.module';


@NgModule({
    declarations: [
        ResultListComponent,
        MusicSheetDetailsComponent,
        MainComponent
    ],
    imports: [
        CommonModule,
        SearchRoutingModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        PipesModule
    ]
})
export class SearchModule { }
