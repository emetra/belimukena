import { Component } from '@angular/core';
import {NavController, NavParams, ToastController} from 'ionic-angular';
import {OrderServiceProvider} from "../../providers/order-service/order-service";
import { Storage } from '@ionic/storage';
import {ConfirmationpaymentPage} from "../confirmationpayment/confirmationpayment";

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
      this.navCtrl.push(ConfirmationpaymentPage,{
        invoice_id:this.product.invoice_number
      });
  }


}
