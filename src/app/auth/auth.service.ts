import { Injectable } from '@angular/core';
import { AuthUserModel } from './auth-user.model';

import * as fromApp from '../appStore/app.reducer';
import * as AuthActions from './store/auth.actions';
import { Store } from '@ngrx/store';
// export interface AuthResponseData {
//   kind: string;
//   idToken: string;
//   email: string;
//   refreshToken: string;
//   expiresIn: string;
//   localId: string;
//   registered?: boolean;
// }
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Normal subject yerine neden behavior subject kullanıldı tam olarak anlayamadım(Adding the Token to Outgoing Requests)...
  // Max:  Now this is also imported from RxJS and generally, it behaves just like the other subject,

  // which means we can call next, to emit a value and we can subscribe to it to be informed about new values.

  // The difference is that behavior subject also gives subscribers immediate access to the previously

  // emitted value even if they haven't subscribed at the point of time that value was emitted.

  // That means we can get access to be currently active user even if we only subscribe

  // after that user has been emitted.

  // So this means when we fetch data and we need that token at this point of time, even if the user logged

  // in before that point of time which will have been the case, we get access to that latest user.

  // Now therefore behavior subject also needs to be initialized with a starting value, which in my case

  // will be null here,

  // it has to be a user object and null is a valid replacement because I don't want to start off with a

  // user.
  // authUserSubject = new BehaviorSubject<AuthUserModel | null>(null);
  tokenExpirationTimer: any;

  constructor(
    // private http: HttpClient,
    // private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  setSignOutTimer(expirationDuration: number) {
    console.log('expirationDuration', expirationDuration);
    this.tokenExpirationTimer = setTimeout(() => {
      this.store.dispatch(new AuthActions.SignOut());
    }, expirationDuration);
  }

  clearSignOutTimer() {
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
      this.tokenExpirationTimer = null;
    }
  }

  // private handleAuthentication(
  //   email: string,
  //   userId: string,
  //   token: string,
  //   expiresIn: number
  // ) {
  //   const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
  //   const newAuthUser = new AuthUserModel(email, userId, token, expirationDate);
  //   // this.authUserSubject.next(newAuthUser);
  //   this.store.dispatch(
  //     new AuthActions.AuthenticateSuccess({
  //       email: email,
  //       userID: userId,
  //       token: token,
  //       expirationDate: expirationDate,
  //     })
  //   );
  //   this.autoSignOut(expiresIn * 1000);
  //   localStorage.setItem('authanticatedUserData', JSON.stringify(newAuthUser));
  // }

  // private handleError(errorRes: HttpErrorResponse) {
  //   let errorMessage = '';
  //   if (!errorRes.error || !errorRes.error.error) {
  //     return throwError(() => new Error(errorMessage));
  //   }

  //   switch (errorRes.error.error.message) {
  //     case 'EMAIL_EXISTS':
  //       errorMessage = 'This email! exists already!';
  //       break;
  //     case 'EMAIL_NOT_FOUND':
  //       errorMessage = 'This email! does not exist!';
  //       break;
  //     case 'INVALID_PASSWORD':
  //       errorMessage = 'This password! is not correct!';
  //       break;
  //     default:
  //       errorMessage = 'An unknown error occurred!';
  //   }
  //   return throwError(() => new Error(errorMessage));
  // }

  // signUp(email: string, password: string) {
  //   return this.http
  //     .post<AuthResponseData>(
  //       'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
  //         environment.fireBaseApiKey,
  //       {
  //         email: email,
  //         password: password,
  //         returnSecureToken: true,
  //       }
  //     )
  //     .pipe(
  //       catchError(this.handleError),
  //       tap((resData) => {
  //         this.handleAuthentication(
  //           resData.email,
  //           resData.localId,
  //           resData.idToken,
  //           +resData.expiresIn
  //         );
  //       })
  //     );
  // }

  // signIn(email: string, password: string) {
  //   return this.http
  //     .post<AuthResponseData>(
  //       'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
  //         environment.fireBaseApiKey,
  //       {
  //         email: email,
  //         password: password,
  //         returnSecureToken: true,
  //       }
  //     )
  //     .pipe(
  //       catchError(this.handleError),
  //       tap((resData) => {
  //         this.handleAuthentication(
  //           resData.email,
  //           resData.localId,
  //           resData.idToken,
  //           +resData.expiresIn
  //         );
  //       })
  //     );
  // }

  // autoSignIn() {
  //   const authUserData: {
  //     email: string;
  //     id: string;
  //     _token: string;
  //     _tokenExpirationDate: string;
  //   } = JSON.parse(localStorage.getItem('authanticatedUserData') || '{}');
  //   if (!authUserData) {
  //     return;
  //   }
  //   const loadedAuthUser = new AuthUserModel(
  //     authUserData.email,
  //     authUserData.id,
  //     authUserData._token,
  //     new Date(authUserData._tokenExpirationDate)
  //   );
  //   if (loadedAuthUser.token) {
  //     // this.authUserSubject.next(loadedAuthUser);
  //     this.store.dispatch(
  //       new AuthActions.AuthenticateSuccess({
  //         email: loadedAuthUser.email,
  //         userID: loadedAuthUser.id,
  //         token: loadedAuthUser.token,
  //         expirationDate: new Date(authUserData._tokenExpirationDate),
  //       })
  //     );
  //     const expirationDuration =
  //       new Date(authUserData._tokenExpirationDate).getTime() -
  //       new Date().getTime();
  //     this.autoSignOut(expirationDuration);
  //   }
  // }

  // signOut() {
  //   // this.authUserSubject.next(null);
  //   this.store.dispatch(new AuthActions.SignOut());
  //   // this.router.navigate(['/auth']);
  //   localStorage.removeItem('authanticatedUserData');
  //   if (this.tokenExpirationTimer) {
  //     clearTimeout(this.tokenExpirationTimer);
  //   }
  //   this.tokenExpirationTimer = null;
  // }
}
