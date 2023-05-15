import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';
import { NoAuthGuard } from './auth/guards/no-auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule ),
    canActivate: [ NoAuthGuard ],
    canLoad: [ NoAuthGuard ],
  },
  {
    path: 'es',
    loadChildren: () => import('./public/public.module').then( m => m.PublicModule )
  },
  {
    path: 'browse',
    loadChildren: () => import('./protected/protected.module').then( m => m.ProtectedModule ),
    canActivate: [ AuthGuard ],
    canLoad: [ AuthGuard ],
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
