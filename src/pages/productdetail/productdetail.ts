import { CartServiceProvider } from './../../providers/cart-service/cart-service';
import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import { ProductServiceProvider } from '../../providers/product-service/product-service';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login';

/**
 * Generated class for the ProductdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-productdetail',
  templateUrl: 'productdetail.html',
})
export class ProductdetailPage {
  item: any;
  items: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public cartService : CartServiceProvider
    ,public storage: Storage,public productService : ProductServiceProvider,public events : Events) {
  }
  ionViewDidLoad() {
    this.item = this.navParams.get("items");
    console.log(this.item);
    this.getProductDetail();
  }

  getProductDetail(){
    this.productService.getProductDetail(this.item).subscribe(res => {
      this.items = res.data;
    })
  }
  addToCart(id){
    this.storage.get('user_id').then(userid => {
      if(userid == null) {
        this.navCtrl.push(LoginPage);
      }
      else{
        this.storage.get('api_key').then(apiToken => {
          let data = {
            product_id: id,
            apiToken : apiToken
          }; 
          this.cartService.addtoCart(data).subscribe(res => {
            console.log(res);
            this.events.publish('cart:update',{});
          });
        });
      }
    });
  }
}
