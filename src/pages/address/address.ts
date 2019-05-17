import { ProfileServiceProvider } from './../../providers/profile-service/profile-service';
import { DeliveryPage } from './../delivery/delivery';
import { CheckoutServiceProvider } from './../../providers/checkout-service/checkout-service';
import { Component } from '@angular/core';
import { NavController, NavParams, ToastController} from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-address',
  templateUrl: 'address.html',
})
export class AddressPage {

  cities: any;
  districts: any;
  items: any;
  recipient={};
  provinces: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public profileService: ProfileServiceProvider,
              public checkoutService: CheckoutServiceProvider,public storage: Storage,public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    this.getCheckout();
    // this.getProvince();
    console.log('ionViewDidLoad AddressPage');
  } 
  
  getCheckout(){
      this.storage.get('api_key').then(apiToken => {
        let data = {
          apiToken: apiToken
        };
  
        this.checkoutService.getCheckout(data)
          .subscribe(result => {
            this.recipient['name'] = result.recipient.name;
            this.recipient['phone'] = result.recipient.phone;
            this.recipient['address'] = result.recipient.address;
            this.recipient['postal_code'] = result.recipient.postal_code;
          });
      });
  }

  delivery(){
    this.storage.get('api_key').then(apiToken => {
      let data = {
        apiToken: apiToken,
        recipient_name: this.recipient['name'],
        recipient_phone: this.recipient['phone'],
        recipient_address: this.recipient['address'],
        recipient_postal_code: this.recipient['postal_code']
      };
      this.checkoutService.updateRecipient(data)
        .subscribe(result => {

          this.navCtrl.push(DeliveryPage);
        },
          err => {
            this.presentToast("Tolong lengkapi data alamat");
          });
    });
  }

  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top'
    });

    toast.present();
  }
}
