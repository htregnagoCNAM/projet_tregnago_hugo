import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Client } from './models/client';
import { Produit } from './models/produit';
import { environment } from '../environments/environment';

@Injectable()
export class ApiService {
  constructor(private http: HttpClient) {}

  public loginClient(login: string, password: string): Observable<Client> {
    let data: String;
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    };
    data = 'login=' + login + '&password=' + password;
    return this.http.post<Client>(
      environment.backendLoginClient,
      data,
      httpOptions
    );
  }

  public inscriptionClient(nouveauClient: Client): Observable<any> {
    console.log('Données d\'inscription envoyées :', nouveauClient);
    // Vous pouvez ajuster le type de retour (Observable<any>) en fonction de la structure de votre réponse du backend
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded', // Utilisation de JSON pour l'inscription
      }),
    };

    let data: String;
    data = 'nom=' + nouveauClient.nom +
    '&prenom=' + nouveauClient.prenom +
    '&adresse=' + nouveauClient.adresse +
    '&codePostal=' + nouveauClient.codePostal +
    '&ville=' + nouveauClient.ville +
    '&email=' + nouveauClient.email +
    '&sexe=' + nouveauClient.sexe +
    '&login=' + nouveauClient.login +
    '&password=' + nouveauClient.password +
    '&telephone=' + nouveauClient.telephone;

    return this.http.post<any>(
      environment.backendInscriptionClient,
      data,
      httpOptions
    );
  }

  public getProduits(filtre: string): Observable<any> {
    const url = filtre ? `${environment.backendSearchCatalogue}${filtre}` : `${environment.backendFullCatalogue}`;
    return this.http.get<Produit[]>(url);
  }

}
