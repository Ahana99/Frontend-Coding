/**
 * Create a directive appHighlight that changes the background color to yellow when the user hovers over an element, and resets when the mouse leaves.

    Expected:
    - Hovering on a <p appHighlight> highlights it.
    - Moving the mouse away restores original color.
 */

    import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({ selector: '[appHighlight]' })
export class HighlightDirective {
  constructor(private el: ElementRef) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.el.nativeElement.style.backgroundColor = 'yellow';
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.el.nativeElement.style.backgroundColor = '';
  }
}
