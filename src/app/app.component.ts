import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
// import { AuthService } from './auth/auth.service';

import * as fromApp from './appStore/app.reducer';
import * as AuthActions from './auth/store/auth.actions';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'company2_tech_case_with_angular';

  constructor(
    // private authService: AuthService
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.store.dispatch(new AuthActions.AutoLogin());
    // this.authService.autoSignIn();
  }
}
