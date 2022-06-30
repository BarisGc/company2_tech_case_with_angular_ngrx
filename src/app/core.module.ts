import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthInterceptorService } from './auth/auth-interceptor.service';

@NgModule({
  providers: [
    // ShoppingListService, @injectable({providedIn: 'root'}) kullanılmayacaksa böyle yapılmalı
    // RecipeService, @injectable({providedIn: 'root'}) kullanılmayacaksa böyle yapılmalı
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
})
export class CoreModule {}
