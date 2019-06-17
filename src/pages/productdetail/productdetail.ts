import { CartServiceProvider } from './../../providers/cart-service/cart-service';
import { Component } from '@angular/core';
import {NavController, NavParams, Events, ToastController} from 'ionic-angular';
import { ProductServiceProvider } from '../../providers/product-service/product-service';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login';
import {CartPage} from "../cart/cart";

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
    ,public storage: Storage,public productService : ProductServiceProvider,public events : Events,public toastCtrl: ToastController) {
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
        this.presentToast("Harap Login terlebih dahulu");
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
            this.presentToast("Produk berhasil masuk keranjang");
            this.events.publish('cart:update',{});
            this.events.publish('cart:added',{});
          });
        });
      }
    });
  }
  gotoCart(){
    this.navCtrl.push(CartPage);
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
