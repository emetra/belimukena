import { ProfileServiceProvider } from './../../providers/profile-service/profile-service';
import { DeliveryPage } from './../delivery/delivery';
import { CheckoutServiceProvider } from './../../providers/checkout-service/checkout-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the AddressPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
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
              public checkoutService: CheckoutServiceProvider,public storage: Storage) {
  }

  ionViewDidLoad() {
    this.getCheckout();
    this.getProfile();
    this.getProvince();
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
            
          });
      });
  }

  getProfile(){
    this.storage.get('api_key').then(apiToken => {
      let data = {
        apiToken: apiToken
      };

      this.profileService.getProfile(data)
        .subscribe(result => {
         
          this.recipient['province_id'] = result.data.province_id;
          this.recipient['city_id'] = result.data.city_id;
          this.recipient['district_id'] = result.data.district_id;
          this.recipient['address'] = result.data.address;
          this.recipient['postal_code'] = result.data.postal_code;
          if(this.recipient['province_id']!=null){
            this.getCity(this.recipient['province_id'])
          }
          if(this.recipient['city_id']!=null){
            this.getDistrict(this.recipient['city_id'])
          }
        });
    });
  }

  getProvince(){
    this.storage.get('api_key').then(apiToken => {
      let data = {
        apiToken: apiToken
      };
      this.profileService.getProvince(data)
        .subscribe(result => {
          console.log(result.data);
          this.provinces = result.data;
        });
    });
  }

getCity(id){
  this.storage.get('api_key').then(apiToken => {
    let data = {
      apiToken: apiToken,
      province_id: id
    };
      this.profileService.getCity(data)
        .subscribe(result => {
          console.log(this.cities);
          this.cities = result.data;
        });
    });
  }

getDistrict(id){
  this.storage.get('api_key').then(apiToken => {
    let data = {
      apiToken: apiToken,
      city_id: id
    };
    this.profileService.getDistrict(data)
      .subscribe(result => {
        this.districts = result.data;
      });
  });
}

  delivery(){
    this.navCtrl.push(DeliveryPage);
  }
}
