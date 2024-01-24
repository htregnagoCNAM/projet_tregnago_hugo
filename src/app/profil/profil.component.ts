import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Client } from '../models/client';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {
  profil: Client | null = null;

  constructor(
    private apiService: ApiService,
    private authService: AuthenticationService
  ) { }

  ngOnInit() {
    const currentLogin = this.authService.currentLogin;

    if (currentLogin) {
      this.apiService.getProfil(currentLogin).subscribe(
        (profil) => {
          this.profil = profil;
        },
        (error) => {
          console.error('Erreur lors de la récupération du profil', error);
        }
      );
    }
  }
}
