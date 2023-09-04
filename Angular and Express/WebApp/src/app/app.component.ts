import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private route: Router, public authService: AuthService) {}
  ngOnInit() {}
  loggedIn() {
    return this.authService.isUserLoggedIn();
  }
  logOut() {
    this.authService.logout();
    this.route.navigate(['/home']);
  }
}
