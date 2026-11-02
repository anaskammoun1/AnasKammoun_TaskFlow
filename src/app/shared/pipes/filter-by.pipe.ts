import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterBy',
  standalone: true,
})
export class FilterByPipe implements PipeTransform {
  transform<T>(
    items: T[] | null | undefined,
    property: keyof T,
    value: unknown
  ): T[] {
    if (!items) {
      return []; // absent list, no error
    }
    if (value === null || value === undefined || value === '') {
      return items; // no criterion, return everything
    }
    return items.filter((item) => item[property] === value);
  }
}