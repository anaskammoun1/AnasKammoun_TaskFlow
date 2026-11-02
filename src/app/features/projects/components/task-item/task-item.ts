
import { Component, input,output  } from '@angular/core';
import { DatePipe,NgClass, NgStyle } from '@angular/common';
import { HighlightDirective } from '../../../../shared/directives/highlight.directive';
import { OverdueDirective } from '../../../../shared/directives/overdue.directive';
import { DeadlinePipe } from '../../../../shared/pipes/deadline-pipe';
import { TruncatePipe } from '../../../../shared/pipes/truncate-pipe';
import { Task } from '../../models/task.model';
import { TooltipDirective } from '../../../../shared/directives/tooltip.directive';
import { PriorityColorDirective } from '../../../../shared/directives/priority-color.directive';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [
    DatePipe,
    DeadlinePipe,
    TruncatePipe,
    HighlightDirective,
    OverdueDirective,
    TooltipDirective,
    PriorityColorDirective,
    NgClass,
    NgStyle
  ],
  templateUrl: './task-item.html'
})
export class TaskItem {
  task = input.required<Task>();

  showAssignee = input(true);

  assigneeName = input<string | null>(null);

  taskStatusChange = output<{
    taskId: number;
    status: Task['status'];
  }>();

  taskDeleted = output<number>();

  changeStatus(): void {
    const task = this.task();

    let newStatus: Task['status'];

    switch (task.status) {
      case 'En attente':
        newStatus = 'En cours';
        break;

      case 'En cours':
        newStatus = 'Terminé';
        break;

      case 'Terminé':
        newStatus = 'En attente';
        break;
    }

    this.taskStatusChange.emit({
      taskId: task.id,
      status: newStatus
    });
  }

  deleteTask(): void {
    this.taskDeleted.emit(this.task().id);
  }

}
