import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() { }

  loginWithEmailAndPassword(email: string, password: string): Observable<any> {
    let http: HttpClient = inject(HttpClient)
    return http.post<any>('dummyUrl', { email: email, password: password })
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('token') ? true : false
  }
}
