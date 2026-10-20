import { Component, computed, input } from '@angular/core';
import { User } from '../../models/user.model';
import { Project } from '../../../projects/models/project.model';
import { UserProjectGroup } from '../user-project-group/user-project-group';
import { TitleCasePipe,LowerCasePipe,NgClass } from '@angular/common';
import { InitialsPipe } from '../../../../shared/components/pipes/initials-pipe';
import { HighlightDirective } from '../../../../shared/directives/highlight.directive';
import { NgStyle } from '@angular/common';


@Component({
  selector: 'app-user-card',
  imports: [UserProjectGroup, TitleCasePipe,LowerCasePipe,InitialsPipe, HighlightDirective,NgClass,NgStyle ],
  templateUrl: './user-card.html',
  styleUrl: './user-card.css'
})
export class UserCard {

  user = input.required<User>();

  projects = input.required<Project[]>();

  assignedTasks = computed(() => {
    return this.projects()
      .flatMap(project => project.tasks)
      .filter(task => task.assigneeId === this.user().id);
  });

  todoCount = computed(() => {
    return this.assignedTasks()
      .filter(task => task.status === 'En attente').length;
  });

  inProgressCount = computed(() => {
    return this.assignedTasks()
      .filter(task => task.status === 'En cours').length;
  });

  completedCount = computed(() => {
    return this.assignedTasks()
      .filter(task => task.status === 'Terminé').length;
  });

  assignedProjects = computed(() => {
    return this.projects().filter(project =>
      project.tasks.some(
        task => task.assigneeId === this.user().id
      )
    );
  });

  roleColors: Record<string, string> = {
    'Admin': '#7c3aed',
    'Chef de projet': '#2563eb',
    'Développeur': '#059669',
    'Testeur': '#ea580c'
  };

  get initialColor(): string {
    return this.roleColors[this.user().role] ?? '#6b7280';
  }

}