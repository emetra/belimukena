import { Injectable } from '@angular/core';
import { Http ,RequestOptions,Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { ApiServiceProvider } from '../api-service/api-service';

/*
  Generated class for the OrderServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class OrderServiceProvider {

  constructor(public http: Http,public apiService: ApiServiceProvider) {

  }

  getTransactionList(data):Observable<any> {
    let url = this.apiService.API_URL + '/my-transactions';
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

  paymentConfirmation(data):Observable<any> {
    let url = this.apiService.API_URL + '/my-transactions/transactions/'+data.invoice_number+'/confirm-payment';
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': '*/*',
      'Authorization': 'Bearer ' + data.apiToken
    });
    let options = new RequestOptions({ headers: headers });

    let item = {
      bank_id: "",
      cust_bank: "bca",
      cust_bank_name: "belimukenaCustomer",
      payment_amount: "",
      payment_date: ""
    };

    return this.http.post(url, item, options)
      .map(res => {
        return res.json();
      });
  }

}
