import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {ProductdetailPage} from "../productdetail/productdetail";
import { ProductServiceProvider } from '../../providers/product-service/product-service';

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

  constructor(public navCtrl: NavController, public navParams: NavParams,public productService: ProductServiceProvider) {
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
    this.productService.getproductsByCategories(data,1).subscribe(res => {
      this.items = res.data;
      console.log(res);
    })
  }

  doDetailProducts(item) {
    this.navCtrl.push(ProductdetailPage,{items: item});
  }

}
