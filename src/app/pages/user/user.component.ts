import { HttpClient, HttpErrorResponse, HttpHeaders, HttpStatusCode } from '@angular/common/http';
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
        }
      });
  }
}
