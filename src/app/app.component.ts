import { Component } from '@angular/core';
import { AuthenticationService } from './authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'projet_tregnago_hugo';
  isUserLoggedIn: boolean = false;

  constructor(private authService: AuthenticationService) {}

  ngOnInit() {
    // Abonnez-vous aux changements d'état d'authentification
    this.authService.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isUserLoggedIn = isLoggedIn;
    });
  }
}
