import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/allModels.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  url: string = 'http://localhost:3000/inventory';
  constructor(private httpClient: HttpClient) {}

  getAllProducts() {
    return this.httpClient.get<Product[]>(`${this.url}/get-all`);
  }

  addProduct(formData: Product) {
    return this.httpClient.post<Product>(`${this.url}/add`, formData);
  }

  deleteProduct(productId: number) {
    return this.httpClient.delete(`${this.url}/delete/${productId}`);
  }

  orderProduct(userId: number, productId: number) {
    const formData = {
      userId: userId,
      productId: productId,
    };
    return this.httpClient.post(`${this.url}/order-product`, formData);
  }

  getDataByProductId(productId: number) {
    return this.httpClient.get<Product[]>(`${this.url}/data/${productId}`);
  }

  getAllOrderHistory(): Observable<any> {
    return this.httpClient.get(`${this.url}/get-all-order-history`);
  }

  getOrderHistoryByDateAndUserId(userId: number, date: string) {
    const formData = {
      date: date,
      userId: userId,
    };
    return this.httpClient.post(
      `${this.url}/get-order-history-by-date`,
      formData
    );
  }

  getOrderHistoryByUserId(userId: number) {
    return this.httpClient.get(`${this.url}/get-all-order-history/${userId}`);
  }

  uploadImage(formData: FormData) {
    return this.httpClient.post(`${this.url}/upload`, formData);
  }

  getProductDataBySellerId(sellerId: number) {
    return this.httpClient.get<Product[]>(
      `${this.url}/data/seller/${sellerId}`
    );
  }
}
