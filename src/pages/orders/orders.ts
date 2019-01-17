import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
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
  order: any
  distance: Number
  orders: any = {}
  constructor(public navCtrl: NavController, public navParams: NavParams, public orderProvider: OrderProvider, public gpsProvider:GpsProvider, public toastCtrl: ToastController) {
    this.orderProvider.getProducts().valueChanges().subscribe((data) => {
      this.orders = data;
      console.log(this.orders)
      this.loadData()
      //console.log(`Coordinates Lat: ${gpsProvider.lat} Lon: ${gpsProvider.lon}`)
    }, (error) => {
      console.log(error);
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrdersPage');
  }

  loadData(){
    for (let order in this.orders) {
        // onsole.log(this.orders[order].id)
        if (this.inRange(this.orders[order].markerlatlong, 10)) {
            this.order = this.orders[order]
            console.log(this.order)
            return true
        }
    }
    //console.log(this.orders)
  }

  inRange(marker, distance){
    if (this.CalcDistanceBetween(this.gpsProvider.lat, this.gpsProvider.lon, marker.lat, marker.lng) < distance) {
      console.log(`Distancia: ${this.CalcDistanceBetween(this.gpsProvider.lat, this.gpsProvider.lon, marker.lat, marker.lng)}`)
      return true
    }
  }

  CalcDistanceBetween(lat1, lon1, lat2, lon2) {
    //Radius of the earth in:  1.609344 miles,  6371 km  | var R = (6371 / 1.609344);
    var R = 3958.7558657440545; // Radius of earth in Miles
    var dLat = this.toRad(lat2-lat1);
    var dLon = this.toRad(lon2-lon1);
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;
    this.distance = d
    return d;
  }

  toRad(Value) {
      /** Converts numeric degrees to radians */
      return Value * Math.PI / 180;
  }

  test(){
    console.log("Yeah...!")
  }

  sendOrder(){
    let totalPrice = 0
    const toast = this.toastCtrl.create({
      message: 'Completa todos los precios o pon 0 en caso de que no se tenga en existencia',
      duration: 3300,
      position: 'top'
    });

    for (let item of this.order.list) {
      console.log(item)
        if (!item.price) {
          toast.present();
          return false
        }
        totalPrice = totalPrice + item.price
    }

    
  }

}
