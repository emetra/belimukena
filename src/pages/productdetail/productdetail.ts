import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProductServiceProvider } from '../../providers/product-service/product-service';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login';

/**
 * Generated class for the ProductdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-productdetail',
  templateUrl: 'productdetail.html',
})
export class ProductdetailPage {
  item: any;
  items: any;
  constructor(public navCtrl: NavController, public navParams: NavParams
    ,public storage: Storage,public productService : ProductServiceProvider) {
  }
  ionViewDidLoad() {
    this.item = this.navParams.get("items");
    console.log(this.item);
    this.getProductDetail();
  }

  getProductDetail(){
    this.productService.getProductDetail(this.item).subscribe(res => {
      this.items = res.data;
    })
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
}
