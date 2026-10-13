import { Component, input, output } from '@angular/core';

export type ViewMode = 'task' | 'user';

@Component({
  selector: 'app-view-toggle',
  imports: [],
  templateUrl: './view-toggle.html',
  styleUrl: './view-toggle.css'
})
export class ViewToggle {

  activeView = input.required<ViewMode>();

  viewChange = output<ViewMode>();

  selectView(view: ViewMode) {
    this.viewChange.emit(view);
  }

}