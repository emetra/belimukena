import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import {NavController, NavParams, ToastController} from 'ionic-angular';
import {OrderServiceProvider} from "../../providers/order-service/order-service";
import {OrderstatusPage} from "../orderstatus/orderstatus";


/**
 * Generated class for the ConfirmationpaymentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-confirmationpayment',
  templateUrl: 'confirmationpayment.html',
})
export class ConfirmationpaymentPage {
  invoice_number: any;
  bank_id: any;
  item = {};
  constructor(public navCtrl: NavController, public navParams: NavParams,public toastCtrl: ToastController
              ,public storage: Storage,public orderService: OrderServiceProvider) {
    this.item['invoice_number'] = navParams.get('invoice_id');
    this.item['bank_id'] = navParams.get('bank_id');
    this.item['payment_amount'] = navParams.get('payment_amount');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfirmationpaymentPage');
  }

  confirmationPayment() {
    console.log('test');
    this.storage.get('api_key').then(apiToken => {
      let data = {
        apiToken: apiToken,
        item : this.item
      };
      console.log(data);
      this.orderService.paymentConfirmation(data)
        .subscribe(result => {
          this.presentToast("Konfirmasi Sukses");
          this.navCtrl.push(OrderstatusPage);
        }, err => {
          this.presentToast("Tolong lengkapi data");
        });
    });
  }

  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'bot'
    });

    toast.present();
  }
}
