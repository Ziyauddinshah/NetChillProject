import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { Product } from 'src/app/models/allModels.model';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';
import { AddProduct, UploadImage } from 'src/app/store/actions/product.action';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent {
  formData: FormGroup;
  dataAdded: boolean = false;
  isLoggedIn: boolean = false;
  isLoggeInAsBuyer: boolean = false;
  sellerId: number = 0;
  fileName: string = '';
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private store: Store,
    private httpClient: HttpClient,
    private productService: ProductService
  ) {
    this.formData = this.formBuilder.group({
      id: [''],
      productName: ['', [Validators.required]],
      productPrice: ['', [Validators.required]],
      productDiscount: ['', [Validators.required]],
      productImage: ['', [Validators.required]],
    });
    this.isLoggedIn = this.authService.isLoggedIn();
    this.isLoggeInAsBuyer = this.authService.asBuyer();
    this.sellerId = this.authService.loggedInUserId();
  }

  onFileSelected(event: any) {
    this.fileName = event.target.files[0].name;
    const formData = new FormData();
    if (event.target.files[0]) {
      formData.append('file', event.target.files[0]);
    }
    this.store
      .dispatch(new UploadImage(formData))
      .subscribe((res) => console.log(res));
  }
  onAddRecord() {
    if (this.formData.valid) {
      if (this.isLoggedIn && !this.isLoggeInAsBuyer) {
        this.formData.value.productImage = this.fileName;
        this.formData.value.sellerId = this.sellerId;
        const productFormData: Product = this.formData.value;
        this.store
          .dispatch(new AddProduct(productFormData))
          .subscribe((res) => {
            if (res.products.products.length > 0) {
              this.dataAdded = true;
            }
          });
        this.onClear();
      } else {
        alert('user is not logged as seller');
      }
    }
  }
  onClear() {
    this.formData.reset();
  }
}
