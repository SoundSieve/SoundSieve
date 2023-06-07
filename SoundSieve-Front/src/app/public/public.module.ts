import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { JoinComponent } from './pages/join/join.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    JoinComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    SharedModule
  ]
})
export class PublicModule { }
