import { Product } from 'src/app/models/allModels.model';

export class GetProduct {
  static readonly type = '[Product] Get';
}

export class AddProduct {
  static readonly type = '[Product] Add Data';
  constructor(public payload: Product) {}
}

export class DeleteProduct {
  static readonly type = '[Product] delete';
  constructor(public id: number) {}
}

export class UpdateProduct {
  static readonly type = '[product] update';
  constructor(public payload: Product) {}
}

export class PlaceOrder {
  static readonly type = '[Order Histroy] order place';
  constructor(public userId: number, public productId: number) {}
}

export class GetDataByProductId {
  static readonly type = '[product] get by product id';
  constructor(public productId: number) {}
}

export class GetOrderHistoryByUserId {
  static readonly type = '[product] get by user id';
  constructor(public userId: number) {}
}

export class GetOrderHistoryByDateAndUserId {
  static readonly type = '[product] get by date and user id';
  constructor(public userId: number, public date: string) {}
}

export class UploadImage {
  static readonly type = 'upload image to server ';
  constructor(public formData: FormData) {}
}
export class GetDataBySellerId {
  static readonly type = '[product] get by seller id';
  constructor(public sellerId: number) {}
}
