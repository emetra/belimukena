import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {ProductdetailPage} from "../productdetail/productdetail";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }


  doDetailProducts() {
    this.navCtrl.push(ProductdetailPage);
  }
}
