// catalogue.component.ts

import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { PanierService } from '../panier.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss'],
})
export class CatalogueComponent implements OnInit {
  produits: any[] = [];
  filtre: string = '';

  constructor(private apiService: ApiService,
    private panierService: PanierService,
    private router: Router,
    private route: ActivatedRoute) {}

  private filtreSubject = new Subject<string>();

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const filtre = params['filtre'] || '';
      this.getProduits(filtre);
    });

    this.filtreSubject
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe((filtre) => {
        this.updateRoute(filtre);
      });

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.route.queryParams.subscribe((params) => {
          const filtre = params['filtre'] || '';
          this.getProduits(filtre);
        });
      }
    });
  }

  updateRoute(filtre: string) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { filtre: filtre },
      queryParamsHandling: 'merge',
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
