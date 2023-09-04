import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/allModels.model';
import { AuthService } from 'src/app/services/auth.service';
import {
  DeleteCart,
  GetCartDataByUserId,
} from 'src/app/store/actions/cart.action';
import {
  GetDataByProductId,
  PlaceOrder,
} from 'src/app/store/actions/product.action';
import { CartState } from 'src/app/store/state/cart.state';
import { ProductState } from 'src/app/store/state/product.state';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  providers: [DatePipe],
})
export class CheckoutComponent implements OnInit {
  userId: number = 0;
  productId: number = 0;
  cartData: any;
  productData: any;
  totalPrice: number = 0;
  totalDiscount: number = 0;

  @Select(ProductState.getDataByProductId) dataByProductId$:
    | Observable<Product[]>
    | undefined;

  constructor(
    private authService: AuthService,
    private store: Store,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.productId = parseInt(params['productId']);
    });
    if (this.isLoggedIn()) {
      this.getDataByProductId();
    }
  }

  getDataByProductId() {
    this.userId = this.authService.loggedInUserId();
    this.store.dispatch(new GetDataByProductId(this.productId));
    this.dataByProductId$?.subscribe((res) => {
      if (res != null) {
        this.productData = res;
        this.productData = this.productData.filter(
          (item: { Id: number }) => item.Id === this.productId
        );
        this.totalDiscount = 0;
        this.totalPrice = 0;
        for (let index = 0; index < this.productData.length; index++) {
          const element = this.productData[index];
          this.totalPrice += element.ProductPrice;
          this.totalDiscount += element.ProductDiscount;
        }
      }
    });
  }

  deleteItem(productId: number) {
    if (this.authService.isLoggedIn()) {
      this.userId = this.authService.loggedInUserId();
      this.store.dispatch(new DeleteCart(this.userId, productId));
    }
  }

  placeOrder() {
    const userId = this.loggedInUserId();
    console.log(userId, this.productId);
    this.store.dispatch(new PlaceOrder(userId, this.productId));
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  loggedInUserId() {
    return this.authService.loggedInUserId();
  }
}
