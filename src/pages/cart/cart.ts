import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CartServiceProvider } from '../../providers/cart-service/cart-service';

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

  constructor(public navCtrl: NavController, public navParams: NavParams,public cartService: CartServiceProvider) {
  }

  ionViewDidLoad() {
    this.getCart();
  }

  getCart(){
    this.cartService.getCarts().subscribe(res => {
      this.carts = res;
      this.items = res.item;
      console.log(res);
    console.log(this.carts.item);
    })
  }

}
