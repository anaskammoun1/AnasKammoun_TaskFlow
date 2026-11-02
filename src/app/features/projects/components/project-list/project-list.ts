
import { Component, computed, signal, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Project } from '../../models/project.model';
import { ProjectCard } from '../project-card/project-card';
import { ProjectService } from '../../../../core/services/project.service';
import { User } from '../../../users/models/user.model';
import { UserService } from '../../../../core/services/user.service';
import { Task } from '../../models/task.model';

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

  filteredProjects = computed(() => {
    return this.projects().filter(project =>
      project.name
        .toLowerCase()
        .includes(this.searchTerm().toLowerCase())
    );
  });

  constructor(private projectService: ProjectService, private userService: UserService) {}

  ngOnInit(): void {
    this.projectService.getProjects().subscribe(projects => {
      this.projects.set(projects);
    });
      this.userService.getUsers().subscribe(users => {
    this.users.set(users);
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
