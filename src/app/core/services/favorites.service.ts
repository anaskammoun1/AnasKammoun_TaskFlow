import { Injectable, signal,inject } from '@angular/core';
import { NotificationService } from './notification.service';
@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  private favorites = signal<number[]>([]);

  private notificationService = inject(NotificationService);

  count = () => this.favorites().length;

  isFavorite(projectId: number): boolean {
    return this.favorites().includes(projectId);
  }

  toggle(projectId: number): void {

    if (this.isFavorite(projectId)) {

      // Retirer le projet des favoris
      this.favorites.update(favorites =>
        favorites.filter(id => id !== projectId)
      );

      // Appeler NotificationService
      this.notificationService.show(
        'Projet retiré des favoris',
        'info'
      );

    } else {

      // Ajouter le projet aux favoris
      this.favorites.update(favorites => [
        ...favorites,
        projectId
      ]);

      // Appeler NotificationService
      this.notificationService.show(
        'Projet ajouté aux favoris',
        'success'
      );
    }
  }
}