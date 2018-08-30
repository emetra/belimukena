import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {ProductdetailPage} from "../productdetail/productdetail";
import { ProductServiceProvider } from '../../providers/product-service/product-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  items : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public productService : ProductServiceProvider) {

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

  doDetailProducts() { 
    this.navCtrl.push(ProductdetailPage);
  }
}
