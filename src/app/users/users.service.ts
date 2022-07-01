// import { Users } from './users.model';
// import { Injectable } from '@angular/core';
// import { Subject } from 'rxjs';
// import { SelectedUsers } from '../shared/selected-users.model';
// import { Store } from '@ngrx/store';
// import * as SelectedUsersPoolActions from '../selected-users-pool/store/selected-users-pool.actions';
// import * as fromApp from '../appStore/app.reducer';
// @Injectable({ providedIn: 'root' })
// export class UsersService {
//   // private users: Users[] = [
//   //   new Users(0, 'Baris', 'Active', 32, 'Frontend Developer', [
//   //     {
//   //       courseName: 'Angular',
//   //       measuredAT: 123456789,
//   //       completedAT: '2021-10-26 12:15:44',
//   //     },
//   //     {
//   //       courseName: 'React',
//   //       measuredAT: 123456789,
//   //       completedAT: '2021-10-26 12:15:44',
//   //     },
//   //   ]),
//   //   new Users(1, 'Joe', 'Passive', 25, 'Backend Developer', [
//   //     {
//   //       courseName: 'Javascript',
//   //       measuredAT: 123456789,
//   //       completedAT: '2021-10-26 12:15:44',
//   //     },
//   //   ]),
//   //   new Users(2, 'Tommy', 'Passive', 39, 'Soldier', [
//   //     {
//   //       courseName: 'Javascript',
//   //       measuredAT: 123456789,
//   //       completedAT: '2021-10-26 12:15:44',
//   //     },
//   //   ]),
//   //   new Users(3, 'Jane', 'Active', 33, 'Farmer', [
//   //     {
//   //       courseName: 'Javascript',
//   //       measuredAT: 123456789,
//   //       completedAT: '2021-10-26 12:15:44',
//   //     },
//   //   ]),
//   //   new Users(4, 'Jack', 'Active', 34, 'Glazier', [
//   //     {
//   //       courseName: 'Javascript',
//   //       measuredAT: 123456789,
//   //       completedAT: '2021-10-26 12:15:44',
//   //     },
//   //   ]),
//   //   new Users(5, 'Jill', 'Passive', 35, 'Doctor', [
//   //     {
//   //       courseName: 'Javascript',
//   //       measuredAT: 123456789,
//   //       completedAT: '2021-10-26 12:15:44',
//   //     },
//   //   ]),
//   //   new Users(6, 'Jone', 'Active', 36, 'Baker', [
//   //     {
//   //       courseName: 'Javascript',
//   //       measuredAT: 123456789,
//   //       completedAT: '2021-10-26 12:15:44',
//   //     },
//   //   ]),
//   //   new Users(7, 'Jenny', 'Active', 37, 'Baby Sitter', [
//   //     {
//   //       courseName: 'Javascript',
//   //       measuredAT: 123456789,
//   //       completedAT: '2021-10-26 12:15:44',
//   //     },
//   //   ]),
//   //   new Users(8, 'Salia', 'Active', 38, 'Frontend Developer', [
//   //     {
//   //       courseName: 'Javascript',
//   //       measuredAT: 123456789,
//   //       completedAT: '2021-10-26 12:15:44',
//   //     },
//   //   ]),
//   //   new Users(9, 'Mariam', 'Passive', 39, 'Accountant', [
//   //     {
//   //       courseName: 'Javascript',
//   //       measuredAT: 123456789,
//   //       completedAT: '2021-10-26 12:15:44',
//   //     },
//   //   ]),
//   //   new Users(10, 'Michael', 'Active', 30, 'Acrobat', [
//   //     {
//   //       courseName: 'Javascript',
//   //       measuredAT: 123456789,
//   //       completedAT: '2021-10-26 12:15:44',
//   //     },
//   //   ]),
//   //   new Users(11, 'Brad', 'Active', 31, 'Baker', [
//   //     {
//   //       courseName: 'Javascript',
//   //       measuredAT: 123456789,
//   //       completedAT: '2021-10-26 12:15:44',
//   //     },
//   //   ]),
//   //   new Users(12, 'Janet', 'Passive', 32, 'Engineer', [
//   //     {
//   //       courseName: 'Javascript',
//   //       measuredAT: 123456789,
//   //       completedAT: '2021-10-26 12:15:44',
//   //     },
//   //   ]),
//   //   new Users(13, 'Tulip', 'Active', 33, 'Cashier', [
//   //     {
//   //       courseName: 'Javascript',
//   //       measuredAT: 123456789,
//   //       completedAT: '2021-10-26 12:15:44',
//   //     },
//   //   ]),
//   //   new Users(14, 'Bloom', 'Passive', 34, 'Jeweller', [
//   //     {
//   //       courseName: 'Javascript',
//   //       measuredAT: 123456789,
//   //       completedAT: '2021-10-26 12:15:44',
//   //     },
//   //   ]),
//   //   new Users(15, 'Kareem', 'Passive', 36, 'Jockey', [
//   //     {
//   //       courseName: 'Javascript',
//   //       measuredAT: 123456789,
//   //       completedAT: '2021-10-26 12:15:44',
//   //     },
//   //   ]),
//   // ];

