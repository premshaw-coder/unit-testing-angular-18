import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appMakeBlue]' // Choose a descriptive selector name
})
export class MakeBlueDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @HostListener('mouseenter') onMouseEnter() {
    this.renderer.setStyle(this.el.nativeElement, 'color', 'blue'); // Or 'background-color' if you want to change the background
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.removeStyle(this.el.nativeElement, 'color'); // Remove the style to revert to the original color
    // Or 'background-color' if you changed the background
  }

}