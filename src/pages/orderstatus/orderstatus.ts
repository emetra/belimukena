import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { OrderServiceProvider } from '../../providers/order-service/order-service';
import { Storage } from '@ionic/storage';

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
  segment : any = 'confirm';
  orderlist : any;
  public category: string = 'segment';
  public categories: Array<string> = ['confirm', 'menunggu', 'proses','dikirim','batal']


  constructor(public navCtrl: NavController,public orderCtrl: OrderServiceProvider
            , public navParams: NavParams,public storage: Storage) {

  }

  onTabChanged(tabName) {
    this.category = tabName;
  }

  ionViewDidLoad() {
    this.getOrder();
  }

  getOrder(){
    this.storage.get('api_key').then(apiToken => {
      let data = {
        apiToken: apiToken
      };

      this.orderCtrl.getTransactionList(data)
        .subscribe(result => {
          console.log(result.data);
          this.orderlist = result.data;
        });
    });
  }
}
