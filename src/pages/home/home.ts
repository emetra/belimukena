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
  data = [];
  product = [];
  errorMessage: string;
  page = 1;
  perPage = 0;
  totalData = 0;
  totalPage = 0;
  keyword: any = "";

  constructor(public navCtrl: NavController, public navParams: NavParams
    ,public storage: Storage, public productService : ProductServiceProvider) {
      this.getProduct();

  }

  ionViewDidLoad(){
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
