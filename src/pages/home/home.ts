import { Component } from '@angular/core';
import {NavController, NavParams, Events, ToastController} from 'ionic-angular';
import {ProductdetailPage} from "../productdetail/productdetail";
import { ProductServiceProvider } from '../../providers/product-service/product-service';
import { Storage } from '@ionic/storage';
import {LoginPage} from "../login/login";
import {CartServiceProvider} from "../../providers/cart-service/cart-service";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  data = [];
  product = [];
  errorMessage: string;
  page = 1;
  perPage = 0;
  totalData = 0;
  totalPage = 0;
  keyword: any = "";
  slider = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,public events: Events,public toastCtrl: ToastController,public cartService: CartServiceProvider
    ,public storage: Storage, public productService : ProductServiceProvider) {
      this.getProduct();

  }

  ionViewDidLoad(){
    this.getSlider();
  }

  getSlider(){
    this.productService.getSlider().subscribe(
      res => {
        this.slider = res.data;
      })
  }

  doInfinite(infiniteScroll) {
    this.page = this.page+1;
    setTimeout(() => {
      this.productService.getProducts(this.page,this.keyword)
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

  getProduct(){
    this.productService.getProducts(this.page,this.keyword).subscribe(
      res => {
        console.log(res.data);
        this.product = res.data;
        this.perPage = res.meta.per_page;
        this.totalData = res.meta.total;
        this.totalPage = res.meta.last_page;
    })
  }

  doDetailProducts(item) { 
    this.navCtrl.push(ProductdetailPage,{items: item});
  }
}
