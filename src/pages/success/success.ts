import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {HomePage} from "../home/home";
import {Clipboard} from "@ionic-native/clipboard";
import {CheckoutServiceProvider} from "../../providers/checkout-service/checkout-service";
import { Storage } from "@ionic/storage";

@Component({
  selector: 'page-success',
  templateUrl: 'success.html',
})
export class SuccessPage {
  invoice_number : any;
  transaction={};
  payment={};
  payment_gateway={};
  banks : any;
  constructor(public navCtrl: NavController,public checkoutService: CheckoutServiceProvider
              ,public clipboard: Clipboard, public navParams: NavParams,
              public storage: Storage) {
    this.invoice_number = navParams.get('invoice_id');

  }

  ionViewDidLoad() {
    this.getTransactionDetail();
  }

  getTransactionDetail(){
      this.storage.get('api_key').then(apiToken => {
        let data = {
          apiToken: apiToken,
          invoice_number: this.invoice_number
        };

        this.checkoutService.getTransactionDetail(data)
          .subscribe(result => {
            this.transaction = result.data;
            this.payment = result.data.payment;
            this.payment_gateway = result.data.payment['payment_gateway_details'];
            console.log(this.payment_gateway);
            if(this.payment['bank_id'] > 0){
              let item = {
                apiToken: apiToken
              };
              this.checkoutService.getBanks(item)
                .subscribe(result => {
                    this.banks = result.data[this.payment['bank_id'] - 1];
                    console.log(this.banks);
                });
            }
          });
      });
  }
  copy(data){
    this.clipboard.copy(data);
  }


  home(){
    this.navCtrl.setRoot(HomePage);
  }
}
