import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import { CartServiceProvider } from '../../providers/cart-service/cart-service';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the CartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  carts : any;
  items : any;

  constructor(public navCtrl: NavController,public storage: Storage, public navParams: NavParams,public cartService: CartServiceProvider,public events: Events) {
    events.subscribe('cart:update', () => {
      this.getCart();
    });
  }

  ionViewDidLoad() {
    this.getCart();
  }

  getCart(){
    this.storage.get('api_key').then(apiToken => {
      let data = {
        apiToken: apiToken
      };

      this.cartService.getCarts(data)
        .subscribe(result => {
          console.log(result);
          this.items = result.item;
          console.log(this.items);
        });
    });
  }

}
