import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpStatusCode
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private toastr: ToastrService) { }

  // middleware
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // TODO ajouter un header pour les routes authentifiées

    // récupérer le JWT
    const token = localStorage.getItem('auth_token');
    // TODO ça peut valoir le coup de valider que le token ne soit pas expiré

    // récupérer l'url de base et vérifier que c'est un appel d'api
    const isApiCall = request.url.startsWith(environment.baseApiUrl);

    if (token && isApiCall) {
      request = request.clone(
        {
          setHeaders: { Authorization: `Bearer ${token}` }
        }
      )
    }

    // récupérer les erreurs lors de l'appel d'API
    return next.handle(request).pipe(
      catchError((e) => {
        switch (e.status) {
          case HttpStatusCode.Unauthorized:
            if (request.url.startsWith(environment.baseApiUrl + '/api/auth/login')) {
              this.toastr.error("Identifiants incorrects");
            } else {
              this.toastr.error("Merci de vous connecter pour accéder à ce contenu");
            }
            break;
          case HttpStatusCode.Forbidden:
            this.toastr.error("Vous n'avez pas les droits nécessaires");
            break;
          default:
            this.toastr.error("Une erreur est survenue");
        }

        const error = e.error?.message || e.statusText;

        return throwError(() => new Error(error));
      })
    );
  }
}
