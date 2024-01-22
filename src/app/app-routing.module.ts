import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { PanierComponent } from './panier/panier.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'inscription', component: InscriptionComponent },
  { path: 'catalogue', component: CatalogueComponent },
  { path: 'panier', component: PanierComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
