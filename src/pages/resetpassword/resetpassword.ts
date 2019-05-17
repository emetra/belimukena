import { Component } from '@angular/core';
import { NavController, NavParams, ToastController} from 'ionic-angular';
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
import {LoginPage} from "../login/login";

@Component({
  selector: 'page-resetpassword',
  templateUrl: 'resetpassword.html',
})
export class ResetpasswordPage {

  user={};

  constructor(public navCtrl: NavController,public toastCtrl: ToastController,public authCtrl: AuthServiceProvider,public navParams: NavParams) {
  }

  ionViewDidLoad() {

  }

  resetPassword(){
    let data = {
      email: this.user['email']
    };
    this.authCtrl.register(data)
      .subscribe(result => {
          this.presentToast(result.message);
          this.navCtrl.push(LoginPage);
        },
        err => {
          console.log(err);
          this.presentToast("terjadi kesalahan");
        });
  }
  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top'
    });

    toast.present();
  }
}
