import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersComponent } from './users.component';
import { AuthGuard } from '../auth/auth.guard';
import { UserStartComponent } from './user-start/user-start.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UsersResolverService } from './users-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: UserStartComponent },
      { path: 'new', component: UserEditComponent },
      {
        path: ':id/edit',
        component: UserEditComponent,
        resolve: [UsersResolverService],
      },
      {
        path: ':id/details',
        component: UserDetailsComponent,
        resolve: [UsersResolverService],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
