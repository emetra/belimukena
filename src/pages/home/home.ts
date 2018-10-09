import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {ProductdetailPage} from "../productdetail/productdetail";
import { ProductServiceProvider } from '../../providers/product-service/product-service';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  items : any;

  constructor(public navCtrl: NavController, public navParams: NavParams
    ,public storage: Storage, public productService : ProductServiceProvider) {

  }

  ionViewDidLoad(){
    this.getProduct();
  }

  getProduct(){
    this.productService.getProducts().subscribe(res => {
      this.items = res.data;
      console.log(res);
    })
  }

  doDetailProducts(item) { 
    this.navCtrl.push(ProductdetailPage,{items: item});
  }
}
