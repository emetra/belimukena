import { Component } from '@angular/core';
import { AlertController, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

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
  login = {};

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public  alertCtrl: AlertController,public storage: Storage,public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  isAuthenticated() {
    this.storage.get('user_id').then(userid => {
      if(userid != null) {
        // tihs.navCtrl.setRoot(TabsPage);
      }
    });
  }

  doLogin() {
    let loader = this.loadingCtrl.create({
      content: "Mohon menunggu...",
    });
    loader.present();

    // this.loginService.login(this.login)
    // .subscribe(result => {
    //   loader.dismiss();
    //   if(result.message == "OK"){
    //     this.storage.set('user_id',result.data.user_id);
    //     this.storage.set('role_id',result.data.role_id);
    //     this.storage.set('api_key',result.data.api_key);
    //     this.storage.set('email', result.data.email);
    //     this.storage.set('role_name', result.data.role_name);
    //     this.navCtrl.setRoot(TabsPage);
    //   }
    //   else{
    //     this.presentAlert(result.message[0]);
    //   }
    // });
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
