import { Injectable } from '@angular/core';
import { Http,RequestOptions,Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { ApiServiceProvider } from '../api-service/api-service';

/*
  Generated class for the ProfileServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProfileServiceProvider {

  constructor(public http: Http, public apiService: ApiServiceProvider) {
  }


  getProfile(data):Observable<any> {
    let url = this.apiService.API_URL + '/my-profile';
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': '*/*',
      'Authorization': 'Bearer ' + data.apiToken
      });
      
    let options = new RequestOptions({ headers: headers });
    return this.http.get(url,options)
      .map(res => {
        return res.json()
      });
  }

  getProvince(data):Observable<any> {
    let url = this.apiService.ONGKIR_API + '/province';
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': '*/*',
      'Authorization': 'Bearer ' + data.apiToken
      });
      
    let options = new RequestOptions({ headers: headers });
    return this.http.get(url,options)
      .map(res => {
        return res.json()
      });
  }

  getCity(data):Observable<any> {
    let url = this.apiService.ONGKIR_API + '/city?province_id='+data.province_id;
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': '*/*',
      'Authorization': 'Bearer ' + data.apiToken
      });
      
    let options = new RequestOptions({ headers: headers });
    return this.http.get(url,options)
      .map(res => {
        return res.json()
      });
  }

  
  getDistrict(data):Observable<any> {
    let url = this.apiService.ONGKIR_API + '/district?city_id='+data.city_id;
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': '*/*',
      'Authorization': 'Bearer ' + data.apiToken
      });
      
    let options = new RequestOptions({ headers: headers });
    return this.http.get(url,options)
      .map(res => {
        return res.json()
      });
  }
}
