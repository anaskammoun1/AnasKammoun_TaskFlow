import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../models/task.model';
import { TruncatePipe } from '../../../../shared/components/pipes/truncate-pipe';
import { DeadlinePipe } from '../../../../shared/components/pipes/deadline-pipe';



@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule,
    TruncatePipe,
    DeadlinePipe
  ],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css'
})
export class TaskList {

  tasks = input.required<Task[]>();

  showAssignee = input(true);

}