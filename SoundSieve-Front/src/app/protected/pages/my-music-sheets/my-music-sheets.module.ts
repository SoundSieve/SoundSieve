import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyMusicSheetsRoutingModule } from './my-music-sheets-routing.module';
import { AddSheetComponent } from './pages/add-sheet/add-sheet.component';
import { SheetListComponent } from './pages/sheet-list/sheet-list.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    AddSheetComponent,
    SheetListComponent
  ],
  imports: [
    CommonModule,
    MyMusicSheetsRoutingModule,
    SharedModule,
  ]
})
export class MyMusicSheetsModule { }
