import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-users-options-bar',
  templateUrl: './users-options-bar.component.html',
  styleUrls: ['./users-options-bar.component.css'],
})
export class UsersOptionsBarComponent implements OnInit {
  searchValue: string | null = null;
  userPageLimitValue: number | null = null;

  constructor(
    private userservice: UsersService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  handleSearchName = (event: any) => {
    this.userservice.updateSearchName(event.target.value);
    this.userservice.updateFilteredUsersTableData();
  };

  handleUserPageLimit = (event: any) => {
    this.userservice.updateTablePaginationInfoPaginationLimit(
      event.target.value
    );
    this.userservice.calculateTableTotalPages();
    this.userservice.updateFilteredUsersTableData();
  };

  handleUserStatusFilter = (userNewStatusSelection: string) => {
    this.userservice.updateUserStatusFilter(userNewStatusSelection);
    this.userservice.updateFilteredUsersTableData();
  };

  handleClearFilters = () => {
    this.searchValue = null;
    this.userPageLimitValue = null;
    this.userservice.updateSearchName('');
    this.userservice.updateUserStatusFilter('');
    this.userservice.updateTablePaginationInfoPaginationLimit(
      this.userservice.getAllTableParameters().tablePaginationInfo
        .defaultPaginationLimit
    );
    this.userservice.updateUsertableTotalPages(
      Math.ceil(
        this.userservice.getAllTableParameters().nonFilteredUsersTableData
          .length /
          this.userservice.getAllTableParameters().tablePaginationInfo
            .defaultPaginationLimit
      )
    );

    this.userservice.updateFilteredUsersTableData();
  };

  onNewUser() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
