import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UsersComponent } from './users.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UsersHeaderComponent } from './users-header/users-header.component';
import { UserStartComponent } from './user-start/user-start.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UsersOptionsBarComponent } from './users-options-bar/users-options-bar.component';
import { UsersTableComponent } from './users-table/users-table.component';
import { UsersTablePaginationComponent } from './users-table/users-table-pagination/users-table-pagination.component';
import { UserDetailsHeaderComponent } from './user-details/user-details-header/user-details-header.component';
import { UserDetailsTableComponent } from './user-details/user-details-table/user-details-table.component';
import { UsersRoutingModule } from './users-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    UsersComponent,
    UsersHeaderComponent,
    UsersOptionsBarComponent,
    UsersTableComponent,
    UsersTablePaginationComponent,
    UserDetailsComponent,
    UserStartComponent,
    UserDetailsHeaderComponent,
    UserDetailsTableComponent,
    UserEditComponent,
  ],
  imports: [
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    UsersRoutingModule,
    SharedModule,
  ],
})
export class UsersModule {}
