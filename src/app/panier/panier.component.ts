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

  constructor(private panierService: PanierService) { }

  ngOnInit() {
    this.miseAJourContenuPanier();
  }

  miseAJourContenuPanier() {
    this.contenuPanier = this.panierService.getContenuPanier();
    this.montantTotal = this.panierService.getMontantTotal();
  }

  enleverProduit(produit: any) {
    this.panierService.enleverDuPanier(produit);
    this.miseAJourContenuPanier();
  }

  viderPanier() {
    this.panierService.viderPanier();
    this.miseAJourContenuPanier();
  }
}
