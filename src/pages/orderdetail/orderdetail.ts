import { Component } from '@angular/core';
import {NavController, NavParams, ToastController} from 'ionic-angular';
import {OrderServiceProvider} from "../../providers/order-service/order-service";
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-orderdetail',
  templateUrl: 'orderdetail.html',
})
export class OrderdetailPage {

  product : any;
  today = new Date();

  constructor(public navCtrl: NavController, public navParams: NavParams,public toastCtrl: ToastController,
              public storage: Storage,public orderService: OrderServiceProvider) {
  }

  ionViewDidLoad() {
    this.product = this.navParams.get('product');

    console.log(this.product);
  }

  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'bot'
    });

    toast.present();
  }

  confirmationPayment() {
    console.log('test');
      this.storage.get('api_key').then(apiToken => {
        let data = {
          apiToken: apiToken,
          invoice_number: this.product.invoice_number,
          bank_id: "1",
          cust_bank: "test",
          cust_bank_name:"test",
          payment_amount: "1000",
          payment_date: this.today,
        };

        this.orderService.paymentConfirmation(data)
          .subscribe(result => {
            this.presentToast("Konfirmasi Sukses");
          });
      });
  }


}
