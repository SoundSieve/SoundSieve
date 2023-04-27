import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule )
  },
  {
    path: 'es',
    loadChildren: () => import('./public/public.module').then( m => m.PublicModule )
  },
  {
    path: 'browse',
    loadChildren: () => import('./protected/protected.module').then( m => m.ProtectedModule )
  },
  {
    path: '**',
    redirectTo: 'es'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
