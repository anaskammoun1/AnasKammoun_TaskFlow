
import { Directive, Input, HostBinding } from '@angular/core';

@Directive({
  selector: '[appOverdue]',
  standalone: true
})
export class OverdueDirective {
  private currentDueDate?: string;
  private isDone = false;

  @HostBinding('class')
  get hostClasses(): string {
    if (this.isOverdue()) {
      return 'border-red-500 bg-red-50';
    }

    return '';
  }

  @Input()
  set dueDate(value: string | undefined) {
    this.currentDueDate = value;
  }

  @Input()
  set done(value: boolean) {
    this.isDone = value;
  }

  private isOverdue(): boolean {
    if (!this.currentDueDate || this.isDone) {
      return false;
    }

    const today = new Date();
    const todayString =
      `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

    return this.currentDueDate < todayString;
  }
}
