import { Component, computed, input } from '@angular/core';
import { Project } from '../../../projects/models/project.model';
import { TaskList } from '../../../projects/components/task-list/task-list';

@Component({
  selector: 'app-user-project-group',
  imports: [TaskList],
  templateUrl: './user-project-group.html',
  styleUrl: './user-project-group.css'
})
export class UserProjectGroup {

  project = input.required<Project>();

  userId = input.required<number>();

  userTasks = computed(() => {
    return this.project().tasks.filter(
      task => task.assigneeId === this.userId()
    );
  });

}