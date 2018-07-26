import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BestsellerPage } from './bestseller';

@NgModule({
  declarations: [
    BestsellerPage,
  ],
  imports: [
    IonicPageModule.forChild(BestsellerPage),
  ],
})
export class BestsellerPageModule {}
