import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-form-test-button2',
  templateUrl: './form-test-button2.component.html',
  styleUrls: ['./form-test-button2.component.css'],
})
export class FormTestButton2Component implements OnInit {
  //formStatusButton1 yerine component de alınabilir...
  //formStatusButton1 yerine component de alınabilir...
  @ViewChild('formStatusButton2', { static: false })
  formStatusButton2!: ElementRef;
  constructor() {}

  ngOnInit(): void {}

  onDoSomething2() {
    console.log('Do something2', this.formStatusButton2);
  }
}
