import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { ApiServiceProvider } from '../api-service/api-service';

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

    return this.http.post(url, data)
      .map(res => {
        return res.json()
      });
  }

}