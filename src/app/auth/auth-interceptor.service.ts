// with that, this interceptor should add the token to all outgoing requests.
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, exhaustMap, take, map } from 'rxjs';
import { AuthService } from './auth.service';

import { Store } from '@ngrx/store';
import * as fromApp from '../appStore/app.reducer';
@Injectable() // No Provider for this service
export class AuthInterceptorService implements HttpInterceptor {
  constructor(
    private authService: AuthService,
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
          params: new HttpParams().set('auth', authUser!.token),
        });
        return next.handle(modifiedReq);
      })
    );
  }
}
