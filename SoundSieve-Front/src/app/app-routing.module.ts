import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard, NoAuthGuard } from './auth/guards';

const routes: Routes = [
  {
    path: 'auth',
    canActivate: [ NoAuthGuard ],
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule ),
  },
  {
    path: 'es',
    loadChildren: () => import('./public/public.module').then( m => m.PublicModule )
  },
  {
    path: 'browse',
    canActivate: [ AuthGuard ],
    loadChildren: () => import('./protected/protected.module').then( m => m.ProtectedModule ),
  },
  {
    path: '**',
    redirectTo: (AuthGuard)?'browse':'es'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
