import { Component, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../models/task.model';
import { TruncatePipe } from '../../../../shared/components/pipes/truncate-pipe';
import { DeadlinePipe } from '../../../../shared/components/pipes/deadline-pipe';
import { HighlightDirective } from '../../../../shared/directives/highlight.directive';
import { OverdueDirective } from '../../../../shared/directives/overdue.directive';
import { TooltipDirective } from '../../../../shared/directives/tooltip.directive';
import { PriorityColorDirective } from '../../../../shared/directives/priority-color.directive';
import { FilterByPipe } from '../../../../shared/components/pipes/filter-by.pipe';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule,
    TruncatePipe,
    DeadlinePipe,
    OverdueDirective,
    HighlightDirective,
    TooltipDirective,
    PriorityColorDirective,FilterByPipe
  ],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css'
})
export class TaskList {
  statuses = ['En attente', 'En cours', 'Terminé'];
selectedStatus = signal<string>(''); // '' = no filter, show everything

  tasks = input.required<Task[]>();

  showAssignee = input(true);

}