
import { Injectable, signal } from '@angular/core';

export type NotificationType = 'success' | 'error' | 'info';

export interface Notification {
  message: string;
  type: NotificationType;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  notification = signal<Notification | null>(null);

  private timer?: ReturnType<typeof setTimeout>;

  // Afficher une notification
  show(message: string, type: NotificationType = 'success'): void {
    this.notification.set({ message, type });

    clearTimeout(this.timer);

    this.timer = setTimeout(() => {
      this.notification.set(null);
    }, 3000);
  }

  // Masquer la notification
  clear(): void {
    this.notification.set(null);
    clearTimeout(this.timer);
  }
}
