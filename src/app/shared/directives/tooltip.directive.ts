
import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2
} from '@angular/core';

@Directive({
  selector: '[appTooltip]',
  standalone: true
})
export class TooltipDirective {
  @Input() appTooltip = '';

  private tooltipElement: HTMLElement | null = null;

  constructor(
    private element: ElementRef,
    private renderer: Renderer2
  ) {}

  @HostListener('mouseenter')
  onMouseEnter(): void {
    if (!this.appTooltip || this.tooltipElement) {
      return;
    }

    const host = this.element.nativeElement;

    this.tooltipElement = this.renderer.createElement('span');

    const text = this.renderer.createText(this.appTooltip);
    this.renderer.appendChild(this.tooltipElement, text);

    this.renderer.setStyle(host, 'position', 'relative');

    this.renderer.setStyle(this.tooltipElement, 'position', 'absolute');
    this.renderer.setStyle(this.tooltipElement, 'top', '100%');
    this.renderer.setStyle(this.tooltipElement, 'left', '0');
    this.renderer.setStyle(this.tooltipElement, 'z-index', '50');
    this.renderer.setStyle(this.tooltipElement, 'background-color', '#1f2937');
    this.renderer.setStyle(this.tooltipElement, 'color', '#ffffff');
    this.renderer.setStyle(this.tooltipElement, 'padding', '8px');
    this.renderer.setStyle(this.tooltipElement, 'border-radius', '6px');
    this.renderer.setStyle(this.tooltipElement, 'font-size', '12px');
    this.renderer.setStyle(this.tooltipElement, 'width', 'max-content');
    this.renderer.setStyle(this.tooltipElement, 'max-width', '300px');
    this.renderer.setStyle(this.tooltipElement, 'white-space', 'normal');

    this.renderer.appendChild(host, this.tooltipElement);
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    if (this.tooltipElement) {
      this.renderer.removeChild(
        this.element.nativeElement,
        this.tooltipElement
      );

      this.tooltipElement = null;
      this.renderer.removeStyle(this.element.nativeElement, 'position');
    }
  }
}
