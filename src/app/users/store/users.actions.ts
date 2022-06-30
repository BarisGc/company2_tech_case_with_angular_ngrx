import { Action } from '@ngrx/store';

import { Users } from '../users.model';

export const SET_USERS = '[Users] Set Users';
export const FETCH_USERS = '[Users] Fetch Users';

export const SET_TABLEPAGINATIONCOUNTS = '[Users] Set Table Pagination Counts';
export const CHANGE_TABLECURRENTPAGE = '[Users] Change Table Current Page';
export const UPDATE_TABLEPAGEOFFSET = '[Users] Update Table Page Offset';

export const ADD_USER = '[Users] Add User';
export const UPDATE_USER = '[Users] Update User';
export const DELETE_USER = '[Users] Delete User';

export class SetUsers implements Action {
  readonly type = SET_USERS;

  constructor(public payload: Users[]) {}
}

export class FetchUsers implements Action {
  readonly type = FETCH_USERS;
}
export class SetTablePaginationCounts implements Action {
  readonly type = SET_TABLEPAGINATIONCOUNTS;
}

export class ChangeTableCurrentPage implements Action {
  readonly type = CHANGE_TABLECURRENTPAGE;
  constructor(public payload: number) {}
}

export class UpdateTablePageOffset implements Action {
  readonly type = UPDATE_TABLEPAGEOFFSET;
}

export class AddUser implements Action {
  readonly type = ADD_USER;
  constructor(public payload: any) {}
}

export class UpdateUser implements Action {
  readonly type = UPDATE_USER;
  constructor(public payload: { id: number; updatedUserInformations: any }) {}
}

export class DeleteUser implements Action {
  readonly type = DELETE_USER;
  constructor(public payload: number) {}
}

export type UsersActions =
  | SetUsers
  | SetTablePaginationCounts
  | ChangeTableCurrentPage
  | UpdateTablePageOffset
  | AddUser
  | UpdateUser
  | DeleteUser;
