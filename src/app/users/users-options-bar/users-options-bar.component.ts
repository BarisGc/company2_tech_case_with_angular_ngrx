import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map, take, switchMap, tap } from 'rxjs/operators';
// import { UsersService } from '../users.service';
import * as fromApp from '../../appStore/app.reducer';
import * as UsersActions from '../store/users.actions';
@Component({
  selector: 'app-users-options-bar',
  templateUrl: './users-options-bar.component.html',
  styleUrls: ['./users-options-bar.component.css'],
})
export class UsersOptionsBarComponent implements OnInit {
  searchValue: string | null = null;
  userPageLimitValue!: number;
  defaultTablePageRowCount!: number;
  constructor(
    // private userservice: UsersService,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.defaultTablePageRowCount = this.store
      .select('users')
      .pipe(
        map(
          (usersState) =>
            usersState.tableParameters.tablePaginationInfo
              .defaultPaginationLimit
        )
      );
  }

  handleSearchName = (event: any) => {
    // this.userservice.updateSearchName(event.target.value);
    // this.userservice.updateFilteredUsersTableData();
    this.store.dispatch(
      new UsersActions.FilteringSearchedUsers(event.target.value)
    );
  };

  handleUserPageLimit = (event: any) => {
    // this.userservice.updateTablePaginationInfoPaginationLimit(
    //   event.target.value
    // );
    // this.userservice.calculateTableTotalPages();
    // this.userservice.updateFilteredUsersTableData();

    if (
      (event.target.value =
        '' || event.target.value == null || event.target.value == 0)
    ) {
      this.store.dispatch(
        new UsersActions.LimitingTablePageRowCount(
          this.defaultTablePageRowCount
        )
      );
    } else {
      new UsersActions.LimitingTablePageRowCount(event.target.value);
    }
  };

  handleUserStatusFilter = (userNewStatusSelection: string) => {
    // this.userservice.updateUserStatusFilter(userNewStatusSelection);
    // this.userservice.updateFilteredUsersTableData();
    this.store.dispatch(
      new UsersActions.FilteringUserStatuses(userNewStatusSelection)
    );
  };

  handleClearFilters = () => {
    this.searchValue = null;
    this.userPageLimitValue = 0;
    // this.userservice.updateSearchName('');
    // this.userservice.updateUserStatusFilter('');
    // this.userservice.updateTablePaginationInfoPaginationLimit(
    //   this.userservice.getAllTableParameters().tablePaginationInfo
    //     .defaultPaginationLimit
    // );
    // this.userservice.updateUsertableTotalPages(
    //   Math.ceil(
    //     this.userservice.getAllTableParameters().nonFilteredUsersTableData
    //       .length /
    //       this.userservice.getAllTableParameters().tablePaginationInfo
    //         .defaultPaginationLimit
    //   )
    // );

    // this.userservice.updateFilteredUsersTableData();
  };

  onNewUser() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
