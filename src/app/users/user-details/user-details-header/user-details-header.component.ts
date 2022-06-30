import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Users } from '../../users.model';
import { UsersService } from '../../users.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../appStore/app.reducer';
import { map } from 'rxjs/operators';
@Component({
  selector: '.app-user-details-header',
  templateUrl: './user-details-header.component.html',
  styleUrls: ['./user-details-header.component.css'],
})
export class UserDetailsHeaderComponent implements OnInit {
  id!: number;
  userDetails?: Users;

  constructor(
    private usersService: UsersService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}
  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      // this.userDetails = this.usersService.getUser(this.ID);
      this.store
        .select('users')
        .pipe(
          map((usersState) => {
            return usersState.tableParameters.nonFilteredUsersTableData.find(
              (user: Users) => {
                return user.userID === this.id;
              }
            );
          })
        )
        .subscribe((user) => {
          this.userDetails = user;
        });
    });
  }
}
