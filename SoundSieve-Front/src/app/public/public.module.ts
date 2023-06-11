import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { JoinComponent } from './pages/join/join.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from '../pipes/pipes.module';
import { ProfileComponent } from './pages/profile/profile/profile.component';


@NgModule({
  declarations: [
    JoinComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    PipesModule
  ]
})
export class PublicModule { }
