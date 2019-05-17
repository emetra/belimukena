import { ProfileServiceProvider } from './../../providers/profile-service/profile-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  user = {};

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public profileService :ProfileServiceProvider, public storage : Storage) {
  }

  ionViewDidLoad() {
    this.getProfile();
  }

  getProfile(){
    this.storage.get('api_key').then(apiToken => {
      let data = {
        apiToken: apiToken
      };

      this.profileService.getProfile(data)
        .subscribe(result => {
          this.user = result.data;
          console.log(result);
        });
    });
  }

  updateProfile(){

  }

  changePassword(){

  }


}
