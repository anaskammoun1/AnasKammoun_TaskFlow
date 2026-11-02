
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'deadline',
  standalone: true
})
export class DeadlinePipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    if (!value) {
      return 'Pas d’échéance';
    }

    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);

    if (!match) {
      return 'Pas d’échéance';
    }

    const year = Number(match[1]);
    const month = Number(match[2]);
    const day = Number(match[3]);

    const deadline = new Date(year, month - 1, day);

    // Vérifier que la date existe réellement
    if (
      deadline.getFullYear() !== year ||
      deadline.getMonth() !== month - 1 ||
      deadline.getDate() !== day
    ) {
      return 'Pas d’échéance';
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const deadlineDay = new Date(year, month - 1, day);
    const diff = Math.round(
      (deadlineDay.getTime() - today.getTime()) /
      (1000 * 60 * 60 * 24)
    );

    if (diff === 0) {
      return 'Aujourd’hui';
    }

    if (diff === 1) {
      return 'Demain';
    }

    if (diff > 1) {
      return `Dans ${diff} jours`;
    }

    const lateDays = Math.abs(diff);

    return lateDays === 1
      ? 'En retard de 1 jour'
      : `En retard de ${lateDays} jours`;
  }
}