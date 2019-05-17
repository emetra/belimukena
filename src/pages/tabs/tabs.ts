import {Component, NgZone} from '@angular/core';

import { HomePage } from '../home/home';
import {CartPage} from "../cart/cart";
import {ContactPage} from "../contact/contact";
import {BestsellerPage} from "../bestseller/bestseller";
import {Events} from "ionic-angular";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  badge :any =0;
  tab1Root = HomePage;
  tab2Root = BestsellerPage;
  tab3Root = ContactPage;
  tab4Root = CartPage;

  constructor(public events: Events,public zone: NgZone){
    events.subscribe('cart:added', () => {
      this.zone.run(()=>{
        this.badge = this.badge+1;
      });
    });
    events.subscribe('cart:badge', () => {
      this.zone.run(()=>{
        this.badge = 0;
      });
    });
  }
}
