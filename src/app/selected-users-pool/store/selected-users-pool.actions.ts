import { Action } from '@ngrx/store';
import { SelectedUsers } from 'src/app/shared/selected-users.model';

export const ADD_NONREGISTEREDUSER =
  '[SelectedUsersPool] Add NonRegistered User';
export const ADD_REGISTEREDUSER = '[SelectedUsersPool] Add Registered User';
export const UPDATE_SELECTEDUSER = '[SelectedUsersPool] Update SelectedUser';
export const DELETE_SELECTEDUSER = '[SelectedUsersPool] Delete SelectedUser';
export const START_EDIT = '[SelectedUsersPool] Start Edit';
export const STOP_EDIT = '[SelectedUsersPool] Stop Edit';

export class AddNonRegisteredUser implements Action {
  readonly type = ADD_NONREGISTEREDUSER;
  constructor(public payload: SelectedUsers) {}
}

export class AddRegisteredUser implements Action {
  readonly type = ADD_REGISTEREDUSER;
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
  | AddNonRegisteredUser
  | AddRegisteredUser
  | UpdateSelectedUser
  | DeleteSelectedUser
  | StartEdit
  | StopEdit;
