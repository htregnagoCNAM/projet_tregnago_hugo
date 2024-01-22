import { Component } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  login: string = '';
  password: string = '';

  nom: string = '';
  prenom: string = '';
  cnx: boolean = false;

  constructor(private apiService: ApiService) {
  }

  connexion() {
    this.apiService.loginClient(this.login, this.password).subscribe((c) => {
      this.nom = c.nom;
      this.prenom = c.prenom;
      this.cnx = true;
    });
  }
}
