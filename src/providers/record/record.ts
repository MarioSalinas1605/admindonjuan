import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

/*
  Generated class for the RecordProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RecordProvider {

  constructor(public http: HttpClient,
    public afDB: AngularFireDatabase) {
    console.log('Hello RecordProvider Provider');
  }

  get(uid){
    return this.afDB.list('stores/' + uid + '/records/')
  }

  public addToStore(order) {
    return this.afDB.object('stores/'+order.sid+'/records/' + order.oid).set(order);
  }

  public addToUser(order) {
    return this.afDB.object('users/'+order.user.uid+'/records/' + order.oid).set(order);
  }
  public deleteFromStore(order){
    return this.afDB.object('stores/'+order.sid+'/process/'+order.oid).remove();
  }
  public deleteFromUser(order){
    return this.afDB.object('users/'+order.user.uid+'/process/'+order.oid).remove();
  }
}
