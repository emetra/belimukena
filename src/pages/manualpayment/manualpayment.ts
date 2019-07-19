import { Component } from '@angular/core';
import { NavController, NavParams, ToastController} from 'ionic-angular';
import {CheckoutServiceProvider} from "../../providers/checkout-service/checkout-service";
import { Storage } from '@ionic/storage';
import {OrderconfirmationPage} from "../orderconfirmation/orderconfirmation";
import {CartServiceProvider} from "../../providers/cart-service/cart-service";

@Component({
  selector: 'page-manualpayment',
  templateUrl: 'manualpayment.html',
})
export class ManualpaymentPage {
  banks:any;
  bank_id:any;
  total: any;
  constructor(public navCtrl: NavController,public  cartService: CartServiceProvider,public checkoutService: CheckoutServiceProvider, public navParams: NavParams,
              public storage: Storage,public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
      this.getBank();
      this.getCart();
  }

  getCart(){
    this.storage.get('api_key').then(apiToken => {
      let data = {
        apiToken: apiToken
      };

      this.cartService.getCarts(data)
        .subscribe(result => {
          this.total = result.total;
        });
    });
  }

  getBank(){
    this.storage.get('api_key').then(apiToken => {
      let data = {
        apiToken: apiToken
      };

      this.checkoutService.getBanks(data)
        .subscribe(result => {
            this.banks = result.data;
        });
    });
  }
  confirmation(){
    this.storage.get('api_key').then(apiToken => {
      let data = {
        apiToken: apiToken,
        payment_bank_id: this.bank_id,
        payment_method: "manual_transfer"
      };
      this.checkoutService.updatePaymentManual(data)
        .subscribe(result => {

            this.navCtrl.push(OrderconfirmationPage);
          },
          err => {
            this.presentToast("Tolong pilih rekening");
          });
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
