import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';

/*
  Generated class for the AuthenticationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthenticationProvider {

  constructor(public http: HttpClient, public angularFireAuth: AngularFireAuth, public afDB: AngularFireDatabase) {
    console.log('Hello AuthenticationProvider Provider');
  }

  loginWithEmail(email: string, password:string){
    return this.angularFireAuth.auth.signInWithEmailAndPassword(email, password)
  }

  registerWithEmail(email: string, password:string){
    return this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password)
  }

  getStatus(){
    return this.angularFireAuth.authState
  }

  logOut(){
    return this.angularFireAuth.auth.signOut()
  }
}
