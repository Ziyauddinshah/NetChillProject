import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Product } from 'src/app/models/allModels.model';
import {
  AddProduct,
  DeleteProduct,
  GetDataByProductId,
  GetDataBySellerId,
  GetOrderHistoryByDateAndUserId,
  GetOrderHistoryByUserId,
  GetProduct,
  PlaceOrder,
  UploadImage,
} from '../actions/product.action';
import { ProductService } from 'src/app/services/product.service';
import { tap } from 'rxjs/operators';
import { CartService } from 'src/app/services/cart.service';

export class ProductStateModel {
  products: Product[] = [];
  productDataByProductId: Product[] = [];
  orderHistoryByUserId: any;
}

@State<ProductStateModel>({
  name: 'products',
  defaults: {
    products: [],
    productDataByProductId: [],
    orderHistoryByUserId: [],
  },
})
@Injectable()
export class ProductState {
  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}
  //selectors has logic to get state data

  //Get Product list from state
  @Selector()
  static getProductsList(state: ProductStateModel) {
    return state.products;
  }

  @Selector()
  static getDataByProductId(state: ProductStateModel) {
    return state.productDataByProductId;
  }

  @Selector()
  static getOrderHistoryByUserId(state: ProductStateModel) {
    return state.orderHistoryByUserId;
  }

  @Action(GetProduct)
  getProducts({ getState, setState }: StateContext<ProductStateModel>) {
    // console.log('Product State action');
    return this.productService.getAllProducts().pipe(
      tap((res) => {
        const state = getState();
        setState({
          ...state,
          products: res,
        });
      })
    );
  }

  @Action(AddProduct)
  addProduct(
    { getState, patchState }: StateContext<ProductStateModel>,
    { payload }: AddProduct
  ) {
    return this.productService.addProduct(payload).pipe(
      tap((res: Product) => {
        console.log('state add product response from server ', res);
        const state = getState();
        patchState({ products: [...state.products, res] });
      })
    );
  }

  @Action(DeleteProduct)
  DeleteProduct(
    { getState, setState }: StateContext<ProductStateModel>,
    { id }: DeleteProduct
  ) {
    return this.productService.deleteProduct(id).pipe(
      tap((res) => {
        const state = getState();
        const filteredProducts = state.products.filter(
          (product) => product.Id !== id
        );
        setState({ ...state, products: filteredProducts });
      })
    );
  }

  @Action(PlaceOrder)
  placeOrder(
    { getState, setState }: StateContext<ProductStateModel>,
    { productId, userId }: PlaceOrder
  ) {
    return this.productService.orderProduct(userId, productId).pipe(
      tap((res) => {
        console.log(res);
        const state = getState();
        setState({ ...state, products: state.products });
      })
    );
  }

  @Action(GetDataByProductId)
  getDataByProductId(
    { getState, setState }: StateContext<ProductStateModel>,
    { productId, userId }: PlaceOrder
  ) {
    return this.productService.getDataByProductId(productId).pipe(
      tap((res) => {
        console.log(res);
        const state = getState();
        setState({ ...state, productDataByProductId: res });
      })
    );
  }

  @Action(GetOrderHistoryByUserId)
  getOrderHistoryByUserId(
    { getState, setState }: StateContext<ProductStateModel>,
    { userId }: GetOrderHistoryByUserId
  ) {
    return this.productService.getOrderHistoryByUserId(userId).pipe(
      tap((res) => {
        const state = getState();
        setState({ ...state, orderHistoryByUserId: res });
      })
    );
  }

  @Action(GetOrderHistoryByDateAndUserId)
  getOrderHistoryByDateAndUserId(
    { getState, setState }: StateContext<ProductStateModel>,
    { userId, date }: GetOrderHistoryByDateAndUserId
  ) {
    return this.productService
      .getOrderHistoryByDateAndUserId(userId, date)
      .pipe(
        tap((res) => {
          console.log(res);
          const state = getState();
          setState({ ...state, orderHistoryByUserId: res });
        })
      );
  }

  @Action(UploadImage)
  uploadImage(
    { getState }: StateContext<ProductStateModel>,
    { formData }: UploadImage
  ) {
    return this.productService.uploadImage(formData).pipe(
      tap((res) => {
        console.log('server response after uploading image ', res);
      })
    );
  }

  @Action(GetDataBySellerId)
  getProductDataBySellerId(
    { getState, setState }: StateContext<ProductStateModel>,
    { sellerId }: GetDataBySellerId
  ) {
    return this.productService.getProductDataBySellerId(sellerId).pipe(
      tap((res: Product[]) => {
        const state = getState();
        setState({
          ...state,
          products: res,
        });
      })
    );
  }
}
