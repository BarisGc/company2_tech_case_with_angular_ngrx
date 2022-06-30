import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { UsersService } from '../users.service';

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
export class UsersHeaderComponent implements OnInit {
  usersCount!: number;

  constructor(private usersService: UsersService) {}

  subscription!: Subscription;

  ngOnInit(): void {
    this.usersCount = this.usersService.getUsers().length;
    this.subscription = this.usersService.tableParametersChanged.subscribe(
      (tableParamaters) => {
        this.usersCount = tableParamaters.nonFilteredUsersTableData.length;
      }
    );
  }
}
