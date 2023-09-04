import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/allModels.model';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { CartState } from 'src/app/store/state/cart.state';
import { ProductState } from 'src/app/store/state/product.state';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  name: string = '';
  cartData: any;
  usersCartSize: number = 0;
  @Select(CartState.getCartDataByUserId) cartData$:
    | Observable<Product[]>
    | undefined;
  constructor(
    private cartService: CartService,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.isLoggedIn();
    this.cartData$?.subscribe((res) => (this.usersCartSize = res.length));
  }
  logout() {
    this.authService.logout();
  }
  isLoggedIn() {
    this.name = this.authService.loggedInUserName();
    return this.authService.isLoggedIn();
  }
  asBuyer() {
    return this.authService.asBuyer();
  }
}
