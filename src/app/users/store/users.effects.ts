import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import { Users } from '../users.model';

import * as UsersActions from './users.actions';
@Injectable()
export class UsersEffects {
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
  constructor(private actions$: Actions, private http: HttpClient) {}
}
