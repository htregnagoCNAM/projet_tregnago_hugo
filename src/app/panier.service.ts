// panier.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PanierService {
  private panier: any[] = [];

  // Fonction pour ajouter un produit au panier
  ajouterAuPanier(produit: any) {
    const produitExistant = this.panier.find((p) => p.id === produit.id);

    if (produitExistant) {
      produitExistant.quantite += 1;
    } else {
      this.panier.push({ ...produit, quantite: 1 });
    }
  }

  // Fonction pour récupérer le contenu du panier
  getContenuPanier() {
    return this.panier;
  }

  // Fonction pour calculer le montant total du panier
  getMontantTotal() {
    return this.panier.reduce((total, produit) => total + produit.prix * produit.quantite, 0);
  }

  enleverDuPanier(produit: any) {
    const produitExistant = this.panier.find((p) => p.id === produit.id);

    if (produitExistant) {
      if (produitExistant.quantite > 1) {
        produitExistant.quantite -= 1;
      } else {
        this.panier = this.panier.filter((p) => p.id !== produit.id);
      }
    }
  }

  // Fonction pour vider le panier
  viderPanier() {
    this.panier = [];
  }
}
