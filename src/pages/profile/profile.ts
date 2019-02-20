import { ProfileServiceProvider } from './../../providers/profile-service/profile-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
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
