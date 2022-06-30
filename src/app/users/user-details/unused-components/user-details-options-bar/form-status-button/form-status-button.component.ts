import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-status-button',
  templateUrl: './form-status-button.component.html',
  styleUrls: ['./form-status-button.component.css'],
})
export class FormStatusButtonComponent implements OnInit {
  onlySomething = false;
  onDoSomething1(para1: any) {
    console.log('Do something1', para1);
  }
  constructor() {}

  ngOnInit(): void {}
}
