import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import {CheckoutServiceProvider} from "../../providers/checkout-service/checkout-service";
import {SuccessPage} from "../success/success";

@Component({
  selector: 'page-orderconfirmation',
  templateUrl: 'orderconfirmation.html',
})
export class OrderconfirmationPage {

  checkout={};
  items: any;
  invoice_number: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public storage: Storage,public checkoutService: CheckoutServiceProvider) {
  }

  ionViewDidLoad() {
    this.getCheckout();
  }

  getCheckout(){
    this.storage.get('api_key').then(apiToken => {
      let data = {
        apiToken: apiToken
      };

      this.checkoutService.getCheckout(data)
        .subscribe(result => {
          this.checkout['name'] = result.recipient.name;
          this.checkout['phone'] = result.recipient.phone;
          this.checkout['address'] = result.recipient.address;
          this.checkout['postal_code'] = result.recipient.postal_code;
          this.checkout['courier'] = result.shipment.courier;
          this.checkout['charged_weight'] = result.shipment.charged_weight;
          this.checkout['cost'] = result.shipment.cost;
          this.checkout['service_id'] = result.shipment.service_id;
          this.checkout['etd'] = result.shipment.etd;
          this.checkout['subtotal'] = result.payment_details.subtotal;
          this.checkout['shipment_cost'] = result.payment_details.shipment_cost;
          this.checkout['transfer_code'] = result.payment_details.transfer_code;
          this.checkout['payment_cost'] = result.payment_details.payment_cost;
          this.checkout['grand_total'] = result.payment_details.grand_total;
          this.items = result.items;
          console.log(this.checkout);
          console.log(this.items);
        });
    });
  }

  confirm(){
    this.storage.get('api_key').then(apiToken => {
      let data = {
        apiToken: apiToken
      };
      this.checkoutService.confirmOrder(data)
        .subscribe(result => {
            this.invoice_number = result.data.invoice_number;
            this.navCtrl.push(SuccessPage,{
              invoice_id:this.invoice_number
            });
          },
          err => {
          });
    });
  }
}
