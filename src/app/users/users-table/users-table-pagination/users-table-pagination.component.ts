import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, Subscription } from 'rxjs';
// import { UsersService } from '../../users.service';

import { Store } from '@ngrx/store';
import * as fromApp from '../../../appStore/app.reducer';
import * as UsersActions from '../../store/users.actions';
@Component({
  selector: 'app-users-table-pagination',
  templateUrl: './users-table-pagination.component.html',
  styleUrls: ['./users-table-pagination.component.css'],
})
export class UsersTablePaginationComponent implements OnInit, OnDestroy {
  constructor(
    // private userService: UsersService,
    private store: Store<fromApp.AppState>
  ) {}
  tablePageLength!: number;
  totalPagesArr!: number[];
  activePage: number = 1;
  private tableParametersChangedSub!: Subscription;

  ngOnInit(): void {
    this.tableParametersChangedSub =
      // this.userService.tableParametersChanged.subscribe(
      this.store
        .select('users')
        .pipe(map((usersState) => usersState.tableParameters))
        .subscribe((newTableParameters) => {
          this.totalPagesArr = new Array(
            newTableParameters.tablePaginationInfo.tableTotalPages
          );
          this.tablePageLength = Math.ceil(
            newTableParameters.tablePaginationInfo.tableTotalPages
          );

          this.activePage = newTableParameters.tablePaginationInfo.currentPage;
        });
  }

  // ngOnInit(): void {
  //   this.totalPagesArr = new Array(
  //     this.userService.getAllTableParameters().tablePaginationInfo.tableTotalPages
  //   );
  //   this.tablePageLength = Math.ceil(
  //     this.userService.getAllTableParameters().tablePaginationInfo
  //       .tableTotalPages
  //   );
  //   this.activePage =
  //     this.userService.getAllTableParameters().tablePaginationInfo.currentPage;
  //   this.tableParametersChangedSub =
  //     this.userService.tableParametersChanged.subscribe(
  //       (newTableParameters: any) => {
  //         this.tablePageLength = Math.ceil(
  //           newTableParameters.tablePaginationInfo.tableTotalPages
  //         );
  //         this.totalPagesArr = new Array(
  //           newTableParameters.tablePaginationInfo.tableTotalPages
  //         );
  //         this.activePage = newTableParameters.tablePaginationInfo.currentPage;
  //       }
  //     );
  // }

  handleUserCurrentPage = (pageNumber: number) => {
    this.store.dispatch(new UsersActions.ChangeTableCurrentPage(pageNumber));
    this.store.dispatch(new UsersActions.UpdateTablePageOffset());
    // this.userService.updateTablePaginationInfoCurrentPage(pageNumber);
    // this.userService.updateTablePaginationInfoOffset();
    // this.userService.updateFilteredUsersTableData();
    // console.log('pageNumber', pageNumber);
  };
  ngOnDestroy(): void {
    this.tableParametersChangedSub.unsubscribe();
  }
}
