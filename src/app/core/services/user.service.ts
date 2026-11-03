import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap, map, catchError, finalize, throwError } from 'rxjs';

import { User } from '../../features/users/models/user.model';
import { USERS } from '../../features/users/data/users.data';

@Injectable({ providedIn: 'root' })
export class UserService {
   private apiUrl = 'http://localhost:3000/users';

   loading = signal(false);
   error = signal<string | null>(null);

   id = Math.random();

   constructor(private http: HttpClient) {
      console.log('UserService créé :', this.id);
   }
  getUsers(): Observable<User[]> {
    this.loading.set(true);
    this.error.set(null);

    return this.http.get<User[]>(this.apiUrl).pipe(
      map(users =>
        users.map(user => ({
          ...user,
          id: Number(user.id)
        }))
      ),
      tap(users => console.log('Utilisateurs récupérés :', users)),
      catchError(err => {
        this.error.set('Erreur lors du chargement des utilisateurs.');
        return throwError(() => err);
      }),
      finalize(() => this.loading.set(false))
    );
  }
   getUserById(id: number): Observable<User | undefined> {
    return this.http.get<User>(`${this.apiUrl}/${id}`).pipe(
      catchError(err => {
        if (err.status === 404) {
          return of(undefined);
        }
        return throwError(() => err);
      })
    );
  }
}
