import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError, retry, tap, shareReplay } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:5043/api/users';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl).pipe(
      tap(() => console.log('Fetching users from API...')),
      retry(2), // Retry failed requests up to 2 times
      catchError(this.handleError),
      shareReplay(1) // Cache the result for multiple subscribers
    );
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`).pipe(
      tap(user => console.log(`Fetching user with ID: ${id}`)),
      catchError(this.handleError)
    );
  }

  createUser(user: { name: string; email: string }): Observable<User> {
    return this.http.post<User>(this.apiUrl, user).pipe(
      tap(newUser => console.log('User created successfully:', newUser)),
      catchError(this.handleError)
    );
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${user.id}`, user).pipe(
      tap(updatedUser => console.log('User updated successfully:', updatedUser)),
      catchError(this.handleError)
    );
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => console.log(`User with ID ${id} deleted successfully`)),
      catchError(this.handleError)
    );
  }

  // Centralized error handling
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An error occurred';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Client Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Server Error: ${error.status} - ${error.message}`;
    }
    
    console.error('API Error:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
} 