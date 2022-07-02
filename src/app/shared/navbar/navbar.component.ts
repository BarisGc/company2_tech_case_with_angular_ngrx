import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
// import { AuthService } from 'src/app/auth/auth.service';
// import { DataStorageService } from '../data-storage.service';

import * as fromApp from '../../appStore/app.reducer';
import * as AuthActions from '../../auth/store/auth.actions';
import * as UsersActions from '../../users/store/users.actions';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  isUserAuthenticated = false;
  private userAuthSub!: Subscription;

  constructor(
    // private dataStorageService: DataStorageService,
    // private authService: AuthService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.userAuthSub = this.store
      .select('auth')
      .pipe(map((authState) => authState.user))
      .subscribe((authUser) => {
        this.isUserAuthenticated = !!authUser; // !authUser ? false : true;
      });
  }

  onSaveData() {
    // this.dataStorageService.storeUsers();
    this.store.dispatch(new UsersActions.StoreUsers());
  }
  onFetchData() {
    // this.dataStorageService.fetchUsers().subscribe();
    this.store.dispatch(new UsersActions.FetchUsers());
  }

  onSignOut() {
    // this.authService.signOut();
    this.store.dispatch(new AuthActions.Logout());
  }

  ngOnDestroy(): void {
    this.userAuthSub.unsubscribe();
  }
}
