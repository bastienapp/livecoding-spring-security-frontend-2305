import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthApiService } from 'src/app/auth/auth.service';

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
    private authService: AuthApiService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  onSubmit() {
    const email = this.authForm.value.email || '';
    const password = this.authForm.value.password || '';
    // supprimer un ancien JWT avant de se connecter
    localStorage.removeItem('auth_token');
    this.authService
      .login(email, password)
      .subscribe(
        {
          next: (response) => {
            const { token, user } = response;
            localStorage.setItem('auth_token', token);
            localStorage.setItem('user', JSON.stringify(user));
            this.toastr.success("Vous êtes connecté !");
            this.router.navigate(["/profile"]);
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
