export interface Product {
  Id: number;
  ProductName: string;
  ProductPrice: number;
  ProductDiscount: number;
  SellerId: number;
  ProductImage: string;
}

export interface Cart {
  Id: number;
  UserId: number;
  ProductId: number;
}
