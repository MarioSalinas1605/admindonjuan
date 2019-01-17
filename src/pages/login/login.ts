import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { Storage } from '@ionic/storage';
import { TabsPage } from '../tabs/tabs';

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

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private authenticationProvider: AuthenticationProvider,
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
        let obj: any = {uid: data.user.uid, email: data.user.email}
        this.storage.set('store', obj);
        this.navCtrl.setRoot(TabsPage);
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

    let shop = {
      name: this.name,
      email: this.email,
      address: '',
      store: true
    }

    if (this.password == this.password2) {
        console.log(shop)
    }

    this.authenticationProvider.registerWithEmail(this.email, this.password)
    .then(
      (data)=>{
        this.authenticationProvider.addShop(shop).then((data2)=>{
          alert.present();
          console.log(data.user)
          let obj: any = {uid: data.user.uid, email: data.user.email}
          this.storage.set('store', obj);
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
