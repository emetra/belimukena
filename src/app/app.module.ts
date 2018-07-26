import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {NavbarPage} from "../pages/navbar/navbar";
import {CartPage} from "../pages/cart/cart";
import {OtherPage} from "../pages/other/other";
import {CategoryPage} from "../pages/category/category";
import {ProductPage} from "../pages/product/product";
import {ProductdetailPage} from "../pages/productdetail/productdetail";
import {BestsellerPage} from "../pages/bestseller/bestseller";

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
    BestsellerPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{
      tabsHideOnSubPages: true
    }),

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
    BestsellerPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
