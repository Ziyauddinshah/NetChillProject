import { Cart } from 'src/app/models/allModels.model';

export class GetCart {
  static readonly type = '[Cart] Get';
}

export class AddCart {
  static readonly type = '[Cart] Add Data';
  constructor(public payload: Cart) {}
}

export class DeleteCart {
  static readonly type = '[Cart] delete';
  constructor(public userId: number, public productId: number) {}
}

export class UpdateCart {
  static readonly type = '[Cart] update';
  constructor(public payload: Cart) {}
}

export class GetCartDataByUserId {
  static readonly type = '[Cart] Get';
  constructor(public userId: number) {}
}
