import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { ApiServiceProvider } from '../api-service/api-service';


/*
  Generated class for the ProductServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProductServiceProvider {

  constructor(public http: Http, public apiService: ApiServiceProvider) {
    
    
  }

  getCategories():Observable<any> {
    let url = this.apiService.API_URL + '/categories';

    return this.http.get(url)
      .map(res => {
        return res.json()
      });
  }

  getProducts():Observable<any> {
    let url = this.apiService.API_URL + '/products';

    return this.http.get(url)
      .map(res => {
        return res.json()
      });
  }

  getproductsByCategories(data):Observable<any> {
    let url = this.apiService.API_URL + '/categories/'+data.slug+'/products';

    return this.http.get(url)
      .map(res => {
        return res.json()
      });
  }
}
