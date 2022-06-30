import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { map, tap } from 'rxjs/operators';
// import { AuthService } from '../auth/auth.service';

import { Users } from '../users/users.model';
import { UsersService } from '../users/users.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../appStore/app.reducer';
import * as UsersActions from '../users/store/users.actions';

@Injectable({ providedIn: 'root' })
export class DataStorageService implements OnInit {
  constructor(
    private http: HttpClient,
    private userService: UsersService,
    // private authService: AuthService
    private store: Store<fromApp.AppState>
  ) {}
  ngOnInit(): void {
    // console.log('getusers', this.userService.getUsers());
  }
  storeUsers() {
    const users = this.userService.getUsers();
    this.http
      .put(
        'https://ng-practice-usercrud-barisd-default-rtdb.europe-west1.firebasedatabase.app/users.json',
        users
      )
      .subscribe((response) => {
        console.log('response', response);
      });
  }
  fetchUsers() {
    return this.http
      .get<Users[]>(
        'https://ng-practice-usercrud-barisd-default-rtdb.europe-west1.firebasedatabase.app/users.json'
      )
      .pipe(
        map((users) => {
          return users.map((user) => {
            return {
              ...user,
              userCourses: user.userCourses ? user.userCourses : [],
            };
          });
        }),
        tap((users: Users[]) => {
          // this.userService.setUsers(users);
          console.log('setusers', users);
          this.store.dispatch(new UsersActions.SetUsers(users));
          this.store.dispatch(new UsersActions.SetTablePaginationCounts());
        })
      );
  }
}
