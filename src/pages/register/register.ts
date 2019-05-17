import { Component } from '@angular/core';
import {NavController, NavParams, ToastController} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {ProfileServiceProvider} from "../../providers/profile-service/profile-service";
import {LoginPage} from "../login/login";
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  user={};
  cities: any;
  districts: any;
  provinces: any;

  constructor(public navCtrl: NavController,public storage: Storage,public authCtrl: AuthServiceProvider,
              public toastCtrl: ToastController,public profileService: ProfileServiceProvider, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.getProvince();
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
    this.user['district_id'] = null;
  }

  changeCity(id) {
    this.getDistrict(id);
  }

  register(){
      let data = {
        email: this.user['email'],
        password: this.user['password'],
        password_confirmation: this.user['password_confirmation'],
        fullname: this.user['name'],
        contact_number: this.user['phone'],
        address: this.user['address'],
        city_id: this.user['city_id'],
        postal_code: this.user['postal_code'],
      };
      this.authCtrl.register(data)
        .subscribe(result => {
            this.presentToast(result.message);
            this.navCtrl.push(LoginPage);
          },
          err => {
            console.log(err);
            this.presentToast(err);
        });
  }

  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 4000,
      position: 'top'
    });

    toast.present();
  }
}
