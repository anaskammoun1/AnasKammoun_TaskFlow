
import { Component, computed, signal, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Project } from '../../models/project.model';
import { ProjectCard } from '../project-card/project-card';
import { ProjectService } from '../../../../core/services/project.service';
import { User } from '../../../users/models/user.model';
import { UserService } from '../../../../core/services/user.service';
import { Task } from '../../models/task.model';

import { FavoritesService } from '../../../../core/services/favorites.service';
import { RecentProjectsService } from '../../../../core/services/recent-projects.service';
import { ThemeService } from '../../../../core/services/theme.service';
import { NotificationService } from '../../../../core/services/notification.service';
type TaskStatusChangeEvent = {
  projectId: number;
  taskId: number;
  status: Task['status'];
};

type TaskDeletedEvent = {
  projectId: number;
  taskId: number;
};
@Component({
  selector: 'app-project-list',
  imports: [FormsModule, ProjectCard],
  templateUrl: './project-list.html',
  styleUrl: './project-list.css'
})

export class ProjectList implements OnInit {

  projects = signal<Project[]>([]);
  users = signal<User[]>([]);
  searchTerm = signal('');

  favoritesService = inject(FavoritesService);
  recentProjectsService = inject(RecentProjectsService);

  themeService = inject(ThemeService);

  notificationService = inject(NotificationService);

  filteredProjects = computed(() => {
    return this.projects().filter(project =>
      project.name
        .toLowerCase()
        .includes(this.searchTerm().toLowerCase())
    );
  });


constructor(
  private projectService: ProjectService,
  private userService: UserService
) {}

ngOnInit(): void {
  console.log('ID ProjectService dans ProjectList :', this.projectService.id);

  this.projectService.getProjects().subscribe(projects => {
    this.projects.set(projects);
  });

  this.userService.getUsers().subscribe(users => {
    this.users.set(users);
    console.log('Utilisateurs chargés :', users);
  });
}

  selectProject(project: Project): void {
    console.log('Projet sélectionné :', project);
  }

  updateTaskStatus(event: TaskStatusChangeEvent): void {
  this.projects.update(projects =>
    projects.map(project =>
      project.id !== event.projectId
        ? project
        : {
            ...project,
            tasks: project.tasks.map(task =>
              task.id !== event.taskId
                ? task
                : {
                    ...task,
                    status: event.status
                  }
            )
          }
    )
  );
}

  deleteTask(event: TaskDeletedEvent): void {
    this.projects.update(projects =>
      projects.map(project =>
        project.id !== event.projectId
          ? project
          : {
              ...project,
              tasks: project.tasks.filter(task => task.id !== event.taskId)
            }
      )
    );
  }
}
