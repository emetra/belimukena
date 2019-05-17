import { Component } from '@angular/core';
import {AlertController, NavController, NavParams, LoadingController, Events} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { TabsPage } from '../tabs/tabs';
import {RegisterPage} from "../register/register";
import {ResetpasswordPage} from "../resetpassword/resetpassword";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  login = {
    email : "",
    password : ""
  };

  constructor(public navCtrl: NavController, public navParams: NavParams,public events: Events,
    public  alertCtrl: AlertController,public storage: Storage,public loadingCtrl: LoadingController
  ,public loginService: AuthServiceProvider) {
  }

  ionViewDidLoad() {
  }

  isAuthenticated() {
    this.storage.get('user_id').then(userid => {
      if(userid != null) {
        this.navCtrl.setRoot(TabsPage);
      }
    });
  }

  doLogin() {
    console.log(this.login);
    let loader = this.loadingCtrl.create({
      content: "Mohon menunggu...",
    });
    loader.present();

    this.loginService.login(this.login)
    .subscribe(result => {
      loader.dismiss();
        this.storage.set('user_id',result.data.user_id);
        this.storage.set('role_id',result.data.role_id);
        this.storage.set('api_key',result.api_token);
        this.storage.set('email', result.data.email);
        this.storage.set('role', result.data.role);
        this.events.publish('login',{});
        this.navCtrl.setRoot(TabsPage);
   }, err => {
     loader.dismiss();
     this.presentAlert("maaf email atau password salah");
   });
  }
  resetPassword(){
    this.navCtrl.push(ResetpasswordPage);
  }
  register(){
    this.navCtrl.push(RegisterPage);
  }

  presentAlert(message) {
    let alert = this.alertCtrl.create({
      title: '',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

}
