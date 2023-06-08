import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProtectedRoutingModule } from './protected-routing.module';
import { ExploreComponent } from './pages/explore/explore.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ExploreComponent
  ],
  imports: [
    CommonModule,
    ProtectedRoutingModule,
    SharedModule
  ]
})
export class ProtectedModule { }
