import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthApiService } from 'src/app/services/auth-api.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  content: string = "Chargement...";

  constructor(private authService: AuthApiService) { }

  ngOnInit(): void {

    this.authService
      .adminAccess()
      .subscribe({
        next: (response) => {
          this.content = response;
        },
        error: (error: HttpErrorResponse) => {
          switch (error.status) {
            case HttpStatusCode.Unauthorized:
              // TODO rediriger vers la page de login
              this.content = 'Identifiants incorrects';
              break;
            case HttpStatusCode.Forbidden:
              this.content = "Vous n'avez pas le droit d'afficher cette page";
              break;
            default:
              this.content = "Une erreur est survenue";
          }
        }
      });
  }
}
