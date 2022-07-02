import { Component, OnDestroy, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { AuthResponseData, AuthService } from './auth.service';

import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromApp from '../appStore/app.reducer';
import * as AuthActions from './store/auth.actions';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode = true;
  isLoading: boolean | null = false;
  errorMessage: string | null = '';

  private storeSub = Subscription.EMPTY;
  constructor(
    // private authService: AuthService,
    // private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.storeSub = this.store.select('auth').subscribe((authData) => {
      this.isLoading = authData.isLoading;
      this.errorMessage = authData.authError;
    });
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    // let authObs: Observable<AuthResponseData>;
    // this.isLoading = true;

    if (this.isLoginMode) {
      // authObs = this.authService.signIn(email, password);
      this.store.dispatch(
        new AuthActions.LoginStart({ email: email, password: password })
      );
    } else {
      // authObs = this.authService.signUp(email, password);
      this.store.dispatch(
        new AuthActions.SignUpStart({ email: email, password: password })
      );
    }

    // authObs.subscribe({
    //   // completeHandler
    //   complete: () => {
    //     console.info('complete');
    //   },
    //   // errorHandler
    //   error: (throwedErrorMessage) => {
    //     this.isLoading = false;
    //     this.errorMessage = throwedErrorMessage;
    //     /*
    //       - Now we could do that here but handling everything of that here in the component is not necessarily the best possible way of doing that,
    //       - it moves too much logic into the component, which should primarily focus on updating the UI and not so much about handling the response correctly
    //       - and that therefore screams for the usage of an rxjs/operator that allows us to handle errors here in the service, in our observable chain we're setting up here,so on this observable.
    //     */
    //     // this.errorMessage = `An Error Occurred! ${error.error.error.message}`;
    //     console.error('error', throwedErrorMessage);
    //   },
    //   // nextHandler
    //   next: (resData) => {
    //     this.isLoading = false;
    //     this.router.navigate(['/users']);
    //     console.log('resData', resData);
    //   },
    // });
    form.reset();
  }
  onHandleError() {
    this.store.dispatch(new AuthActions.ClearError());
  }

  ngOnDestroy() {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }
}
