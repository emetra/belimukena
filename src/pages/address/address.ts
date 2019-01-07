import { CheckoutServiceProvider } from './../../providers/checkout-service/checkout-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the AddressPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-address',
  templateUrl: 'address.html',
})
export class AddressPage {

  province: any;
  city: any;
  region: any;
  items: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public checkoutService: CheckoutServiceProvider,public storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddressPage');
  }

  getCheckout(){
      this.storage.get('api_key').then(apiToken => {
        let data = {
          apiToken: apiToken
        };
  
        this.checkoutService.getCheckout(data)
          .subscribe(result => {
            console.log(result);
            this.items = result.items;
            console.log(this.items);
          });
      });
  }

}