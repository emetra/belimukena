import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ProductPage} from "../product/product";
import { ProductServiceProvider } from '../../providers/product-service/product-service';

/**
 * Generated class for the SubcategoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-subcategory',
  templateUrl: 'subcategory.html',
})
export class SubcategoryPage {

  items: any;
  item : any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public categoryService: ProductServiceProvider) {
  }

  ionViewDidLoad() {
    this.items = this.navParams.get("items");
  }


  doProducts(item) {
      this.navCtrl.push(ProductPage,{items: item});
  }
}
