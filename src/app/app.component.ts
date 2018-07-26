import { Component , ViewChild } from '@angular/core';
import { Nav , Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import {CategoryPage} from "../pages/category/category";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild("content") nav:Nav;
  rootPage:any = TabsPage;
  pages : Array<{
    title : string,
    component : any
  }>;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen ) {
    this.pages = [
      { title: 'Home', component: TabsPage},
      { title: 'Category', component: CategoryPage}
    ];
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.show();
      statusBar.backgroundColorByHexString("#FFC0CB");
      splashScreen.hide();
    });
  }

  open(pages)
  {
    this.nav.push(pages.component);
  }
}
