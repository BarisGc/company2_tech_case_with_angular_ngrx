// import {
//   Directive,
//   ElementRef,
//   HostBinding,
//   HostListener,
//   Input,
//   Renderer2,
// } from '@angular/core';

// @Directive({
//   selector: '[appDynamicallySettingFromOutsideHighlightAttDirective]',
// })
// export class DynamicallySettingFromOutsideHighlightAttDirective {
//   @Input() defaultColor: string = 'gray';
//   @Input('appDynamicallySettingFromOutsideHighlightAttDirective')
//   @HostBinding('style.backgroundColor')
//   backgroundColor!: string;

//   constructor(private elRef: ElementRef, private renderer: Renderer2) {}

//   ngOnInit() {
//     this.backgroundColor = this.defaultColor;
//   }

//   @HostListener('mouseenter') mouseover(eventData: Event) {
//     this.backgroundColor = 'violet';
//   }
//   @HostListener('mouseleave') mouseleave(eventData: Event) {
//     this.backgroundColor = 'teal';
//   }
// }
