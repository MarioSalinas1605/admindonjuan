import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

/*
  Generated class for the OrderProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class OrderProvider {

  constructor(public http: HttpClient, public afDB: AngularFireDatabase) {
    console.log('Hello OrderProvider Provider');
  }

  public getProducts(){
    return this.afDB.list('orders/')
  }

  public addOrder(order) {
    return this.afDB.object('orders/' + order.oid + '/' + 'answers/'+ order.store.uid).set(order);
  }
}
