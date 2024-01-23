// catalogue.component.ts

import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { PanierService } from '../panier.service';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss'],
})
export class CatalogueComponent implements OnInit {
  produits: any[] = [];
  filtre: string = '';

  constructor(private apiService: ApiService,
    private router: Router,
    private panierService: PanierService) {}

  private filtreSubject = new Subject<string>();

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Lancez la recherche lorsque la navigation est terminée
        this.getProduits(this.filtre);
      }
    });
  
    this.filtreSubject
      .pipe(
        debounceTime(300), // Attend 300 ms après le dernier événement
        distinctUntilChanged() // N'émet pas la même valeur que la précédente
      )
      .subscribe((filtre) => {
        this.getProduits(this.filtre);
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
  
  ajouterAuPanier(produit: any) {
    this.panierService.ajouterAuPanier(produit);
  }

}
