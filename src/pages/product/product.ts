import { Component } from '@angular/core';
import {NavController, NavParams, Events, ToastController} from 'ionic-angular';
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
  perPage = 0;
  totalData = 0;
  totalPage = 0;
  data = [];
  product = [];
  errorMessage: string;
  login:boolean = false;
  apiToken : any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public toastCtrl : ToastController,
    public productService: ProductServiceProvider,public storage: Storage,
    public cartService: CartServiceProvider,public events : Events) {
    this.storage.get('api_key').then(apiToken => {
      if(apiToken != null) {
        this.login = true;
      }
      else{
        this.login = false;
      }
      this.apiToken = apiToken;
    });
    this.item = this.navParams.get("items");
    this.getProduct();
  }


  ionViewDidLoad() {
  }

  doInfinite(infiniteScroll) {
    this.page = this.page+1;
    setTimeout(() => {
      this.productService.getproductsByCategories(this.login,this.item,this.page,this.apiToken)
         .subscribe(
           res => {
             console.log(res.data);
             this.data = res.data;
             this.perPage = res.meta.per_page;
             this.totalData = res.meta.total;
             this.totalPage = res.meta.last_page;
             for(let i=0; i<this.data.length; i++) {
               this.product.push(this.data[i]);
             }
           },
           error =>  this.errorMessage = <any>error);
      infiniteScroll.complete();
    }, 1000);
    console.log(this.data);
  }

  getProduct() {
    if(this.item == null)
    {
      this.productService.getProducts(this.login,this.page,'',this.apiToken).subscribe(res => {
        this.product = res.data;
        this.perPage = res.meta.per_page;
        this.totalData = res.meta.total;
        this.totalPage = res.meta.last_page;
      })
    }
    else{
      this.productService.getproductsByCategories(this.login,this.item,this.page,this.apiToken).subscribe(res => {
        this.product = res.data;
        this.perPage = res.meta.per_page;
        this.totalData = res.meta.total;
        this.totalPage = res.meta.last_page;
      })
    }
  }

  addToCart(id){
    console.log(id);
    this.storage.get('user_id').then(userid => {
      if(userid == null) {
        this.presentToast("Harap login terlebih dahulu");
        this.navCtrl.push(LoginPage);
      }
      else{
        this.storage.get('api_key').then(apiToken => {
          let data = {
            product_id: id,
            apiToken : apiToken
          }; 
          this.cartService.addtoCart(data).subscribe(res => {
            this.presentToast("Produk berhasil masuk keranjang");
            this.events.publish('cart:update',{});
            this.events.publish('cart:added',{});
          });
        });
      }
    });
  }

  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'bot'
    });

    toast.present();
  }

  doDetailProducts(item) {
    this.navCtrl.push(ProductdetailPage,{items: item});
  }
}
