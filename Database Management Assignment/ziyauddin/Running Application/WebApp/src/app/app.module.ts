import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
// import { AboutComponent } from './components/about/about.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { UserService } from './services/user.service';
import { ProductService } from './services/product.service';
import { CheckoutComponent } from './components/checkout/checkout.component';

// Ngxs
import { NgxsModule } from '@ngxs/store';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { ProductState } from './store/state/product.state';
import { AddProductComponent } from './components/add-product/add-product.component';
import { CartState } from './store/state/cart.state';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { CartComponent } from './components/cart/cart.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { NotificationService } from './services/notification.service';
import { CartService } from './services/cart.service';
import { NotificationComponent } from './components/notification/notification.component';

// FCM

import { AngularFireMessagingModule } from '@angular/fire/compat/messaging';
// import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';
import { AsyncPipe } from '../../node_modules/@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    // AboutComponent,
    LoginComponent,
    RegisterComponent,
    PageNotFoundComponent,
    CheckoutComponent,
    AddProductComponent,
    ForgetPasswordComponent,
    CartComponent,
    OrderHistoryComponent,
    NotificationComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,

    //Ngxs
    NgxsModule.forRoot([ProductState, CartState]),
    NgxsLoggerPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(),

    // Firebase cloud messaging
    AngularFireAuthModule,
    AngularFireMessagingModule,
    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [
    UserService,
    ProductService,
    CartService,
    NotificationService,
    AsyncPipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
