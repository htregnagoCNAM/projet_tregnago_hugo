import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();
  currentLogin: string = '';

  updateLoginStatus(isLoggedIn: boolean, login: string = '') {
    this.isLoggedInSubject.next(isLoggedIn);
    if (isLoggedIn) {
      this.currentLogin = login;
    } else {
      this.currentLogin = '';
    }
  }
}
