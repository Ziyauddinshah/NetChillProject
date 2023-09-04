import { Component, OnInit } from '@angular/core';
import { flush } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Cart, Product } from 'src/app/models/allModels.model';
import { AuthService } from 'src/app/services/auth.service';
import {
  AddCart,
  GetCart,
  GetCartDataByUserId,
} from 'src/app/store/actions/cart.action';
import {
  DeleteProduct,
  GetDataBySellerId,
  GetProduct,
} from 'src/app/store/actions/product.action';
import { CartState } from 'src/app/store/state/cart.state';
import { ProductState } from 'src/app/store/state/product.state';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  allProductData: any[] = [];
  cartData: any[] | undefined;
  isLoggedIn: boolean = false;
  isLoggedInAsBuyer: boolean = false;
  loggdInUserId: number = 0;
  @Select(ProductState.getProductsList) products$:
    | Observable<Product[]>
    | undefined;

  @Select(CartState.getCartDataByUserId) cartData$:
    | Observable<Product[]>
    | undefined;

  constructor(
    private store: Store,
    private authService: AuthService,
    private route: Router
  ) {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.loggdInUserId = this.authService.loggedInUserId();
    this.isLoggedInAsBuyer = this.authService.asBuyer();
  }
  ngOnInit(): void {
    this.getAllProducts();
    if (this.isLoggedIn) {
      this.getAllCartData();
    }
  }

  getAllProducts() {
    if (this.isLoggedIn && !this.isLoggedInAsBuyer) {
      this.store.dispatch(new GetDataBySellerId(this.loggdInUserId));
      this.products$?.subscribe((res) => {
        this.allProductData = res;
      });
    } else {
      this.store.dispatch(new GetProduct());
      this.products$?.subscribe((res) => {
        this.allProductData = res;
      });
    }
  }

  getAllCartData() {
    const userId = this.loggdInUserId;
    this.store.dispatch(new GetCartDataByUserId(userId));
    this.cartData$?.subscribe((res) => {
      this.cartData = res;
    });
  }

  addToCart(productId: number) {
    const data = localStorage.getItem('Key');
    if (data != null) {
      var data1 = JSON.parse(data);
      const createCartData: Cart = {
        Id: 0,
        ProductId: productId,
        UserId: data1.Id,
      };
      this.store.dispatch(new AddCart(createCartData));
    } else {
      alert('login to add item to cart');
    }
  }

  checkInCart(productId: number) {
    if (this.isLoggedIn) {
      const find = this.cartData?.find(
        (item: { Id: number }) => item.Id === productId
      );
      if (find) {
        return true;
      } else return false;
    } else {
      return false;
    }
  }

  deleteProduct(productId: number) {
    if (this.isLoggedIn && !this.isLoggedInAsBuyer) {
      if (confirm('You want to delete this data?')) {
        this.store.dispatch(new DeleteProduct(productId));
      }
    }
  }
  checkout(productId: number) {
    if (this.isLoggedIn) {
      this.route.navigate(['/checkout', productId]);
    } else {
      alert('login to buy product');
    }
  }
}
