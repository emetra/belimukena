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

  getProducts(page,query):Observable<any> {
    let url = this.apiService.API_URL + '/products?page='+page+'&query='+query;

    return this.http.get(url)
      .map(res => {
        let body = res.json();
        return body || { };
      })
      .catch(this.handleError);
  }

  private handleError (error: Response | any) {
    let errMsg = `${error.status} - ${error.statusText || ''}`;
   console.error(errMsg);
    return Observable.throw(errMsg);
  }

  getproductsByCategories(data,page):Observable<any> {
    let url = this.apiService.API_URL + '/categories/'+data.slug+'/products?page='+page;

    return this.http.get(url)
      .map(res => {
        return res.json()
      });
  }

  getProductDetail(data):Observable<any> {
    let url = this.apiService.API_URL + '/products/'+data.id;

    return this.http.get(url)
      .map(res => {
        return res.json()
      });
  }
}
