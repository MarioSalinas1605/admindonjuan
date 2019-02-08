import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

/*
  Generated class for the StoreProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StoreProvider {

  constructor(public http: HttpClient, public afDB: AngularFireDatabase) {
    console.log('Hello StoreProvider Provider');
  }

  public addStore(shop) {
    return this.afDB.object('stores/' + shop.id + '/information/').set(shop);
  }

  public get(sid){
    return this.afDB.object('stores/' + sid + '/information/');
  }

  public getOrderProcess(uid){
    return this.afDB.list('stores/' + uid + '/process/')
  }

}