//   private users: Users[] = [];
//   private tableParameters: any = {
//     filterTypes: {
//       searchName: '',
//       userStatusFilter: '',
//     },
//     tablePaginationInfo: {
//       defaultPaginationLimit: 6,
//       paginationLimit: 6,
//       paginationOffset: 0,
//       currentPage: 1,
//       tableTotalPages: Math.ceil(this.users.length / 6),
//     },
//     nonFilteredUsersTableData: this.users,
//     filteredUsersTableData: this.users,
//   };
//   constructor(private store: Store<fromApp.AppState>) {}

//   ngOnInit() {}
//   tableParametersChanged = new Subject<any>();

//   // private _filterTypes = {
//   //   searchName: '',
//   //   userStatusFilter: '',
//   // };
//   // public get filterTypes() {
//   //   return this._filterTypes;
//   // }
//   // public set filterTypes(value) {
//   //   this._filterTypes = value;
//   // }

//   // Get All Table Data
//   getAllTableParameters() {
//     return this.tableParameters;
//   }

//   // Get User/Users Data
//   getUsers() {
//     return this.tableParameters.nonFilteredUsersTableData!.slice();
//   }

//   getUser(ID: number) {
//     return this.tableParameters.nonFilteredUsersTableData.find(
//       (user: Users) => {
//         return user.userID == ID;
//       }
//     );
//   }
//   // Update Table Data
//   updateTablePaginationInfoPaginationLimit(tableNewPaginationLimit: number) {
//     if (tableNewPaginationLimit > 0) {
//       this.tableParameters.tablePaginationInfo.paginationLimit =
//         tableNewPaginationLimit;
//     } else {
//       this.tableParameters.tablePaginationInfo.paginationLimit =
//         this.tableParameters.tablePaginationInfo.defaultPaginationLimit;
//     }
//     this.tableParametersChanged.next(this.tableParameters);
//   }

//   updateTablePaginationInfoCurrentPage(
//     TableNewPaginationInfoCurrentPage: number
//   ) {
//     this.tableParameters.tablePaginationInfo.currentPage =
//       TableNewPaginationInfoCurrentPage;
//     this.tableParametersChanged.next(this.tableParameters);
//   }

//   updateTablePaginationInfoOffset() {
//     this.tableParameters.tablePaginationInfo.paginationOffset =
//       (this.tableParameters.tablePaginationInfo.currentPage - 1) *
//       this.tableParameters.tablePaginationInfo.paginationLimit;
//     this.tableParametersChanged.next(this.tableParameters);
//   }
//   updateSearchName(newSearchName: string) {
//     this.tableParameters.filterTypes.searchName = newSearchName;
//     this.tableParametersChanged.next(this.tableParameters);
//   }

//   updateUserStatusFilter(newUserStatusFilter: string) {
//     this.tableParameters.filterTypes.userStatusFilter = newUserStatusFilter;
//     this.tableParametersChanged.next(this.tableParameters);
//   }

//   updateUsertableTotalPages(newValue: number) {
//     this.tableParameters.tablePaginationInfo.tableTotalPages =
//       Math.ceil(newValue);
//     this.tableParametersChanged.next(this.tableParameters);
//   }

