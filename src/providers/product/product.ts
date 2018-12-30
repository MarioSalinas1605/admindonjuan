import { AngularFireDatabase } from '@angular/fire/database';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ProductProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProductProvider {

  constructor(public http: HttpClient, public afDB: AngularFireDatabase) {
    console.log('Hello ProductProvider Provider');
  }

  public createProduct(product){
    return this.afDB.database.ref('/products/' + product.id).set(product)
  }
  public getProduct(id){
    return this.afDB.object('/products/' + id)
  }
  public getProducts(){
    return this.afDB.list('/products/')
  }
}
