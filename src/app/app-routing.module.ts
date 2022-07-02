import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  { path: '', redirectTo: '/users', pathMatch: 'full' },
  {
    path: 'users',

    loadChildren:
      /*
    Now, generally, it doesn't matter which of the two approaches you use, but this is the more modern one. And if you are getting errors with the approach, I'm showing the lectures with just a string based one switch to this one instead.
    */
      () => import('./users/users.module').then((m) => m.UsersModule),
  },
  {
    path: 'selectedUsersPool',
    loadChildren: () =>
      import('./selected-users-pool/selected-users-pool.module').then(
        (m) => m.SelectedUsersPoolModule
      ),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules }),
    // lazy loading kullandığımız için preloadAllModules iptal ettik.
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
