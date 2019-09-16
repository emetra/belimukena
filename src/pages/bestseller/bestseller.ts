import { Component } from '@angular/core';
import {NavController, NavParams, ToastController,Events} from 'ionic-angular';
import {ProductdetailPage} from "../productdetail/productdetail";
import { ProductServiceProvider } from '../../providers/product-service/product-service';
import {LoginPage} from "../login/login";
import { Storage } from '@ionic/storage';
import {CartServiceProvider} from "../../providers/cart-service/cart-service";

/**
 * Generated class for the BestsellerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-bestseller',
  templateUrl: 'bestseller.html',
})
export class BestsellerPage {
  apiToken:any;
  login: boolean = false;

  constructor(public navCtrl: NavController,public storage: Storage,public toastCtrl: ToastController,public cartService: CartServiceProvider,public events: Events,
              public navParams: NavParams,public productService: ProductServiceProvider) {
    this.storage.get('api_key').then(apiToken => {
      if(apiToken != null) {
        this.login = true;
      }
      else{
        this.login = false;
      }
      this.apiToken = apiToken;
    });
  }
  items : any;
  ionViewDidLoad() {
    this.getBestSeller();
    console.log(this.items);
  }

  getBestSeller(){
    let data = {
      slug : "best-seller"
    };
    this.productService.getproductsByCategories(this.login,data,1,this.apiToken).subscribe(res => {
      this.items = res.data;
      console.log(res);
    })
  }

  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'bot'
    });

    toast.present();
  }


  addToCart(id){
    console.log(id);
    this.storage.get('user_id').then(userid => {
      if(userid == null) {
        this.presentToast("Harap login terlebih dahulu");
        this.navCtrl.push(LoginPage);
      }
      else{
          let data = {
            product_id: id,
            apiToken : this.login
          };
          this.cartService.addtoCart(data).subscribe(res => {
            this.presentToast("Produk berhasil masuk keranjang");
            this.events.publish('cart:update',{});
            this.events.publish('cart:added',{});
          });
      }
    });
  }

  doDetailProducts(item) {
    this.navCtrl.push(ProductdetailPage,{items: item});
  }

}
