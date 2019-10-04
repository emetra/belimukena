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

  getCost(data):Observable<any> {
    let url = this.apiService.ONGKIR_API + '/costs?district_id='+data.district_id;
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

  getBanks(data):Observable<any> {
    let url = this.apiService.API_URL + '/payments/banks';
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

  updateRecipient(data):Observable<any> {
    let url = this.apiService.API_URL + '/checkout/update-recipient';
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': '*/*',
      'Authorization': 'Bearer ' + data.apiToken
    });
    let options = new RequestOptions({ headers: headers });

    let item = {
      recipient_name: data.recipient_name,
      recipient_phone: data.recipient_phone,
      recipient_address: data.recipient_address,
      recipient_postal_code: data.recipient_postal_code
    };

    return this.http.patch(url, item, options)
      .map(res => {
        return res.json();
      },
      err => {
        return err;
      });
  }

  updateSender(data):Observable<any> {
    let url = this.apiService.API_URL + '/checkout/update-sender';
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': '*/*',
      'Authorization': 'Bearer ' + data.apiToken
    });
    let options = new RequestOptions({ headers: headers });

    let item = {
      sender_name: data.sender_name,
      sender_phone: data.sender_phone
    };

    return this.http.patch(url, item, options)
      .map(res => {
          return res.json();
        },
        err => {
          return err;
        });
  }

  updateShipment(data):Observable<any> {
    let url = this.apiService.API_URL + '/checkout/update-shipment';
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': '*/*',
      'Authorization': 'Bearer ' + data.apiToken
    });
    let options = new RequestOptions({ headers: headers });

    let item = {
      shipment_service_id: data.shipment_service_id,
      shipment_district_id: data.shipment_district_id,
      shipment_city_id: data.shipment_city_id,
      shipment_province_id: data.shipment_province_id
    };

    return this.http.patch(url, item, options)
      .map(res => {
        return res.json();
      },
        err => {
          return err;
      });
  }

  updatePaymentVa(data):Observable<any> {
    let url = this.apiService.API_URL + '/checkout/update-payment-method';
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': '*/*',
      'Authorization': 'Bearer ' + data.apiToken
    });
    let options = new RequestOptions({ headers: headers });

    let item = {
      payment_bank: 'bca',
      payment_method: 'va_transfer'
    };

    return this.http.patch(url, item, options)
      .map(res => {
          return res.json();
        },
        err => {
          return err;
        });
  }

  updatePaymentManual(data):Observable<any> {
    let url = this.apiService.API_URL + '/checkout/update-payment-method';
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': '*/*',
      'Authorization': 'Bearer ' + data.apiToken
    });
    let options = new RequestOptions({ headers: headers });

    let item = {
      payment_bank_id: data.payment_bank_id,
      payment_method: data.payment_method
    };

    return this.http.patch(url, item, options)
      .map(res => {
        return res.json();
      },
      err => {
        return err;
      });
  }

  confirmOrder(data):Observable<any> {
    let url = this.apiService.API_URL + '/checkout/store';
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': '*/*',
      'Authorization': 'Bearer ' + data.apiToken
    });
    let options = new RequestOptions({ headers: headers });

    let item = {
      apiToken: data.apiToken
    };

    return this.http.patch(url, item, options)
      .map(res => {
          return res.json();
        },
        err => {
          return err;
        });
  }

  getTransactionDetail(data):Observable<any> {
    let url = this.apiService.API_URL + '/transactions/'+data.invoice_number;
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
