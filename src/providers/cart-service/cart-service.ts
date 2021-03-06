import { Injectable } from '@angular/core';
import { Http ,RequestOptions,Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { ApiServiceProvider } from '../api-service/api-service';

/*
  Generated class for the CartServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CartServiceProvider {

  constructor(public http: Http,public apiService: ApiServiceProvider) {

  }

  getCarts(data):Observable<any> {
    let url = this.apiService.API_URL + '/cart';
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

  addtoCart(data):Observable<any> {
    let url = this.apiService.API_URL + '/cart';
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': '*/*',
      'Authorization': 'Bearer ' + data.apiToken
      });
    let options = new RequestOptions({ headers: headers });
    
    let item = {
      product_id: data.product_id
    };

    return this.http.post(url, item, options)
      .map(res => {
        return res.json();
      });
  }

  updateQty(data):Observable<any> {
    let url = this.apiService.API_URL + '/cart';
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': '*/*',
      'Authorization': 'Bearer ' + data.apiToken
      });
    let options = new RequestOptions({ headers: headers });
    
    let item = {
      product_id: data.product_id,
      qty: data.qty
    };

    return this.http.patch(url, item, options)
      .map(res => {
        return res.json();
      });
  }

  removeCart(data):Observable<any> {
    let url = this.apiService.API_URL + '/cart/'+ data.product_id;
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': '*/*',
      'Authorization': 'Bearer ' + data.apiToken
      });
    let options = new RequestOptions({ headers: headers });

    return this.http.delete(url, options)
      .map(res => {
        return res.json();
      });
  }
}
