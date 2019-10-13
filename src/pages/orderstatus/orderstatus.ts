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
  status1: any;
  status2: any;
  status3: any;
  status4: any;
  status5: any;
  status6: any;
  loader:any;
  public category: string = 'confirm';
  public categories: Array<string> = ['confirm', 'menunggu', 'proses','dikirim','batal']


  constructor(public navCtrl: NavController,public orderCtrl: OrderServiceProvider
            , public navParams: NavParams,public storage: Storage,public loadingCtrl: LoadingController) {

  }

  onTabChanged(tabName) {
    this.category = tabName;
  }

  ionViewDidLoad() {

    this.getOrderStatus1();
    this.getOrderStatus2();
    this.getOrderStatus3();
    this.getOrderStatus4();
    this.getOrderStatus5();
    this.getOrderStatus6();

  }

  doRefresh(refresher) {
    setTimeout(() => {
      this.ionViewDidLoad();
      refresher.complete();
    }, 2000);
  }

  orderDetail(item){
    let data = {product:item};
    this.navCtrl.push(OrderdetailPage,data);
  }
  getOrderStatus1(){
    this.loader = this.loadingCtrl.create({
      'content': 'Mohon menunggu...'
    });
    this.loader.present();
    this.storage.get('api_key').then(apiToken => {
      let data = {
        apiToken: apiToken
      };

      this.orderCtrl.getTransactionByStatus(data,1)
        .subscribe(result => {

          this.status1 = result.data;
        });
    });
  }
  getOrderStatus2(){
    this.storage.get('api_key').then(apiToken => {
      let data = {
        apiToken: apiToken
      };

      this.orderCtrl.getTransactionByStatus(data,2)
        .subscribe(result => {
          this.status2 = result.data;
        });
    });
  }
  getOrderStatus3(){
    this.storage.get('api_key').then(apiToken => {
      let data = {
        apiToken: apiToken
      };

      this.orderCtrl.getTransactionByStatus(data,3)
        .subscribe(result => {
          this.status3 = result.data;
        });
    });
  }
  getOrderStatus4(){
    this.storage.get('api_key').then(apiToken => {
      let data = {
        apiToken: apiToken
      };

      this.orderCtrl.getTransactionByStatus(data,4)
        .subscribe(result => {
          this.status4 = result.data;
        });
    });
  }
  getOrderStatus5(){
    this.storage.get('api_key').then(apiToken => {
      let data = {
        apiToken: apiToken
      };

      this.orderCtrl.getTransactionByStatus(data,5)
        .subscribe(result => {
          this.status5 = result.data;
        });
    });
  }
  getOrderStatus6(){
    this.storage.get('api_key').then(apiToken => {
      let data = {
        apiToken: apiToken
      };

      this.orderCtrl.getTransactionByStatus(data,6)
        .subscribe(result => {
          this.loader.dismiss();
          this.status6 = result.data;
        });
    });
  }
  // getOrder(){
  //   let loader = this.loadingCtrl.create({
  //     'content': 'Mohon menunggu...'
  //   });
  //   loader.present();
  //   this.storage.get('api_key').then(apiToken => {
  //     let data = {
  //       apiToken: apiToken
  //     };
  //
  //     this.orderCtrl.getTransactionList(data)
  //       .subscribe(result => {
  //         loader.dismiss();
  //         this.orderlist = result.data;
  //       });
  //   });
  // }


}
