
import { Directive, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appPriorityColor]',
  standalone: true
})
export class PriorityColorDirective implements OnChanges {
  @Input() appPriorityColor = '';

  constructor(
    private element: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnChanges(): void {
    let color: string;

    switch (this.appPriorityColor) {
      case 'Haute':
        color = '#dc2626';
        break;
      case 'Moyenne':
        color = '#d97706';
        break;
      case 'Basse':
        color = '#16a34a';
        break;
      default:
        color = '#374151';
    }

    this.renderer.setStyle(
      this.element.nativeElement,
      'color',
      color
    );
  }
}
