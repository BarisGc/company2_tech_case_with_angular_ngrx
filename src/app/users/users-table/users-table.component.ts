import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, map, switchMap } from 'rxjs';
import { Users } from '../users.model';
import * as XLSX from 'xlsx';
import { Store } from '@ngrx/store';
import * as fromApp from '../../appStore/app.reducer';
import * as UsersActions from '../../users/store/users.actions';
import * as SelectedUsersPoolActions from '../../selected-users-pool/store/selected-users-pool.actions';
@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css'],
})
export class UsersTableComponent implements OnInit, OnDestroy {
  filteredUsersTableData: Users[] | undefined;
  private nonFilteredUsersData: Users[] | undefined;
  private tableParametersChangedSub!: Subscription;

  constructor(
    // private userService: UsersService,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  usersTableSubs!: Subscription;

  ngOnInit(): void {
    this.tableParametersChangedSub =
      // this.userService.tableParametersChanged.subscribe(
      this.store
        .select('users')
        .pipe(map((usersState) => usersState.tableParameters))
        .subscribe((newTableParameters) => {
          this.nonFilteredUsersData =
            newTableParameters.nonFilteredUsersTableData;
          let filteredUsers = () => {
            if (
              newTableParameters.filterTypes.searchName === '' &&
              newTableParameters.filterTypes.userStatusFilter === ''
            ) {
              return newTableParameters.nonFilteredUsersTableData!.slice();
            } else if (
              newTableParameters.filterTypes.searchName !== '' &&
              newTableParameters.filterTypes.userStatusFilter === ''
            ) {
              return newTableParameters.nonFilteredUsersTableData!.filter(
                (user: any) =>
                  user.userName
                    .toLowerCase()
                    .includes(newTableParameters.filterTypes.searchName)
              );
            } else if (
              newTableParameters.filterTypes.searchName === '' &&
              newTableParameters.filterTypes.userStatusFilter !== ''
            ) {
              return newTableParameters.nonFilteredUsersTableData!.filter(
                (user: any) =>
                  user.userStatus ===
                  newTableParameters.filterTypes.userStatusFilter
              );
            } else if (
              newTableParameters.filterTypes.searchName !== '' &&
              newTableParameters.filterTypes.userStatusFilter !== ''
            ) {
              return newTableParameters.nonFilteredUsersTableData!.filter(
                (user: any) =>
                  user.userName
                    .toLowerCase()
                    .includes(newTableParameters.filterTypes.searchName) &&
                  user.userStatus ===
                    newTableParameters.filterTypes.userStatusFilter
              );
            } else {
            }
          };

          this.filteredUsersTableData = filteredUsers()?.filter(
            (user: any, index: number) => {
              return (
                index >=
                  Number(
                    newTableParameters.tablePaginationInfo.paginationOffset
                  ) &&
                index <
                  Number(
                    newTableParameters.tablePaginationInfo.paginationLimit
                  ) +
                    Number(
                      newTableParameters.tablePaginationInfo.paginationOffset
                    )
              );
            }
          );
        });

    // this.userService.updateFilteredUsersTableData();
  }

  handleDeleteUser(ID: number): void {
    // this.userService.deleteUser(ID);
    // this.userService.updateFilteredUsersTableData();
    this.store.dispatch(new UsersActions.DeleteUser(ID));
    this.store.dispatch(new UsersActions.SetTablePaginationCounts());
    this.router.navigate(['/users']);
  }

  onAddToSelectedUsersPool(userID: number) {
    let findUser = this.nonFilteredUsersData!.find(
      (user: Users) => user.userID === userID
    );
    let formattedFoundedUser = {
      userID: findUser!.userID,
      userName: findUser!.userName,
      userTeam: 'none',
      userIsRegistered: true,
    };
    this.store.dispatch(
      new SelectedUsersPoolActions.AddRegisteredUser(formattedFoundedUser)
    );
  }

  // return new SelectedUsersPoolActions.AddRegisteredUser(
  //   formattedFoundedUser
  // );
  // return this.store.select('recipes').pipe(
  //   take(1),
  //   map(recipesState => {
  //     return recipesState.recipes;
  //   }),
  //   switchMap(recipes => {
  //     if (recipes.length === 0) {
  //       this.store.dispatch(new RecipesActions.FetchRecipes());
  //       return this.actions$.pipe(
  //         ofType(RecipesActions.SET_RECIPES),
  //         take(1)
  //       );
  //     } else {
  //       return of(recipes);
  //     }
  //   })
  // );

  exportexcel(): void {
    let fileName = 'ExcelSheet.xlsx';
    /* pass here the table id */
    let element = document.getElementById('usersTable');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, fileName);
  }

  ngOnDestroy(): void {
    this.tableParametersChangedSub.unsubscribe();
  }
}
