import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import {ProductdetailPage} from "../productdetail/productdetail";
import { ProductServiceProvider } from '../../providers/product-service/product-service';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login';
import { CartServiceProvider } from '../../providers/cart-service/cart-service';

/**
 * Generated class for the ProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-product',
  templateUrl: 'product.html',
})
export class ProductPage {

  item : any;
  items : any;
  page = 1;
  constructor(public navCtrl: NavController, public navParams: NavParams
    , public productService: ProductServiceProvider,public storage: Storage,
    public cartService: CartServiceProvider,public events : Events) {
  }


  ionViewDidLoad() {
    this.item = this.navParams.get("items");
    console.log(this.item);
    this.getProduct();
  }

  getProduct() {
    if(this.item == null)
    {
      this.productService.getProducts(this.page).subscribe(res => {
        this.items = res.data;
      })
    }
    else{
      this.productService.getproductsByCategories(this.item).subscribe(res => {
        this.items = res.data;
      })
    }
  }

  addToCart(id){
    console.log(id);
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

  doDetailProducts(item) {
    this.navCtrl.push(ProductdetailPage,{items: item});
  }
}
