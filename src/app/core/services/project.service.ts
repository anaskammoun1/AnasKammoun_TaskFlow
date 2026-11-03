import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError, finalize, throwError } from 'rxjs';import { Project } from '../../features/projects/models/project.model';
import { PROJECTS } from '../../features/projects/data/projects.data';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
    private apiUrl = 'http://localhost:3000/projects';

    id = Math.random();

    loading = signal(false);
    error = signal<string | null>(null);

    constructor(private http: HttpClient) {
    console.log('ProjectService créé :', this.id);
  }

    //La méthode va retourner un Observable qui va fournir un tableau de Project
  getProjects(): Observable<Project[]> {
    //of() transforme une valeur en Observable.
    //return of(PROJECTS);
    //ne retourne pas directement PROJECTS.Il retourne un Observable qui va émettre PROJECTS

    this.loading.set(true);
    this.error.set(null);

    return this.http.get<Project[]>(this.apiUrl).pipe(
      tap(projects => {
        console.log('Projets récupérés :', projects);
        console.log('Project ID:', projects[0]?.id);
        console.log('Type:', typeof projects[0]?.id);
      }),
      catchError(err => {
        this.error.set('Erreur lors du chargement des projets.');
        return throwError(() => err);
      }),
      finalize(() => this.loading.set(false))
    );
  }

}