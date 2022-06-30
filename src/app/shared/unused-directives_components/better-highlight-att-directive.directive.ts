import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appBetterHighlightAttDirective]',
})
// export class BetterHighlightAttDirectiveDirective {
//   constructor(private elRef: ElementRef, private renderer: Renderer2) {}

//   ngOnInit() {
//     // this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'red');
//   }

//   @HostListener('mouseenter') mouseover(eventData: Event) {
//     this.renderer.setStyle(
//       this.elRef.nativeElement,
//       'background-color',
//       'red',
//       1
//     );
//   }
//   @HostListener('mouseleave') mouseleave(eventData: Event) {
//     this.renderer.setStyle(
//       this.elRef.nativeElement,
//       'background-color',
//       'transparent',
//       1
//     );
//   }
// }

// Better Better Approach
export class BetterHighlightAttDirectiveDirective {
  @HostBinding('style.backgroundColor')
  backgroundColor: string = 'transparent';
  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    // this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'red');
  }

  @HostListener('mouseenter') mouseover(eventData: Event) {
    this.backgroundColor = 'violet';
  }
  @HostListener('mouseleave') mouseleave(eventData: Event) {
    this.backgroundColor = 'transparent';
  }
}
