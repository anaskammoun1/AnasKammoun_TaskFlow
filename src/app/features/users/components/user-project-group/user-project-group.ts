import { Component, computed, input, output } from '@angular/core';
import { Project } from '../../../projects/models/project.model';
import { TaskList } from '../../../projects/components/task-list/task-list';
import { Task } from '../../../projects/models/task.model';
import { User } from '../../models/user.model';

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
  selector: 'app-user-project-group',
  imports: [TaskList],
  templateUrl: './user-project-group.html',
  styleUrl: './user-project-group.css'
})
export class UserProjectGroup {

  project = input.required<Project>();

  userId = input.required<number>();

  users = input.required<User[]>();

  taskStatusChange = output<TaskStatusChangeEvent>();

  taskDeleted = output<TaskDeletedEvent>();

  userTasks = computed(() => {
    return this.project().tasks.filter(
      task => task.assigneeId === this.userId()
    );
  });

  onTaskStatusChange(event: {
    taskId: number;
    status: Task['status'];
  }): void {
    this.taskStatusChange.emit({
      projectId: this.project().id,
      taskId: event.taskId,
      status: event.status
    });
  }

  onTaskDeleted(taskId: number): void {
    this.taskDeleted.emit({
      projectId: this.project().id,
      taskId
    });
  }

}