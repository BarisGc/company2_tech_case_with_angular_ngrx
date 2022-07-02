// A resolver is essentially some code that runs before a route is loaded to ensure that certain data the route depends on is there.
// Alternative: guard or redirection
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Resolve,
} from '@angular/router';
// import { Observable } from 'rxjs';
// import { DataStorageService } from '../shared/data-storage.service';
// import { UsersService } from './users.service';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { map, switchMap, take } from 'rxjs/operators';
import { of } from 'rxjs';

import { Users } from './users.model';
import * as fromApp from '../appStore/app.reducer';
import * as UsersActions from './store/users.actions';

@Injectable({ providedIn: 'root' })
export class UsersResolverService implements Resolve<Users> {
  constructor(
    // private dataStorageService: DataStorageService,
    // private usersService: UsersService
    private store: Store<fromApp.AppState>,
    private actions$: Actions
  ) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    return this.store.select('users').pipe(
      take(1),
      map((usersState) => {
        return usersState.users;
      }),
      switchMap((users) => {
        if (users.length === 0) {
          this.store.dispatch(new UsersActions.FetchUsers());
          return this.actions$.pipe(ofType(UsersActions.SET_USERS), take(1));
        } else {
          return of(users);
        }
      })
    );

    //  Now we also need to add the take operator from rxjs/operators here to take only one value so // that we can complete and unsubscribe from the subscription, we have no ongoing subscription, // we're only interested in this event once and we're good // and now the resolver dispatches this but then also waits for recipes to be set.
  }
}
