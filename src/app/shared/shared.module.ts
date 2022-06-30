import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertComponent } from './alert/alert.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AlertComponent, LoadingSpinnerComponent, NavbarComponent],
  imports: [CommonModule, RouterModule],
  exports: [
    AlertComponent,
    LoadingSpinnerComponent,
    NavbarComponent,
    CommonModule,
  ],
  // entryComponents: [AlertComponent],
})
export class SharedModule {}
