
import { Component, input, signal,output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Task } from '../../models/task.model';
import { User } from '../../../users/models/user.model';
import { FilterByPipe } from '../../../../shared/pipes/filter-by.pipe';
import { TaskItem } from '../task-item/task-item';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule,
    FilterByPipe,
    TaskItem,
  ],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css'
})
export class TaskList {
  statuses = ['En attente', 'En cours', 'Terminé'];

  selectedStatus = signal<string>('');

  tasks = input.required<Task[]>();

  showAssignee = input(true);

  users = input<User[]>([]);

  getAssigneeName(assigneeId: number | undefined): string | null {
    if (assigneeId === undefined) {
      return null;
    }

    return this.users().find(user => user.id === assigneeId)?.name ?? null;
  }

  taskStatusChange = output<{
    taskId: number;
    status: Task['status'];
  }>();

  onTaskStatusChange(event: {
    taskId: number;
    status: Task['status'];
  }): void {
    this.taskStatusChange.emit(event);
  }
}
