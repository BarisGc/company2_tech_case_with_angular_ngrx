import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs/operators';
// import { UsersService } from '../../users.service';

import { Users } from '../../users.model';
import * as fromApp from '../../../appStore/app.reducer';
@Component({
  selector: 'app-user-details-table',
  templateUrl: './user-details-table.component.html',
  styleUrls: ['./user-details-table.component.css'],
})
export class UserDetailsTableComponent implements OnInit {
  userDetails?: Users;
  ID!: number;

  constructor(
    // private usersService: UsersService,
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.route.params
      .pipe(
        map((params) => {
          return +params['id'];
        }),
        switchMap((id) => {
          this.ID = id;
          return this.store.select('users');
        }),
        map((usersState) => {
          return usersState.tableParameters.nonFilteredUsersTableData.find(
            (user) => {
              return user.userID === this.ID;
            }
          );
        })
      )
      .subscribe((userDetails) => {
        this.userDetails = userDetails;
      });
  }
}
