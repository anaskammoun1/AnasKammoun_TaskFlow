import { Component, inject, signal } from '@angular/core';
import { UserList } from './features/users/components/user-list/user-list';
import {
  ViewToggle,
  ViewMode
} from './shared/components/view-toggle/view-toggle';
import { ProjectList } from './features/projects/components/project-list/project-list';
import { ThemeService } from './core/services/theme.service';
@Component({
  selector: 'app-root',
  imports: [UserList, ViewToggle, ProjectList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  activeView = signal<ViewMode>('user');

  themeService = inject(ThemeService);

  changeView(view: ViewMode) {
    this.activeView.set(view);
  }
}