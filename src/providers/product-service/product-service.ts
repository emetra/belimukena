import { Injectable } from '@angular/core';
import {Headers, Http, RequestOptions} from '@angular/http';
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

  getCategories(login,apiToken):Observable<any> {
    let link = ' ';
    if(login == true){
      link = '/categories/';
    }
    else{
      link = '/guest-categories/';
    }

    let url = this.apiService.API_URL + link;

    let headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': '*/*',
      'Authorization': 'Bearer ' + apiToken
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(url,options)
      .map(res => {
        return res.json()
      });
  }

  getSlider():Observable<any> {
    let url = this.apiService.API_URL + '/sliders';

    return this.http.get(url)
      .map(res => {
        return res.json()
      });
  }

  getProducts(login,page,query,apiToken):Observable<any> {
    let link = ' ';
    if(login == true){
      link = '/products';
    }
    else{
      link = '/guest-products';
    }
    let url = this.apiService.API_URL + link +'?page='+page+'&query='+query;

    let headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': '*/*',
      'Authorization': 'Bearer ' + apiToken
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(url,options)
      .map(res => {
        let body = res.json();
        return body || { };
      });
    // return this.http.get(url)
    //   .map(res => {
    //     let body = res.json();
    //     return body || { };
    //   })
    //   .catch(this.handleError);
  }

  // private handleError (error: Response | any) {
  //   let errMsg = `${error.status} - ${error.statusText || ''}`;
  //  console.error(errMsg);
  //   return Observable.throw(errMsg);
  // }

  getproductsByCategories(login,data,page,apiToken):Observable<any> {
    let link = ' ';
    if(login == true){
      link = '/categories/';
    }
    else{
      link = '/guest-categories/';
    }
    let url = this.apiService.API_URL + link +data.slug+'/products?page='+page;

    let headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': '*/*',
      'Authorization': 'Bearer ' + apiToken
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(url,options)
      .map(res => {
        return res.json()
      });
  }

  getProductDetail(login,data,apiToken):Observable<any> {
    let link = ' ';
    if(login == true){
      link = '/products/';
    }
    else{
      link = '/guest-products/';
    }

    let url = this.apiService.API_URL + link +data.id;

    let headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': '*/*',
      'Authorization': 'Bearer ' + apiToken
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(url,options)
      .map(res => {
        return res.json()
      });
  }
}
