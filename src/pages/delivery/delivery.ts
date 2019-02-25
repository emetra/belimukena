import { CheckoutServiceProvider } from './../../providers/checkout-service/checkout-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {PaymentPage} from "../payment/payment";

/**
 * Generated class for the DeliveryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-delivery',
  templateUrl: 'delivery.html',
})
export class DeliveryPage {
  courrier: any;
  origin: any;
  destination: any;
  est: any = "";
  listcost: any;
  cost = 0;
  district_id : any;
  constructor(public navCtrl: NavController,public checkoutService : CheckoutServiceProvider,
              public navParams: NavParams,public storage: Storage) {
  }

  ionViewDidLoad() {
    this.getCheckout();
    console.log('ionViewDidLoad DeliveryPage');
  }

    getCheckout(){
      this.storage.get('api_key').then(apiToken => {
        let data = {
          apiToken: apiToken
        };
  
        this.checkoutService.getCheckout(data)
          .subscribe(result => {
            this.district_id = result.shipment.district_id;
            this.getCost();
          });
      });
  }

  onChange($event){
    console.log($event);
  }

  getCost(){
    this.storage.get('api_key').then(apiToken => {
      let data = {
        apiToken: apiToken,
        district_id: this.district_id
      };

      this.checkoutService.getCost(data)
        .subscribe(result => {
            this.origin = result.data.origin_details.city_name;
            this.destination = result.data.destination_details.subdistrict_name;
            this.listcost = result.data.results[0].costs;
            console.log(result.data.results[0].costs);
        });
    });
  }
  payment(){
    this.navCtrl.push(PaymentPage);
  }

}
