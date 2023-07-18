import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthResponse } from './models/AuthResponse.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    const formData = {
      email: email,
      password: password,
    }
    return this.http
      .post<AuthResponse>(`${environment.baseApiUrl}/api/auth/login`, formData);
  }

  userAccess() {
    return this.http
      .get(
        `${environment.baseApiUrl}/user`,
        { responseType: 'text' }
      )
  }

  adminAccess() {
    return this.http
      .get(
        `${environment.baseApiUrl}/admin`,
        { responseType: 'text' }
      )
  }
}
