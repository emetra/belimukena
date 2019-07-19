import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {ManualpaymentPage} from "../manualpayment/manualpayment";
import {VapaymentPage} from "../vapayment/vapayment";
import {CartServiceProvider} from "../../providers/cart-service/cart-service";
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {

  total: any;

  constructor(public navCtrl: NavController,public cartService: CartServiceProvider,public storage: Storage, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.getCart();
    console.log('ionViewDidLoad PaymentPage');
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

  manual(){
    this.navCtrl.push(ManualpaymentPage)
  }
  va(){
    this.navCtrl.push(VapaymentPage)
  }
}
