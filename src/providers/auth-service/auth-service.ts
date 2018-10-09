import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { ApiServiceProvider } from '../api-service/api-service';
import "rxjs";

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {

  constructor(public http: Http, public apiService: ApiServiceProvider) {
    
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
    }

    return this.http.post(url, body, options)
      .map(res => {
        return res.json();
      })
      .catch(err => {
        return err;
      });
  }

}
