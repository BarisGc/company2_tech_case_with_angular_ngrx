import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { SelectedUsers } from 'src/app/shared/selected-users.model';
import * as selectedUsersPoolActions from '../store/selected-users-pool.actions';
import * as fromApp from '../../appStore/app.reducer';
@Component({
  selector: 'app-selected-users-pool-table',
  templateUrl: './selected-users-pool-table.component.html',
  styleUrls: ['./selected-users-pool-table.component.css'],
})
export class SelectedUsersPoolTableComponent implements OnInit, OnDestroy {
  selectedUsers!: Observable<{ selectedUsers: SelectedUsers[] }>;
  // private subscription!: Subscription;

  constructor(private store: Store<fromApp.AppState>) {}
  ngOnInit(): void {
    this.selectedUsers = this.store.select('selectedUsersPool');
    // this.selectedUsers = this.selectedUsersPoolService.getSelectedUsers();
    // this.subscription =
    //   this.selectedUsersPoolService.selectedUsersChanged.subscribe(
    //     (selectedUsers: SelectedUsers[]) => {
    //       this.selectedUsers = selectedUsers;
    //     }
    //   );
  }
  onEditItem(id: number) {
    // this.selectedUsersPoolService.startedEditing.next(id);
    this.store.dispatch(new selectedUsersPoolActions.StartEdit(id));
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }
}
