import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NewProductPage } from '../new-product/new-product';

/**
 * Generated class for the YourProductsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-your-products',
  templateUrl: 'your-products.html',
})
export class YourProductsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad YourProductsPage');
  }

  goToNewProduct(){
    this.navCtrl.push(NewProductPage)
  }

}
