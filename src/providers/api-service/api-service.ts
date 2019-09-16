import { Injectable } from '@angular/core';

/*
  Generated class for the ApiServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiServiceProvider {

  constructor() {
    
  }

  public API_URL:string = "https://api.belimukena.com/v1";
  public BASE_API:string = "https://api.belimukena.com/v1";
  public ONGKIR_API:string = "https://ongkir.belimukena.com/api/v1";
}

