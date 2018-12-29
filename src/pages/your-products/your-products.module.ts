import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { YourProductsPage } from './your-products';

@NgModule({
  declarations: [
    YourProductsPage,
  ],
  imports: [
    IonicPageModule.forChild(YourProductsPage),
  ],
})
export class YourProductsPageModule {}
