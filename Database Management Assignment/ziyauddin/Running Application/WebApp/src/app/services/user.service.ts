import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url: string = 'http://localhost:3000/api/users';
  constructor(private httpClient: HttpClient) {}
  getAllUsers(): Observable<any> {
    const token = localStorage.getItem('jwtToken');
    return this.httpClient.get(`${this.url}/get-all`, {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    });
  }
  login(formData: FormData): Observable<any> {
    return this.httpClient.post(`${this.url}/login`, formData);
  }
  register(formData: FormData): Observable<any> {
    return this.httpClient.post(`${this.url}/register`, formData);
  }
  forgetPassword(formData: FormData): Observable<any> {
    return this.httpClient.post(`${this.url}/forget-password`, formData);
  }
}
