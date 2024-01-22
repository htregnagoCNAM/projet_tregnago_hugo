import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Client } from './models/client';
import { Produit } from './models/produit';
import { environment } from '../environments/environment';

@Injectable()
export class ApiService {
  constructor(private http: HttpClient) {}

  public getHello(name: string): Observable<any> {
    return this.http.get<any>(environment.backendHello + '/' + name);
  }

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

  public getCatalogue(): Observable<Produit[]> {
    return this.http.get<Produit[]>(environment.backendCatalogue);
  }

  public getSearchCatalogue(filtre: string): Observable<Produit[]> {
    return this.http.get<Produit[]>(`${environment.backendSearchCatalogue}${filtre}`);
  }
}
