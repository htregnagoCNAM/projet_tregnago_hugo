// catalogue.component.ts

import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss'],
})
export class CatalogueComponent implements OnInit {
  produits: any[] = [];
  filtre: string = '';

  constructor(private apiService: ApiService) {}
  private filtreSubject = new Subject<string>();
  ngOnInit() {
    this.filtreSubject
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe((filtre) => {
        this.getProduits(filtre); // Passer le filtre ici
      });
  }
  
  getProduits(filtre: string) {
    this.apiService.getProduits(filtre).subscribe(
      (data) => {
        this.produits = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des produits', error);
      }
    );
  }
  
}
