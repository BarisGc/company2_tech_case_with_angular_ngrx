// with that, this interceptor should add the token to all outgoing requests.
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpParams,
  HttpEvent,
} from '@angular/common/http';
import { Observable, exhaustMap, take, map } from 'rxjs';
import { Store } from '@ngrx/store';

// import { AuthService } from './auth.service';
import * as fromApp from '../appStore/app.reducer';

// No Provider for this service
@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(
    // private authService: AuthService,
    private store: Store<fromApp.AppState>
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.store.select('auth').pipe(
      take(1),
      map(
        (authState) => {
          return authState.user;
        } // store objesinden user bilgisi alınıyor
      ),
      exhaustMap((authUser) => {
        if (!authUser) {
          return next.handle(req);
        }
        const modifiedReq = req.clone({
          params: new HttpParams().set('auth', authUser.token),
        });
        return next.handle(modifiedReq);
      })
    );
  }
}
