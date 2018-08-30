import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ProductPage} from "../product/product";
import { ProductServiceProvider } from '../../providers/product-service/product-service';

/**
 * Generated class for the CategoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-category',
  templateUrl: 'category.html',
})
export class CategoryPage {

  items: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public categoryService: ProductServiceProvider) {
  }

  ionViewDidLoad() {
    this.getCategory();
  }
  getCategory() {
    this.categoryService.getCategories().subscribe(res => {
      this.items = res.data;
      console.log(res);
    })
  }

  doProducts(item) {
    if(item.child.length > 0)
    {
      // this.navCtrl.push(subCategory,{items : item});
    }
    else
    {
      this.navCtrl.push(ProductPage,{items: item});
    }
  }
}
