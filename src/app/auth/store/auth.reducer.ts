import { AuthUserModel } from '../auth-user.model';
import * as AuthActions from './auth.actions';

export interface AuthState {
  user: AuthUserModel | null;
  authError: string | null;
  isLoading: boolean | null;
}

const initialState: AuthState = {
  user: null,
  authError: null,
  isLoading: false,
};

export function authReducer(
  state = initialState,
  action: AuthActions.AuthActions
) {
  switch (action.type) {
    case AuthActions.AUTHENTICATE_SUCCESS:
      const user = new AuthUserModel(
        action.payload.email,
        action.payload.userID,
        action.payload.token,
        action.payload.expirationDate
      );
      return {
        ...state,
        authError: null,
        user: user, // sadece user yazılabilir
        isLoading: false,
      };

    case AuthActions.SIGNOUT:
      return {
        ...state,
        user: null,
      };
    case AuthActions.SIGNIN_START:
    case AuthActions.SIGNUP_START:
      return {
        ...state,
        authError: null,
        isLoading: true,
      };
    case AuthActions.AUTHENTICATE_FAIL:
      return {
        ...state,
        user: null,
        authError: action.payload,
        isLoading: false,
      };
    case AuthActions.CLEAR_ERROR:
      return {
        ...state,
        authError: null,
      };

    default:
      return state;
  }
}
