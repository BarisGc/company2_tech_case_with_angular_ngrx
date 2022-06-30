import { Action } from '@ngrx/store';

export const SIGNIN_START = '[Auth] Signin Start';
export const AUTHENTICATE_SUCCESS = '[Auth] SignIn';
export const AUTHENTICATE_FAIL = '[Auth] SignIn Fail';
export const SIGNUP_START = '[Auth] SignIn Start';
export const CLEAR_ERROR = '[Auth] Clear Error';
export const AUTO_SIGNIN = '[Auth] Auto Signin';
export const SIGNOUT = '[Auth] SignOut';

export class AuthenticateSuccess implements Action {
  readonly type = AUTHENTICATE_SUCCESS;
  constructor(
    public payload: {
      email: string;
      userID: string;
      token: string;
      expirationDate: Date;
      redirect: boolean;
    }
  ) {}
}

export class SignOut implements Action {
  readonly type = SIGNOUT;
}

export class SignInStart implements Action {
  readonly type = SIGNIN_START;
  constructor(
    public payload: {
      email: string;
      password: string;
    }
  ) {}
}

export class AuthenticateFail implements Action {
  readonly type = AUTHENTICATE_FAIL;
  constructor(public payload: string) {}
}

export class SignUpStart implements Action {
  readonly type = SIGNUP_START;
  constructor(
    public payload: {
      email: string;
      password: string;
    }
  ) {}
}

export class ClearError implements Action {
  readonly type = CLEAR_ERROR;
}

export class AutoSignIn implements Action {
  readonly type = AUTO_SIGNIN;
}
export type AuthActions =
  | AuthenticateSuccess
  | SignOut
  | SignInStart
  | AuthenticateFail
  | SignUpStart
  | ClearError
  | AutoSignIn;
