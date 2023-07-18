import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
  HttpStatusCode
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  constructor(
    private toastr: ToastrService,
    private router: Router
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('auth_token');
    if (token) {
      request = request.clone({
        setHeaders: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next
      .handle(request)
      .pipe(
        tap({
          next: (response) => {
            if (response instanceof HttpResponse) {
              // possibilité d'ajouter de la logique ici
            }
          }, error: (error) => {
            if (error instanceof HttpErrorResponse) {
              switch (error.status) {
                case HttpStatusCode.Unauthorized:
                  if (!request.url.includes('/api/auth/login')) {
                    this.toastr.error("Merci de vous connecter");
                    // supprimer le token
                    localStorage.removeItem('auth_token');
                    // rediriger vers la page de login
                    this.router.navigate([""]);
                  } else {
                    this.toastr.error("Identifiants incorrects");
                  }
                  break;
                case HttpStatusCode.Forbidden:
                  this.toastr.error("Vous n'avez pas le droit d'afficher cette page");
                  this.router.navigate([""]);
                  break;
              }
            }
          }
        })
      );
  }
}
