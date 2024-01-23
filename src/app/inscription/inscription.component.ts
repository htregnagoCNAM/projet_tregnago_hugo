import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Client } from '../models/client';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})
export class InscriptionComponent {
  nouveauClient: Client = new Client();
  inscriptionReussie: boolean = false;
  erreurInscription: string = '';

  constructor(private apiService: ApiService) { }

  inscription() {
    this.apiService.inscriptionClient(this.nouveauClient).subscribe(
      (resultat) => {
        this.inscriptionReussie = true;
        this.erreurInscription = '';
      },
      (error) => {
        this.erreurInscription = 'Échec de l\'inscription. Veuillez réessayer.';
        this.inscriptionReussie = false;
        console.error('Erreur lors de l\'inscription', error);
      }
    );
  }
}
