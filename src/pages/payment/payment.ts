import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ManualpaymentPage} from "../manualpayment/manualpayment";
import {VapaymentPage} from "../vapayment/vapayment";

@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentPage');
  }

  manual(){
    this.navCtrl.push(ManualpaymentPage)
  }
  va(){
    this.navCtrl.push(VapaymentPage)
  }
}
