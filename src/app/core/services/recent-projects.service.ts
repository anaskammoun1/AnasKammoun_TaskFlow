import { Injectable, signal } from '@angular/core';
import { Project } from '../../features/projects/models/project.model';

@Injectable({
  providedIn: 'root'
})
export class RecentProjectsService {

  recentProjects = signal<Project[]>([]);

  addProject(project: Project): void {
    this.recentProjects.update(projects => [
      project,
      ...projects.filter(p => p.id !== project.id)
    ].slice(0, 5));
  }
}