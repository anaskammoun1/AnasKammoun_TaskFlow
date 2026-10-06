import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Project } from '../../features/projects/models/project.model';
import { PROJECTS } from '../../features/projects/data/projects.data';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {


    //La méthode va retourner un Observable qui va fournir un tableau de Project
  getProjects(): Observable<Project[]> {
    //of() transforme une valeur en Observable.
    return of(PROJECTS);
    //ne retourne pas directement PROJECTS.Il retourne un Observable qui va émettre PROJECTS
  }

}