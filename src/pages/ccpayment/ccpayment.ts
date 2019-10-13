import { Component } from '@angular/core';
import {NavController, NavParams, ToastController} from 'ionic-angular';
import {SuccessPage} from "../success/success";
import {CheckoutServiceProvider} from "../../providers/checkout-service/checkout-service";
import {Storage} from "@ionic/storage";

/**
 * Generated class for the CcpaymentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-ccpayment',
  templateUrl: 'ccpayment.html',
})
export class CcpaymentPage {
  item= {};
  invoice_number:any;
  constructor(public navCtrl: NavController,public checkoutService: CheckoutServiceProvider, public navParams: NavParams,public toastCtrl: ToastController
    ,public storage: Storage) {
    this.item['payment_method'] = 'credit_card'
  }

  ionViewDidLoad() {

  }

  confirm() {
    this.storage.get('api_key').then(apiToken => {
      let data = {
        apiToken: apiToken,
        item: this.item
      };
      this.checkoutService.updateCCPayment(data)
        .subscribe(result => {
            this.checkoutService.confirmOrder(data)
              .subscribe(result => {
                  this.invoice_number = result.data.invoice_number;
                  this.navCtrl.push(SuccessPage,{
                    invoice_id:this.invoice_number
                  });
                },
                err => {
                  this.presentToast("Maaf Terjadi Kesalahan");
                });
          },
          err => {
            this.presentToast("Maaf Terjadi Kesalahan");
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
