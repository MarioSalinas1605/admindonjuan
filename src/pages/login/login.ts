import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { Storage } from '@ionic/storage';
import { TabsPage } from '../tabs/tabs';
import { StoreProvider } from '../../providers/store/store';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  operation: string = 'login';
  name: string = ''
  email: string = ''
  password: string = ''
  password2: string = ''
  number: number = 0

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private authenticationProvider: AuthenticationProvider,
    private storeProvider: StoreProvider,
    private storage: Storage,
    private alertCtrl: AlertController) {
      this.operation = 'login'
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(){
    let alert = this.alertCtrl.create({
      title: 'Perfecto!',
      subTitle: 'Has ingresado a tu cuenta',
      buttons: ['Ok']
    });
    let alertError = this.alertCtrl.create({
      title: 'Ups!',
      subTitle: 'Hubo un error',
      buttons: ['Ok']
    });

    this.authenticationProvider.loginWithEmail(this.email, this.password)
    .then(
      (data)=>{
        alert.present();
        console.log(data.user)
        this.storeProvider.get(data.user.uid).valueChanges().subscribe((store)=>{
          console.log(store)
          this.storage.set('store', store);
          this.navCtrl.setRoot(TabsPage);
        })
      }
    ).catch(
      (error)=>{
        alertError.present();
        console.log(error)
      }
    )

  }

  register(){
    let alert = this.alertCtrl.create({
      title: 'Perfecto!',
      subTitle: 'Te has registrado de manera correcta',
      buttons: ['Ok']
    });
    let alertError = this.alertCtrl.create({
      title: 'Ups!',
      subTitle: 'Hubo un error',
      buttons: ['Ok']
    });

    let store = {
      id: null,
      name: this.name,
      email: this.email,
      address: '',
      number: this.number
    }

    if (this.password == this.password2) {
        console.log("Contraseñas iguales")
    }

    this.authenticationProvider.registerWithEmail(this.email, this.password)
    .then(
      (data)=>{
        store.id = data.user.uid
        this.storeProvider.addStore(store).then((data2)=>{
          alert.present();
          console.log(data.user.uid)
          let obj = {uid: data.user.uid, email: data.user.email}
          this.storage.set('store', store);
        })
        .catch((error)=>{
          alertError.present()
          console.log(error)
        })
      }
    ).catch(
      (error)=>{
        alertError.present();
        console.log(error)
      }
    )

  }

}
