import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  content: string = "Chargement...";

  constructor(private authService: AuthService) { }

  ngOnInit(): void {

    this.authService
      .userAccess()
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
