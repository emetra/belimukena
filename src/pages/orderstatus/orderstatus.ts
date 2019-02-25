import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController } from 'ionic-angular';
import { OrderServiceProvider } from '../../providers/order-service/order-service';
import { Storage } from '@ionic/storage';
import {OrderdetailPage} from "../orderdetail/orderdetail";

/**
 * Generated class for the OrderstatusPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-orderstatus',
  templateUrl: 'orderstatus.html',
})
export class OrderstatusPage {
  orderlist : any;
  public category: string = 'confirm';
  public categories: Array<string> = ['confirm', 'menunggu', 'proses','dikirim','batal']


  constructor(public navCtrl: NavController,public orderCtrl: OrderServiceProvider
            , public navParams: NavParams,public storage: Storage,public loadingCtrl: LoadingController) {

  }

  onTabChanged(tabName) {
    this.category = tabName;
  }

  ionViewDidLoad() {
    this.getOrder();
  }

  orderDetail(){
    this.navCtrl.push(OrderdetailPage);
  }
  getOrder(){
    let loader = this.loadingCtrl.create({
      'content': 'Mohon menunggu...'
    });
    loader.present();
    this.storage.get('api_key').then(apiToken => {
      let data = {
        apiToken: apiToken
      };

      this.orderCtrl.getTransactionList(data)
        .subscribe(result => {
          loader.dismiss();
          this.orderlist = result.data;
        });
    });
  }


}
