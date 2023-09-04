import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import {
  GetOrderHistoryByDateAndUserId,
  GetOrderHistoryByUserId,
} from 'src/app/store/actions/product.action';
import { ProductState } from 'src/app/store/state/product.state';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss'],
})
export class OrderHistoryComponent implements OnInit {
  orderHistoryDataByUserId: any;
  orderDataByDate: any;
  @Select(ProductState.getOrderHistoryByUserId) orderHistoryDataByUserId$:
    | Observable<any>
    | undefined;
  constructor(private authService: AuthService, private store: Store) {}

  ngOnInit(): void {
    const userId = this.authService.loggedInUserId();
    this.store.dispatch(new GetOrderHistoryByUserId(userId));
    this.orderHistoryDataByUserId$?.subscribe((res) => {
      this.orderHistoryDataByUserId = res;
      console.log(this.orderHistoryDataByUserId$);
    });
  }

  searchOrderHistoryByDate(inputValue: string) {
    const userId = this.authService.loggedInUserId();
    this.store.dispatch(new GetOrderHistoryByDateAndUserId(userId, inputValue));
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }
}
