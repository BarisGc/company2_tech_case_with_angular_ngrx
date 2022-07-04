import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, switchMap, withLatestFrom } from 'rxjs';
import { Users } from '../users.model';

import * as UsersActions from './users.actions';
import * as fromApp from '../../appStore/app.reducer';
@Injectable()
export class UsersEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromApp.AppState>
  ) {}

  @Effect()
  fetchUsers = this.actions$.pipe(
    ofType(UsersActions.FETCH_USERS),
    switchMap(() => {
      // no need argument in switchMap() since no need payload
      return this.http.get<Users[]>(
        'https://ng-practice-usercrud-barisd-default-rtdb.europe-west1.firebasedatabase.app/users.json'
      );
    }),
    map((users) => {
      return users.map((user) => {
        return {
          ...user,
          userCourses: user.userCourses ? user.userCourses : [],
        };
      });
    }),
    map((users: Users[]) => {
      return new UsersActions.SetUsers(users);
    })
  );

  @Effect({ dispatch: false })
  storeUsers = this.actions$.pipe(
    ofType(UsersActions.STORE_USERS),
    withLatestFrom(this.store.select('users')),
    switchMap(
      (
        [actionData, usersState] // Array destructuring so that we can get the latest state and take actionData even not used
      ) => {
        // no need argument in switchMap() since no need payload
        // const users = this.store
        //   .select('users')
        //   .pipe(
        //     map(
        //       (usersData) => usersData.tableParameters.nonFilteredUsersTableData
        //     )
        //   );
        return this.http.put<Users[]>(
          'https://ng-practice-usercrud-barisd-default-rtdb.europe-west1.firebasedatabase.app/users.json',
          usersState.tableParameters.nonFilteredUsersTableData
        );
      }
    )
  );
}
