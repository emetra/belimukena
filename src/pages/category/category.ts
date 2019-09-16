import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {ProductPage} from "../product/product";
import { ProductServiceProvider } from '../../providers/product-service/product-service';
import { SubcategoryPage } from '../subcategory/subcategory';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the CategoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-category',
  templateUrl: 'category.html',
})
export class CategoryPage {
  items: any;
  apiToken:any;
  login: boolean = false;

  constructor(public navCtrl: NavController,public storage: Storage, public navParams: NavParams,public categoryService: ProductServiceProvider) {
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

  ionViewDidLoad() {
    this.getCategory();
  }
  getCategory() {
    this.categoryService.getCategories(this.login,this.apiToken).subscribe(res => {
      this.items = res.data;
      console.log(res.data);
    })
  }

  doProducts(item) {
    if(item.childs.length > 0)
    {
      this.navCtrl.push(SubcategoryPage,{items : item.childs});
    }
    else
    {
      this.navCtrl.push(ProductPage,{items: item});
    }
  }
}
