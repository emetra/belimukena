import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {ProductdetailPage} from "../productdetail/productdetail";
import { ProductServiceProvider } from '../../providers/product-service/product-service';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login';

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
  constructor(public navCtrl: NavController, public navParams: NavParams
    , public productService: ProductServiceProvider,public storage: Storage) {
  }


  ionViewDidLoad() {
    this.item = this.navParams.get("items");
    console.log(this.item);
    this.getProduct();
  }

  getProduct() {
    if(this.item == null)
    {
      this.productService.getProducts().subscribe(res => {
        this.items = res.data;
      })
    }
    else{
      this.productService.getproductsByCategories(this.item).subscribe(res => {
        this.items = res.data;
      })
    }
  }

  addToCart(){
    this.storage.get('user_id').then(userid => {
      if(userid == null) {
        this.navCtrl.push(LoginPage);
      }
      else{
        // gotocart
      }
    });
  }

  doDetailProducts(item) {
    this.navCtrl.push(ProductdetailPage,{items: item});
  }
}
