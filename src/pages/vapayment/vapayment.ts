import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import {NavController, NavParams, ToastController} from 'ionic-angular';
import {OrderServiceProvider} from "../../providers/order-service/order-service";
import {CheckoutServiceProvider} from "../../providers/checkout-service/checkout-service";
import {SuccessPage} from "../success/success";

@Component({
  selector: 'page-vapayment',
  templateUrl: 'vapayment.html',
})
export class VapaymentPage {
  invoice_number: any;
  checkout={};
  items: any;
  bankVa: any;

  constructor(public navCtrl: NavController,public checkoutService: CheckoutServiceProvider, public navParams: NavParams,public toastCtrl: ToastController
    ,public storage: Storage,public orderService: OrderServiceProvider) {
    this.bankVa = navParams.get('bank');
    console.log(this.bankVa);
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


  confirm() {
    this.storage.get('api_key').then(apiToken => {
      let data = {
        apiToken: apiToken
      };
      this.checkoutService.updatePaymentVa(data,this.bankVa)
        .subscribe(result => {
            this.checkoutService.confirmOrder(data)
              .subscribe(result => {
                  this.invoice_number = result.data.invoice_number;
                  this.navCtrl.push(SuccessPage,{
                    invoice_id:this.invoice_number
                  });
                },
                err => {
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
