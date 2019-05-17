import { ProfilePage } from './../pages/profile/profile';
import {Component, NgZone, ViewChild} from '@angular/core';
import {AlertController, Events, Nav, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { CategoryPage } from "../pages/category/category";
import { OrderstatusPage } from '../pages/orderstatus/orderstatus';
import { Storage } from '@ionic/storage';
import { HomePage } from "../pages/home/home";
import {LoginPage} from "../pages/login/login";
import {RegisterPage} from "../pages/register/register";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild("content") nav:Nav;
  rootPage:any = TabsPage;
  statuslogin : any;
  pages : Array<{
    title : string,
    component : any
  }>;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,public zone: NgZone,public alertCtrl: AlertController, public storage: Storage, public events: Events) {
    this.pages = [
      { title: 'Home', component: HomePage},
      { title: 'Category', component: CategoryPage}
    ];
    events.subscribe('login', () => {
      this.zone.run(()=>{
        this.statuslogin = "loggedin";
      });
    });
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.show();
      statusBar.backgroundColorByHexString("#faafc8");
      splashScreen.hide();
      this.storage.get('api_key').then(apiToken => {
        if(apiToken){
          this.statuslogin = "loggedin";
        };
      });
    });
  }

  logout(){
      let alert = this.alertCtrl.create({
        title: 'Konfirmasi',
        message: 'Apakah anda yakin ingin Logout?',
        buttons: [
          {
            text: 'Tidak',
            role: 'cancel',
            handler: () => {
            }
          },
          {
            text: 'Ya',
            handler: () => {
              this.storage.clear();
              this.statuslogin = null;
              this.nav.setRoot(HomePage);
            }
          }
        ]
      });
      alert.present();
  }

  openPage(page) {
    if(page == 'profile') {
      this.nav.push(ProfilePage);
    }
    else if(page == 'orderstatus'){
      this.nav.push(OrderstatusPage);
    }
    else if(page == 'login'){
      this.nav.push(LoginPage);
    }
    else if(page == 'register'){
      this.nav.push(RegisterPage);
    }
  }
  open(pages)
  {
    this.nav.push(pages.component);
  }
}
