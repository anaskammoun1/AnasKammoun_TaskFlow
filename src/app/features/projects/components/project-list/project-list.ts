import { Component, computed, signal } from '@angular/core';

//import FormsModule pour pouvoir utiliser ngModel dans le template HTML
import { FormsModule } from '@angular/forms';

//Project est notre interface TypeScript.
//Elle décrit la structure d'un projet 
import { Project } from '../../models/project.model';
import { PROJECTS } from '../../data/projects.data';

//ProjectCard est le composant enfant qui affiche une carte de projet.
import { ProjectCard } from '../project-card/project-card';
import { ProjectService } from '../../../../core/services/project.service';

@Component({
  selector: 'app-project-list',
  imports: [FormsModule, ProjectCard],
  templateUrl: './project-list.html',
  styleUrl: './project-list.css'
})

//C'est la classe qui contient toute la logique du composant.
export class ProjectList {

  //Crée un tableau de Project appelé "projects" contenant les projets présents dans PROJECTS.
  projects = signal<Project[]>([]);


  //Cette variable contient ce que l'utilisateur écrit dans le champ de recherche.
  searchTerm = signal('');

  //Cette méthode retourne un tableau de projets filtrés selon le terme de recherche.
  filteredProjects = computed(() => {
    return this.projects().filter(project =>
      project.name
        .toLowerCase()
        .includes(this.searchTerm().toLowerCase())
    );
  });

  constructor(private projectService: ProjectService) {}

  ngOnInit() {
    //Appelle getProjects(). Quand l'Observable fournit les projets, récupère-les dans projects et mets à jour mon Signal
    this.projectService.getProjects().subscribe(projects => {
      this.projects.set(projects);
    });
  }


  //Cette méthode est appelée lorsqu'on clique sur : Sélectionner
  selectProject(project: Project) {
    console.log('Projet sélectionné :', project);
  }
}