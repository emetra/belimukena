import { ProfilePage } from './../pages/profile/profile';
import { CheckoutPage } from './../pages/checkout/checkout';
import { DeliveryPage } from './../pages/delivery/delivery';
import { AddressPage } from './../pages/address/address';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { IonicStorageModule } from '@ionic/storage';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {NavbarPage} from "../pages/navbar/navbar";
import {CartPage} from "../pages/cart/cart";
import {OtherPage} from "../pages/other/other";
import {CategoryPage} from "../pages/category/category";
import {ProductPage} from "../pages/product/product";
import {ProductdetailPage} from "../pages/productdetail/productdetail";
import {BestsellerPage} from "../pages/bestseller/bestseller";
import { ApiServiceProvider } from '../providers/api-service/api-service';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { ProductServiceProvider } from '../providers/product-service/product-service';
import { OrderstatusPage } from '../pages/orderstatus/orderstatus';
import { HttpModule } from '@angular/http';
import { SubcategoryPage } from '../pages/subcategory/subcategory';
import { LoginPage } from '../pages/login/login';
import { CartServiceProvider } from '../providers/cart-service/cart-service';
import { CheckoutServiceProvider } from '../providers/checkout-service/checkout-service';
import { ProfileServiceProvider } from '../providers/profile-service/profile-service';
import { OrderServiceProvider } from '../providers/order-service/order-service';
import { OrderconfirmationPage } from '../pages/orderconfirmation/orderconfirmation';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    NavbarPage,
    CartPage,
    OtherPage,
    CategoryPage,
    ContactPage,
    ProductPage,
    ProductdetailPage,
    BestsellerPage,
    OrderstatusPage,
    SubcategoryPage,
    LoginPage,
    AddressPage,
    DeliveryPage,
    CheckoutPage,
    ProfilePage,
    OrderconfirmationPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{
      tabsHideOnSubPages: true
    }),
    HttpModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    NavbarPage,
    CartPage,
    OtherPage,
    CategoryPage,
    ContactPage,
    ProductPage,
    ProductdetailPage,
    BestsellerPage,
    OrderstatusPage,
    SubcategoryPage,
    LoginPage,
    AddressPage,
    DeliveryPage,
    CheckoutPage,
    ProfilePage,
    OrderconfirmationPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApiServiceProvider,
    AuthServiceProvider,
    ProductServiceProvider,
    CartServiceProvider,
    CheckoutServiceProvider,
    ProfileServiceProvider,
    OrderServiceProvider
  ]
})
export class AppModule {}
