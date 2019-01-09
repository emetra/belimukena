import { AddressPage } from './../address/address';
import { Component, NgZone } from '@angular/core';
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



  constructor(public navCtrl: NavController,public storage: Storage,public zone: NgZone, public navParams: NavParams,public cartService: CartServiceProvider,public events: Events) {
    events.subscribe('cart:update', () => {
      this.zone.run(()=>{
      this.getCart();
      });
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
          this.items = result.items[1];
          console.log(this.items);
        });
    });
  }

  editCart(index){
    this.storage.get('api_key').then(apiToken => {
      let data = {
        apiToken: apiToken,
        item_index: index
      };

      this.cartService.updateQty(data)
        .subscribe(result => {
        });
    });
  }

  removeCart(index){
    this.storage.get('api_key').then(apiToken => {
      let data = {
        apiToken: apiToken,
        item_index: index
      };

      this.cartService.removeCart(data)
        .subscribe(result => {
        });
    });
  }

  address(){
    this.navCtrl.push(AddressPage);
  }
}
