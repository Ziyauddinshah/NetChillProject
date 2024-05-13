import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
// import { AboutComponent } from './components/about/about.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { CartComponent } from './components/cart/cart.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { NotificationComponent } from './components/notification/notification.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  // {
  //   path: 'about',
  //   component: AboutComponent,
  // },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: 'checkout/:productId',
    component: CheckoutComponent,
  },
  {
    path: 'forget-password',
    component: ForgetPasswordComponent,
  },
  {
    path: 'order-history',
    component: OrderHistoryComponent,
  },
  {
    path: 'notification',
    component: NotificationComponent,
  },
  { path: 'add-product', component: AddProductComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
