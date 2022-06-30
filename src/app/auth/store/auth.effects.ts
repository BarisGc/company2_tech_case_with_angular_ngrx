import { HttpClient } from '@angular/common/http';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { switchMap, map, catchError, exhaustMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';
import * as AuthActions from './auth.actions';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthUserModel } from '../auth-user.model';
import { AuthService } from '../auth.service';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

const handleAuthentication = (
  expiresIn: number,
  email: string,
  userID: string,
  token: string
) => {
  const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
  const authUser = new AuthUserModel(email, userID, token, expirationDate);
  localStorage.setItem('authUserData', JSON.stringify(authUser));
  return new AuthActions.AuthenticateSuccess({
    email: email,
    userID: userID,
    token: token,
    expirationDate: expirationDate,
    redirect: true,
  });
};

const handleError = (errorRes: any) => {
  let errorMessage = 'An unknown error occurred!';
  if (!errorRes.error || !errorRes.error.error) {
    return of(new AuthActions.AuthenticateFail(errorMessage));
  }
  switch (errorRes.error.error.message) {
    case 'EMAIL_EXISTS':
      errorMessage = 'This email exists already';
      break;
    case 'EMAIL_NOT_FOUND':
      errorMessage = 'This email does not exist.';
      break;
    case 'INVALID_PASSWORD':
      errorMessage = 'This password is not correct.';
      break;
  }
  return of(new AuthActions.AuthenticateFail(errorMessage));
};

@Injectable()
export class AuthEffects {
  @Effect()
  authSignUp = this.actions$.pipe(
    ofType(AuthActions.SIGNUP_START),
    switchMap((signupAction: AuthActions.SignUpStart) => {
      //When a new inner Observable is emitted, switchMap stops emitting items from the earlier-emitted inner Observable and begins emitting items from the new one
      console.log('singupresdata');

      return this.http
        .post<AuthResponseData>(
          'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
            environment.fireBaseApiKey,
          {
            email: signupAction.payload.email,
            password: signupAction.payload.password,
            returnSecureToken: true,
          }
        )
        .pipe(
          tap((resData) => {
            this.authService.setSignOutTimer(+resData.expiresIn * 1000);
          }), // akışı bozmadan araya girdi tap ile ...
          map((resData) => {
            return handleAuthentication(
              +resData.expiresIn,
              resData.email,
              resData.localId,
              resData.idToken
            );
          }),
          catchError((errorRes) => {
            return handleError(errorRes);
          })
        );
    })
  );

  // No need to subscripe this actions$ observer here, because ngrx does it for us
  @Effect()
  authSignIn = this.actions$.pipe(
    ofType(AuthActions.SIGNIN_START), // only listen to this action
    switchMap((authData: AuthActions.SignInStart) => {
      //switchmap allows us to create new observer by taking another observable data
      console.log('SİGNİNREDDATA');
      return this.http
        .post<AuthResponseData>(
          'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
            environment.fireBaseApiKey,
          {
            email: authData.payload.email,
            password: authData.payload.password,
            returnSecureToken: true,
          }
        )
        .pipe(
          tap((resData) => {
            this.authService.setSignOutTimer(+resData.expiresIn * 1000);
          }), // akışı bozmadan araya girdi tap ile ...
          map((resData) => {
            return handleAuthentication(
              +resData.expiresIn,
              resData.email,
              resData.localId,
              resData.idToken
            );
          }),
          catchError((errorRes) => {
            return handleError(errorRes);
          })
        );
    })
  );

  @Effect({ dispatch: false })
  authRedirect = this.actions$.pipe(
    // ofType(AuthActions.AUTHENTICATE_SUCCESS, AuthActions.SIGNOUT),//Dont add Multiple since Race Condition problem
    // solution: add it to authSignOut effect
    ofType(AuthActions.AUTHENTICATE_SUCCESS),
    tap((authSuccessAction: AuthActions.AuthenticateSuccess) => {
      if (authSuccessAction.payload.redirect) {
        // if redirect is true
        this.router.navigate(['/']);
      }
    })
  );

  @Effect({ dispatch: false })
  autoSignIn = this.actions$.pipe(
    ofType(AuthActions.AUTO_SIGNIN),
    map(() => {
      const authUserData: {
        email: string;
        id: string;
        _token: string;
        _tokenExpirationDate: string;
      } = JSON.parse(localStorage.getItem('authanticatedUserData') || '{}');
      if (!authUserData) {
        return { type: 'Dummy' };
      }
      const loadedAuthUser = new AuthUserModel(
        authUserData.email,
        authUserData.id,
        authUserData._token,
        new Date(authUserData._tokenExpirationDate)
      );
      if (loadedAuthUser.token) {
        // this.authUserSubject.next(loadedAuthUser);

        const expirationDuration =
          new Date(authUserData._tokenExpirationDate).getTime() -
          new Date().getTime();
        this.authService.setSignOutTimer(expirationDuration);

        return new AuthActions.AuthenticateSuccess({
          email: loadedAuthUser.email,
          userID: loadedAuthUser.id,
          token: loadedAuthUser.token,
          expirationDate: new Date(authUserData._tokenExpirationDate),
          redirect: false,
        });
        // const expirationDuration =
        //   new Date(authUserData._tokenExpirationDate).getTime() -
        //   new Date().getTime();
        // this.autoSignOut(expirationDuration);
      } else {
        return { type: 'DUMMY' };
      }
    })
  );

  @Effect({ dispatch: false })
  authSignOut = this.actions$.pipe(
    ofType(AuthActions.SIGNOUT),
    tap(() => {
      this.authService.clearSignOutTimer();
      localStorage.removeItem('authUserData');
      this.router.navigate(['/auth']);
    })
  );
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}
}
