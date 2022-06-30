import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-details-options-bar',
  templateUrl: './user-details-options-bar.component.html',
  styleUrls: ['./user-details-options-bar.component.css'],
})
export class UserDetailsOptionsBarComponent implements OnInit {
  value = 2;
  constructor() {}

  ngOnInit(): void {}
}
