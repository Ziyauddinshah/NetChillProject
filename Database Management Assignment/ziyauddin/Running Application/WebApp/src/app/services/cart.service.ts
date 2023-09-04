import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cart, Product } from '../models/allModels.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  url: string = 'http://localhost:3000/cart';
  constructor(private httpClient: HttpClient) {}

  addToCart(cartData: Cart) {
    return this.httpClient.post<Product>(`${this.url}/add`, cartData);
  }

  getCartDataByUserId(userId: number) {
    return this.httpClient.get<Product[]>(`${this.url}/data/${userId}`);
  }

  deleteCartDataByProductIdAndUserId(userId: number, productId: number) {
    return this.httpClient.delete(`${this.url}/delete/${productId}/${userId}`);
  }
}
