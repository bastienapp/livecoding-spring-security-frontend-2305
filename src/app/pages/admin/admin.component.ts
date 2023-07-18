import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  content: string = "Chargement...";

  constructor(private authService: AuthService) { }

  ngOnInit(): void {

    this.authService
      .adminAccess()
      .subscribe({
        next: (response) => {
          this.content = response;
        }
      });
  }
}
