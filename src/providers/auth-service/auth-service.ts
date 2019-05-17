import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { ApiServiceProvider } from '../api-service/api-service';
import "rxjs";
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {

  constructor(public http: Http, public apiService: ApiServiceProvider) {
    
  }

  register(data):Observable<any> {
    let url = 'http://belimukena-api.nafies.id/api/v1/register';

    let body = {
      email: data.email,
      password: data.password,
      password_confirmation: data.password_confirmation,
      fullname: data.fullname,
      contact_number: data.contact_number,
      address: data.address,
      city_id: data.city_id,
      postal_code: data.postal_code
    };

    return this.http.post(url, body)
      .map(res => {
        return res.json();
      })
      .catch(error => {
          console.log(error);
          return error;
        });
  }

  resetPass(data):Observable<any> {
    let url = 'http://belimukena-api.nafies.id/api/v1/pasword-request';

    let body = {
      email: data.email
    };

    return this.http.post(url, body)
      .map(res => {
        return res.json();
      })
      .catch(error => {
        console.log(error);
        return error;
      });
  }

  login(data):Observable<any> {
    let url = this.apiService.API_URL + '/login';
    let headers = new Headers({
          'Content-Type': 'application/json',
          'Accept': '*/*'
      });
      
    let options = new RequestOptions({ headers: headers });
    
    let body = {
      'email': data.email,
      'password' : data.password
    };

    return this.http.post(url, body, options)
      .map(res => {
        return res.json();
      })
      .catch(err => {
        return err;
      });
  }

}
