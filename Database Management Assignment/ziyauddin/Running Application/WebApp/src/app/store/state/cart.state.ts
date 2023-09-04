import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Product } from 'src/app/models/allModels.model';
import {
  AddCart,
  DeleteCart,
  GetCartDataByUserId,
} from '../actions/cart.action';
import { CartService } from 'src/app/services/cart.service';
import { tap } from 'rxjs';

export class CartStateModel {
  cartDataByUserId: Product[] = [];
  isCartLoaded: boolean | undefined;
}

@State<CartStateModel>({
  name: 'carts',
  defaults: {
    cartDataByUserId: [],
    isCartLoaded: false,
  },
})
@Injectable()
export class CartState {
  constructor(private cartService: CartService) {}
  //selectors has logic to get state data

  @Selector()
  static getCartDataByUserId(state: CartStateModel) {
    return state.cartDataByUserId;
  }

  @Selector()
  static isCartDataLoaded(state: CartStateModel) {
    return state.isCartLoaded;
  }

  @Action(AddCart)
  addToCart(
    { getState, patchState }: StateContext<CartStateModel>,
    { payload }: AddCart
  ) {
    return this.cartService.addToCart(payload).pipe(
      tap((res) => {
        const state = getState();
        patchState({ cartDataByUserId: [...state.cartDataByUserId, res] });
      })
    );
  }

  @Action(DeleteCart)
  deleteFromUserCart(
    { getState, setState }: StateContext<CartStateModel>,
    { userId, productId }: DeleteCart
  ) {
    return this.cartService
      .deleteCartDataByProductIdAndUserId(userId, productId)
      .pipe(
        tap((res) => {
          console.log('deleted res ', res);
          const state = getState();
          const filteredProducts = state.cartDataByUserId.filter(
            (product) => product.Id !== productId
          );
          setState({ ...state, cartDataByUserId: filteredProducts });
        })
      );
  }

  @Action(GetCartDataByUserId)
  getCartDataByUserId(
    { getState, setState }: StateContext<CartStateModel>,
    { userId }: GetCartDataByUserId
  ) {
    return this.cartService.getCartDataByUserId(userId).pipe(
      tap((res) => {
        const state = getState();
        setState({
          ...state,
          cartDataByUserId: res,
          isCartLoaded: true,
        });
      })
    );
  }
}
