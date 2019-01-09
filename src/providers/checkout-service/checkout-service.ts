import { Injectable } from '@angular/core';
import { Http ,RequestOptions,Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { ApiServiceProvider } from '../api-service/api-service';

/*
  Generated class for the CheckoutServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CheckoutServiceProvider {

  constructor(public http: Http,public apiService: ApiServiceProvider) {

  }

  getCheckout(data):Observable<any> {
    let url = this.apiService.API_URL + '/checkout';
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
