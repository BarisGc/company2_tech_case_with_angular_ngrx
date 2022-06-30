import { ActionReducerMap } from '@ngrx/store';
import * as fromSelectedUsersPool from '../selected-users-pool/store/selected-users-pool.reducer';
import * as fromAuth from '../auth/store/auth.reducer';
import * as fromUsers from '../users/store/users.reducer';

export const rootReducer = {};

export interface AppState {
  selectedUsersPool: fromSelectedUsersPool.SelectedUsersPoolState;
  auth: fromAuth.AuthState;
  users: fromUsers.UsersState;
}

export const appReducer: ActionReducerMap<AppState, any> = {
  selectedUsersPool: fromSelectedUsersPool.selectedUsersPoolReducer,
  auth: fromAuth.authReducer,
  users: fromUsers.usersReducer,
};
