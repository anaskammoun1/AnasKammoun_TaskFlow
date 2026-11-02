import { Component, input, output,computed  } from '@angular/core';
import { Project } from '../../models/project.model';
import { TaskList } from '../task-list/task-list';
import { UpperCasePipe,DatePipe, CurrencyPipe,PercentPipe,DecimalPipe,SlicePipe, KeyValuePipe,NgStyle } from '@angular/common';
import { HighlightDirective } from '../../../../shared/directives/highlight.directive';
import { User } from '../../../users/models/user.model';
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
  selector: 'app-project-card',
  imports: [TaskList, UpperCasePipe, DatePipe, CurrencyPipe, PercentPipe,DecimalPipe,SlicePipe, KeyValuePipe, HighlightDirective, NgStyle ],
  templateUrl: './project-card.html',
  styleUrl: './project-card.css'
})
export class ProjectCard {

  project = input.required<Project>();
  users = input<User[]>([]);

  completedTasks = computed(() =>
  this.project().tasks.filter(task => task.status === 'Terminé').length
  );

  completionRate = computed(() => {
    const total = this.project().tasks.length;

    if (total === 0) {
      return 0;
    }

    return this.completedTasks() / total;
  });

  // Taux de réalisation : tâches terminées / total des tâches

  // Coût moyen par tâche
  get averageCost(): number {
    const tasks = this.project().tasks;

    if (tasks.length === 0) {
      return 0;
    }

    return this.project().budget / tasks.length;
  }
  get taskCountByPriority(): Record<string, number> {
    const counts: Record<string, number> = {
      Basse: 0,
      Haute: 0,
      Moyenne: 0
    };

    for (const task of this.project().tasks) {
      counts[task.priority]++;
    }

    return counts;
  }

  get barColor(): string {
    const percentage = this.completionRate() * 100;

    if (percentage < 34) {
      return '#ef4444';
    }

    if (percentage <= 66) {
      return '#f59e0b';
    }

    return '#22c55e';
  }

  projectSelected = output<Project>();

  selectProject() {
    this.projectSelected.emit(this.project());
  }

  taskStatusChange = output<TaskStatusChangeEvent>();

  taskDeleted = output<TaskDeletedEvent>();

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