//   updateFilteredUsersTableData() {
//     let filteredUsers = () => {
//       if (
//         this.tableParameters.filterTypes.searchName === '' &&
//         this.tableParameters.filterTypes.userStatusFilter === ''
//       ) {
//         return this.tableParameters.nonFilteredUsersTableData!.slice();
//       } else if (
//         this.tableParameters.filterTypes.searchName !== '' &&
//         this.tableParameters.filterTypes.userStatusFilter === ''
//       ) {
//         return this.tableParameters.nonFilteredUsersTableData!.filter(
//           (user: any) =>
//             user.userName
//               .toLowerCase()
//               .includes(this.tableParameters.filterTypes.searchName)
//         );
//       } else if (
//         this.tableParameters.filterTypes.searchName === '' &&
//         this.tableParameters.filterTypes.userStatusFilter !== ''
//       ) {
//         return this.tableParameters.nonFilteredUsersTableData!.filter(
//           (user: any) =>
//             user.userStatus ===
//             this.tableParameters.filterTypes.userStatusFilter
//         );
//       } else if (
//         this.tableParameters.filterTypes.searchName !== '' &&
//         this.tableParameters.filterTypes.userStatusFilter !== ''
//       ) {
//         return this.tableParameters.nonFilteredUsersTableData!.filter(
//           (user: any) =>
//             user.userName
//               .toLowerCase()
//               .includes(this.tableParameters.filterTypes.searchName) &&
//             user.userStatus ===
//               this.tableParameters.filterTypes.userStatusFilter
//         );
//       } else {
//       }
//     };

//     this.tableParameters.filteredUsersTableData = filteredUsers()?.filter(
//       (user: any, index: number) => {
//         return (
//           index >=
//             Number(this.tableParameters.tablePaginationInfo.paginationOffset) &&
//           index <
//             Number(this.tableParameters.tablePaginationInfo.paginationLimit) +
//               Number(this.tableParameters.tablePaginationInfo.paginationOffset)
//         );
//       }
//     );
//     this.tableParametersChanged.next(this.tableParameters);
//   }

//   // Calculate tableTotalPages
//   calculateTableTotalPages() {
//     this.tableParameters.tablePaginationInfo.tableTotalPages = Math.ceil(
//       this.tableParameters.nonFilteredUsersTableData.length /
//         this.tableParameters.tablePaginationInfo.paginationLimit
//     );
//     this.tableParametersChanged.next(this.tableParameters);
//   }

//   addUser(newUser: any) {
//     this.tableParameters.nonFilteredUsersTableData.push(newUser);
//     this.tableParametersChanged.next(this.tableParameters);
//     this.calculateTableTotalPages();
//     this.tableParametersChanged.next(this.tableParameters);
//   }

//   updateUserData(id: number, updatedUserInformations: any) {
//     let callParameters = this.getAllTableParameters();
//     let findIDIndex = callParameters.nonFilteredUsersTableData.findIndex(
//       (user: any) => {
//         return user.userID === id;
//       }
//     );
//     // updateUser
//     callParameters.nonFilteredUsersTableData[findIDIndex].userName =
//       updatedUserInformations.userName;
//     callParameters.nonFilteredUsersTableData[findIDIndex].userStatus =
//       updatedUserInformations.userStatus;
//     // updateUserGeneralInfo
//     callParameters.nonFilteredUsersTableData[findIDIndex].userAge =
//       updatedUserInformations.userAge;
//     callParameters.nonFilteredUsersTableData[findIDIndex].userJob =
//       updatedUserInformations.userJob;
//     // updateUserCoursesInfo
//     callParameters.nonFilteredUsersTableData[findIDIndex].userCourses =
//       updatedUserInformations.userCoursesFormArray;
//     this.tableParametersChanged.next(this.tableParameters);
//   }

//   deleteUser(id: number) {
//     let arr = this.getAllTableParameters().nonFilteredUsersTableData;
//     arr.splice(
//       arr.findIndex((user: Users) => user.userID === id),
//       1
//     );

//     this.calculateTableTotalPages();
//     this.tableParametersChanged.next(this.tableParameters);
//   }

//   addSelectedUserToSelectedUsersPool(selectedUsers: any) {
//     console.log('AddSelectedUserselectedUsers', selectedUsers);
//     this.store.dispatch(
//       new SelectedUsersPoolActions.AddSelectedUser(selectedUsers)
//     );
//   }

//   // Set Users Via Backend
//   // setUsers(users: Users[]) {
//   //   // console.log('setusers', users);
//   //   this.tableParameters.nonFilteredUsersTableData = users;
//   //   this.updateFilteredUsersTableData();
//   //   this.updateUsertableTotalPages(
//   //     Math.ceil(
//   //       this.tableParameters.nonFilteredUsersTableData.length /
//   //         this.tableParameters.tablePaginationInfo.defaultPaginationLimit
//   //     )
//   //   );
//   //   this.tableParametersChanged.next(this.tableParameters);
//   // }
// }
