// panier.component.ts

import { Component, OnInit } from '@angular/core';
import { PanierService } from '../panier.service';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.scss'],
})
export class PanierComponent implements OnInit {
  contenuPanier: any[] = [];
  montantTotal: number = 0;

  constructor(private panierService: PanierService) {}

  ngOnInit() {
    this.miseAJourContenuPanier();
  }

  // Fonction pour mettre à jour le contenu du panier
  miseAJourContenuPanier() {
    this.contenuPanier = this.panierService.getContenuPanier();
    this.montantTotal = this.panierService.getMontantTotal();
  }

  // Fonction pour enlever un produit du panier
  enleverProduit(produit: any) {
    this.panierService.enleverDuPanier(produit);
    this.miseAJourContenuPanier();
  }

  // Fonction pour vider le panier
  viderPanier() {
    this.panierService.viderPanier();
    this.miseAJourContenuPanier();
  }
}
