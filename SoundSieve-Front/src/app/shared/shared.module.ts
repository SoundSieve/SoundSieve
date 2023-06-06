import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { ButtonComponent } from './components/button/button.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TableComponent } from './components/table/table.component';
import { CardComponent } from './components/card/card.component';
import { PipesModule } from '../pipes/pipes.module';
import { SpinnerComponent } from './components/spinner/spinner.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SearchBarComponent,
    ButtonComponent,
    DropdownComponent,
    TableComponent,
    CardComponent,
    SpinnerComponent,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SearchBarComponent,
    ButtonComponent,
    DropdownComponent,
    TableComponent,
    CardComponent,
    SpinnerComponent,
  ],
  imports: [CommonModule, SharedRoutingModule, RouterModule, FormsModule, PipesModule],
})
export class SharedModule {}
