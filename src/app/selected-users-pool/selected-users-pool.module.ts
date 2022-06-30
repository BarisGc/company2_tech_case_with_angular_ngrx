import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { SelectedUsersPoolComponent } from './selected-users-pool.component';
import { SelectedUsersPoolHeaderComponent } from './selected-users-pool-header/selected-users-pool-header.component';
import { SelectedUsersPoolTableComponent } from './selected-users-pool-table/selected-users-pool-table.component';
import { SelectedUsersPoolTableEditComponent } from './selected-users-pool-table/selected-users-pool-table-edit/selected-users-pool-table-edit.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    SelectedUsersPoolComponent,
    SelectedUsersPoolHeaderComponent,
    SelectedUsersPoolTableComponent,
    SelectedUsersPoolTableEditComponent,
  ],
  imports: [
    FormsModule,
    RouterModule.forChild([
      { path: '', component: SelectedUsersPoolComponent },
    ]),
    SharedModule,
  ],
})
export class SelectedUsersPoolModule {}
