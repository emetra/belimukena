import { CheckoutServiceProvider } from './../../providers/checkout-service/checkout-service';
import { Component } from '@angular/core';
import { NavController, NavParams, ToastController} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {PaymentPage} from "../payment/payment";
import {ProfileServiceProvider} from "../../providers/profile-service/profile-service";

@Component({
  selector: 'page-delivery',
  templateUrl: 'delivery.html',
})
export class DeliveryPage {
  dataCost: any;
  province_id : any;
  city_id : any;
  district_id : any;
  cities: any;
  districts: any;
  provinces: any;
  service_id: any;

  constructor(public navCtrl: NavController,public checkoutService : CheckoutServiceProvider,public  toastCtrl: ToastController,
              public navParams: NavParams,public profileService : ProfileServiceProvider,public storage: Storage) {
  }

  ionViewDidLoad() {
    this.getCheckout();
  }

    getCheckout(){
      this.storage.get('api_key').then(apiToken => {
        let data = {
          apiToken: apiToken
        };
  
        this.checkoutService.getCheckout(data)
          .subscribe(result => {
            this.province_id = result.shipment.province_id;
            this.city_id = result.shipment.city_id;
            this.district_id = result.shipment.district_id;
            this.getProvince();
            if(this.district_id !=null){
              this.getCity(this.province_id);
            }
            if(this.city_id !=null) {
              this.getDistrict(this.city_id);
            }
            if(this.district_id !=null){
              this.getCost(this.district_id);
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

  changeProvince(id){
    this.getCity(id);
    this.district_id = null;
    this.dataCost = null;
  }

  changeCity(id) {
    this.getDistrict(id);
    this.dataCost = null;
  }

  getCost(id){
    this.storage.get('api_key').then(apiToken => {
      let data = {
        apiToken: apiToken,
        district_id: id
      };

      this.checkoutService.getCost(data)
        .subscribe(result => {
            this.dataCost = result.data.results[0].costs;
            console.log(this.dataCost);
        });
    });
  }
  payment(){
    this.storage.get('api_key').then(apiToken => {
      let data = {
        apiToken: apiToken,
        shipment_service_id: this.service_id,
        shipment_district_id: this.district_id,
        shipment_city_id: this.city_id,
        shipment_province_id: this.province_id
      };
      this.checkoutService.updateShipment(data)
        .subscribe(result => {

            this.navCtrl.push(PaymentPage);
          },
          err => {
            this.presentToast("Tolong pilih jasa pengiriman");
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
