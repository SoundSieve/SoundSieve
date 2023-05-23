import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: 'sign-up', component: LoginComponent },
      { path: 'sign-in', component: RegisterComponent },
      { path: 'forgot-password',
      loadChildren: () => import('./pages/reset-password/reset-password.module').then( m => m.ResetPasswordModule )
      },
      { path: '**', redirectTo: 'sign-up' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
