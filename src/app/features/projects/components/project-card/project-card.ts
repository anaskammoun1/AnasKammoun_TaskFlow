import { Component, input, output } from '@angular/core';
import { Project } from '../../models/project.model';
import { TaskList } from '../task-list/task-list';

@Component({
  selector: 'app-project-card',
  imports: [TaskList],
  templateUrl: './project-card.html',
  styleUrl: './project-card.css'
})
export class ProjectCard {

  project = input.required<Project>();

  projectSelected = output<Project>();

  selectProject() {
    this.projectSelected.emit(this.project());
  }
}