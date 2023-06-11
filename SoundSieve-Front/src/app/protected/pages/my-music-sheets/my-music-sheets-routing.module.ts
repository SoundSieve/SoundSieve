import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SheetListComponent } from './pages/sheet-list/sheet-list.component';
import { AddSheetComponent } from './pages/add-sheet/add-sheet.component';

const routes: Routes = [
  { path: '', component: SheetListComponent, },
  { path: 'add', component: AddSheetComponent, },
  { path: 'edit/:id', component: AddSheetComponent, },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyMusicSheetsRoutingModule { }
