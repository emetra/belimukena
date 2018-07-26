import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import {CartPage} from "../cart/cart";
import {ContactPage} from "../contact/contact";
import {BestsellerPage} from "../bestseller/bestseller";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = BestsellerPage;
  tab3Root = ContactPage;
  tab4Root = CartPage;

  constructor() {

  }
}
