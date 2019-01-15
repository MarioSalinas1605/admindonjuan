import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OrderProvider } from '../../providers/order/order';
import { GpsProvider } from '../../providers/gps/gps';

/**
 * Generated class for the OrdersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-orders',
  templateUrl: 'orders.html',
})
export class OrdersPage {
  orders: any = {}
  constructor(public navCtrl: NavController, public navParams: NavParams, public orderProvider: OrderProvider, public gpsProvider:GpsProvider) {
    this.orderProvider.getProducts().valueChanges().subscribe((data) => {
      this.orders = data;
      console.log(this.orders)
      console.log(`Coordinates Lat: ${gpsProvider.lat} Lon: ${gpsProvider.lon}`)
    }, (error) => {
      console.log(error);
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrdersPage');
  }

}
