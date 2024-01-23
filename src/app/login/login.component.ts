import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Client } from '../models/client';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  login: string = '';
  password: string = '';

  client: Client = new Client();

  cnx: boolean = false;
  erreurConnexion: string = '';

  constructor(private apiService: ApiService,
    private authService: AuthenticationService) { }

  connexion() {
    this.apiService.loginClient(this.login, this.password).subscribe(
      (c) => {
        this.client = c;
        this.cnx = true;
        this.erreurConnexion = '';
        this.authService.updateLoginStatus(true);
      },
      (error) => {
        this.erreurConnexion = 'Échec de la connexion. Veuillez vérifier vos identifiants.';
        this.cnx = false;
        console.error('Erreur lors de la connexion', error);
        this.authService.updateLoginStatus(false);
      }
    );
  }
}
