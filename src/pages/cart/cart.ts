import { AddressPage } from './../address/address';
import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, Events, AlertController } from 'ionic-angular';
import { CartServiceProvider } from '../../providers/cart-service/cart-service';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the CartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})

export class CartPage {

  carts : any;
  items : any;
  person : any;



  constructor(public navCtrl: NavController,public storage: Storage,
    public zone: NgZone, public navParams: NavParams,
    public cartService: CartServiceProvider,public events: Events,
    public alertCtrl : AlertController) {
    events.subscribe('cart:update', () => {
      this.zone.run(()=>{
      this.getCart();
      });
    });
  }

  ionViewDidLoad() {
    this.getCart();
  }

  getCart(){
    this.storage.get('api_key').then(apiToken => {
      let data = {
        apiToken: apiToken
      };

      this.cartService.getCarts(data)
        .subscribe(result => {
          var arr = [];
          Object.keys(result.items).forEach(function(key,index) {
            arr.push(result.items[key]);
              // key: the name of the object key
              // index: the ordinal position of the key within the object 
          });
          this.items = arr;
        });
    });
  }

  editCart(index,qty){
    this.storage.get('api_key').then(apiToken => {
      let data = {
        apiToken: apiToken,
        item_index: index,
        qty: qty
      };

      this.cartService.updateQty(data)
        .subscribe(result => {
          this.events.publish('cart:update',{});
        });
    });
  }

  removeCart(item){
    this.storage.get('api_key').then(apiToken => {
      let data = {
        apiToken: apiToken,
        product_id: item.id
      };

      this.cartService.removeCart(data)
        .subscribe(result => {
          this.events.publish('cart:update',{});
        });
    });
  }

  address(){
    this.navCtrl.push(AddressPage);
  }

  qtyPrompt(item) {
    let prompt = this.alertCtrl.create({
      title: 'Jumlah Produk',
      message: "Masukkan jumlah produk yang di inginkan",
      inputs: [
        {
          name: 'qty',
          placeholder: 'jumlah produk',
          type: 'tel',
          value: item.qty
        },
      ],
      buttons: [
        {
          text: 'Batal',
          handler: data => {
          }
        },
        {
          text: 'Beli',
          handler: data => {
            if(data.qty == "") {
              this.alert('Jumlah produk yang ingin dibeli tidak boleh kosong.');
            }
            else {
              this.editCart(item.id, data.qty);

            }
          }
        }
      ]
    });
    prompt.present();
  }


  alert(message) {
    let alert = this.alertCtrl.create({
      title: 'Message',
      subTitle: message,
      buttons: ['Ok']
    });
    alert.present();
  }
}
