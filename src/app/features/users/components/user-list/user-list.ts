import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { USERS } from '../../data/users.data';
import { PROJECTS } from '../../../projects/data/projects.data';

import { UserCard } from '../user-card/user-card';
import { EmptyState } from '../../../../shared/components/empty-state/empty-state';
import { Task } from '../../../projects/models/task.model';
import { ProjectService } from '../../../../core/services/project.service';

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
  selector: 'app-user-list',
  imports: [FormsModule, UserCard, EmptyState],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css'
})
export class UserList {

  users = signal(USERS);

  projects = signal(PROJECTS);

  searchTerm = signal('');

  filteredUsers = computed(() => {
    return this.users().filter(user =>
      user.name
        .toLowerCase()
        .includes(this.searchTerm().toLowerCase())
    );
  });

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    console.log('ID ProjectService dans UserList :', this.projectService.id);
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