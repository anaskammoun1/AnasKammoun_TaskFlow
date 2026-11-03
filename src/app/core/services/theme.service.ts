
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  isDarkMode = signal(false);

  toggleTheme(): void {
    this.isDarkMode.update(value => !value);
  }
}
