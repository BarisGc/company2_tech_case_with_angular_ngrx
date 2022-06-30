import { Action } from '@ngrx/store';
import { SelectedUsers } from 'src/app/shared/selected-users.model';

export const ADD_SELECTEDUSER = '[SelectedUsersPool] Add SelectedUser';
export const UPDATE_SELECTEDUSER = '[SelectedUsersPool] Update SelectedUser';
export const DELETE_SELECTEDUSER = '[SelectedUsersPool] Delete SelectedUser';
export const START_EDIT = '[SelectedUsersPool] Start Edit';
export const STOP_EDIT = '[SelectedUsersPool] Stop Edit';

export class AddSelectedUser implements Action {
  readonly type = ADD_SELECTEDUSER;
  constructor(public payload: SelectedUsers) {}
}

export class UpdateSelectedUser implements Action {
  readonly type = UPDATE_SELECTEDUSER;
  constructor(public payload: SelectedUsers) {}
}

export class DeleteSelectedUser implements Action {
  readonly type = DELETE_SELECTEDUSER;
}

export class StartEdit implements Action {
  readonly type = START_EDIT;
  constructor(public payload: number) {}
}

export class StopEdit implements Action {
  readonly type = STOP_EDIT;
}

export type SelectedUsersPoolActions =
  | AddSelectedUser
  | UpdateSelectedUser
  | DeleteSelectedUser
  | StartEdit
  | StopEdit;
