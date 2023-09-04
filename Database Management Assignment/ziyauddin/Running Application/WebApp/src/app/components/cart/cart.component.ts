import { Component, OnDestroy, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { Product } from 'src/app/models/allModels.model';
import { AuthService } from 'src/app/services/auth.service';
import {
  DeleteCart,
  GetCartDataByUserId,
} from 'src/app/store/actions/cart.action';
import { CartState } from 'src/app/store/state/cart.state';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, OnDestroy {
  userId: number = 0;
  isLoggedIn: boolean = false;
  cartData: any;
  totalPrice: number = 0;
  totalDiscount: number = 0;
  cartLoadedSubscription: Subscription | undefined;
  cartDataSubscription: Subscription | undefined;
  @Select(CartState.getCartDataByUserId) cartData$:
    | Observable<Product[]>
    | undefined;

  @Select(CartState.isCartDataLoaded) isCartDataLoaded$:
    | Observable<boolean>
    | undefined;

  constructor(private authService: AuthService, private store: Store) {
    this.userId = this.authService.loggedInUserId();
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  ngOnInit(): void {
    if (this.isLoggedIn) {
      this.getCartDataByUserId();
    }
  }
  getCartDataByUserId() {
    this.cartLoadedSubscription = this.isCartDataLoaded$?.subscribe(
      (isCartLoaded) => {
        if (!isCartLoaded) {
          this.store.dispatch(new GetCartDataByUserId(this.userId));
        }
      }
    );
    this.cartDataSubscription = this.cartData$?.subscribe((res) => {
      if (res != null) {
        this.cartData = res;
        this.totalDiscount = 0;
        this.totalPrice = 0;
        for (let index = 0; index < this.cartData.length; index++) {
          const element = this.cartData[index];
          this.totalPrice += element.ProductPrice;
          this.totalDiscount += element.ProductDiscount;
        }
      }
    });
  }
  deleteCartItem(productId: number) {
    if (this.isLoggedIn) {
      this.store.dispatch(new DeleteCart(this.userId, productId));
    }
  }

  ngOnDestroy(): void {
    this.cartLoadedSubscription?.unsubscribe();
    this.cartDataSubscription?.unsubscribe();
  }
}
