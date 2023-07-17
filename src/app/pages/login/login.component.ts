import { HttpClient, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthApiService } from 'src/app/services/auth-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  authError: string = '';

  authForm = this.fb.group({
    email: ['user@email.com', [Validators.required, Validators.email]],
    password: ['password', [Validators.required]],
  })

  constructor(
    private fb: FormBuilder,
    private authService: AuthApiService
  ) { }

  onSubmit() {
    const email = this.authForm.value.email || '';
    const password = this.authForm.value.password || '';
    this.authService
      .login(email, password)
      .subscribe(
        {
          next: (response) => {
            const { token, user } = response;
            localStorage.setItem('auth_token', token);
            localStorage.setItem('user', JSON.stringify(user));
            alert("Vous êtes connecté !");
          },
          error: (error: HttpErrorResponse) => {
            if (error.status === HttpStatusCode.Unauthorized) {
              this.authError = "Les identifiants sont incorrects";
            } else {
              this.authError = "Une erreur survenue";
            }
          }
        }
      );
  }
}
