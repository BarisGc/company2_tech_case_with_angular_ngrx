import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map, pluck } from 'rxjs/operators';
// import { UsersService } from '../users.service';
import * as fromApp from '../../appStore/app.reducer';

@Component({
  selector: '[app-users-header]',
  templateUrl: './users-header.component.html',
  // template: `
  // <app-dummy-component1></app-dummy-component1>
  // <app-dummy-component1></app-dummy-component1>
  // <p>This is an another approach!</p>
  // `,
  styleUrls: ['./users-header.component.css'],
  // styles: [`
  //     p {
  //   padding:20px;
  //   background-color:mistyrose;
  //   border: 1px solid red;
  // }`]
})
export class UsersHeaderComponent implements OnInit, OnDestroy {
  usersCount!: number;

  constructor(
    private store: Store<fromApp.AppState> // private usersService: UsersService
  ) {}
  // constructor(private usersService: UsersService) {}

  usersCountSub!: Subscription;

  ngOnInit(): void {
    this.usersCountSub = this.store.select('users').subscribe((usersState) => {
      this.usersCount =
        usersState.tableParameters.nonFilteredUsersTableData.length;
    });

    // this.usersCount = this.usersService.getUsers().length;
    // this.subscription = this.usersService.tableParametersChanged.subscribe(
    //   (tableParamaters) => {
    //     this.usersCount = tableParamaters.nonFilteredUsersTableData.length;
    //   }
    // );
  }

  ngOnDestroy(): void {
    this.usersCountSub.unsubscribe();
  }
}
