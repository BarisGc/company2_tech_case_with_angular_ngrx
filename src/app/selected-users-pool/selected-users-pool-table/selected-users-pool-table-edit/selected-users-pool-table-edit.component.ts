import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { map, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { SelectedUsers } from 'src/app/shared/selected-users.model';
import * as SelectedUsersPoolActions from '../../store/selected-users-pool.actions';
import * as fromApp from '../../../appStore/app.reducer';
import { Users } from 'src/app/users/users.model';
// import { UsersService } from 'src/app/users/users.service';
@Component({
  selector: 'app-selected-users-pool-table-edit',
  templateUrl: './selected-users-pool-table-edit.component.html',
  styleUrls: ['./selected-users-pool-table-edit.component.css'],
})
export class SelectedUsersPoolTableEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false }) supForm!: NgForm;
  subscription!: Subscription;
  editMode = false;
  // editedItem!: SelectedUsers | undefined;
  editedItem!: SelectedUsers;
  // selectedUsers!: Observable<{ selectedUsers: SelectedUsers[] } | undefined>;
  // selectedUser!: any;

  constructor(
    private store: Store<fromApp.AppState> // private usersService: UsersService
  ) {}

  ngOnInit(): void {
    // Max's Code
    this.subscription = this.store
      .select('selectedUsersPool')
      .subscribe((stateData) => {
        if (stateData.editedItemId > -1) {
          this.editMode = true;
          this.editedItem = stateData.editedItem;
          console.log('this.editedItemTEST', this.editedItem);
          this.supForm.setValue({
            userID: this.editedItem?.userID,
            userName: this.editedItem?.userName,
            userTeam: this.editedItem?.userTeam,
            userIsRegistered: this.editedItem?.userIsRegistered,
          });
        } else {
          this.editMode = false;
        }
      });
    // My Code, store'a aldığımız için servisten çekmeye gerek kalmadı
    // this.subscription = this.supService.startedEditing.subscribe(
    //   (id: number) => {
    //     this.editedItemId = id;
    //     this.editMode = true;
    //     this.store
    //       .select('selectedUsersPool')
    //       .pipe(take(1))
    //       .subscribe((data) => {
    //         this.selectedUser =
    //           data.selectedUsers[
    //             data.selectedUsers.findIndex(
    //               (selectedUser: SelectedUsers) => selectedUser.userID === id
    //             )
    //           ];
    //       });
    //     // this.editedItem = this.supService.getSelectedUser(this.selectedUser);
    //     console.log('this.selecteduser', this.selectedUser);
    //     // console.log('this.editedItemId', this.editedItemId);
    //     this.supForm.setValue({
    //       userID: this.selectedUser.userID,
    //       userName: this.selectedUser.userName,
    //       userTeam: this.selectedUser.userTeam,
    //     });
    //   }
    // );
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newSelectedUser = new SelectedUsers(
      value.userID,
      value.userName,
      value.userTeam,
      value.userIsRegistered
    );

    if (this.editMode) {
      // this.supService.updateSelectedUser(this.editedItemId, newSelectedUser);

      this.store.dispatch(
        new SelectedUsersPoolActions.UpdateSelectedUser(newSelectedUser)
      );
    } else {
      if (!newSelectedUser.userIsRegistered) {
        newSelectedUser.userIsRegistered = false;
      }
      // let findOriginalArr = this.usersService.getUsers();
      let findOriginalId = this.store.select('users').pipe(
        map((usersData) => {
          return usersData.users.find(
            (user: Users) => user.userID === newSelectedUser.userID
          );
        })
      );
      console.log('findOriginalId', findOriginalId);
      if (findOriginalId) {
        alert('This userId has been taken!');
      } else {
        console.log('newSelectedUser', newSelectedUser);
        // this.supService.addSelectedUser(newSelectedUser);
        this.store.dispatch(
          new SelectedUsersPoolActions.AddSelectedUser(newSelectedUser)
        );
      }
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.supForm.reset();
    this.editMode = false;
    this.store.dispatch(new SelectedUsersPoolActions.StopEdit());
  }

  onDelete() {
    // this.supService.deleteSelectedUser(this.editedItemId);
    this.store.dispatch(new SelectedUsersPoolActions.DeleteSelectedUser());
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.store.dispatch(new SelectedUsersPoolActions.StopEdit());
  }
}
