import { Component, OnInit } from '@angular/core';
import * as fromApp from '../../appStore/app.reducer';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { SelectedUsers } from 'src/app/shared/selected-users.model';

@Component({
  selector: 'app-selected-users-pool-header',
  templateUrl: './selected-users-pool-header.component.html',
  styleUrls: ['./selected-users-pool-header.component.css'],
})
export class SelectedUsersPoolHeaderComponent implements OnInit {
  selectedUsers!: Observable<{ selectedUsers: SelectedUsers[] }>;
  selectedUsersCount!: number;
  subscription!: Subscription;
  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.subscription = this.store
      .select('selectedUsersPool')
      .subscribe((stateData) => {
        this.selectedUsersCount = stateData.selectedUsers.length;
      });
  }
}
