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

  doRegister(data):Observable<any> {
    let url = this.apiService.API_URL + '/register';
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': '*/*'
    });
    let options = new RequestOptions({ headers: headers });

    let item = {
      email: data.email,
      password: data.password,
      password_confirmation: data.password_confirmation,
      fullname: data.fullname,
      contact_number: data.contact_number,
      address: data.address,
      city_id: data.city_id,
      postal_code: data.postal_code
    };

    return this.http.post(url, item, options)
      .map(res => {
        return res.json();
      })
      .catch(err => {
        return err;
      });
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

  getProvinceID(data):Observable<any> {
    let url = this.apiService.ONGKIR_API + '/province?id='+data.id;
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
