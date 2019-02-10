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
  number: number

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
    let alertError = this.alertCtrl.create({
      title: 'Ups!',
      subTitle: 'Hubo un error',
      buttons: ['Ok']
    });
    let alertInput = this.alertCtrl.create({
      title: 'Verificar',
      subTitle: 'Completa todos los campos',
      buttons: ['Ok']
    });

    if(this.password==''){
      alertInput.present()
      return false;
    }
    if(this.email==''){
      alertInput.present()
      return false;
    }

    this.authenticationProvider.loginWithEmail(this.email, this.password)
    .then(
      (data)=>{
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

    if(this.verifydata()){
      let store = {
        id: null,
        name: this.name,
        email: this.email,
        latLng: null,
        number: this.number
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

  verifydata(){
    let alertPassword = this.alertCtrl.create({
      title: 'Verificar',
      subTitle: 'Las contraseñas deben ser iguales',
      buttons: ['Ok']
    });

    let alertInput = this.alertCtrl.create({
      title: 'Verificar',
      subTitle: 'Completa todos los campos',
      buttons: ['Ok']
    });

    if (this.password != this.password2) {
        console.log("Contraseñas iguales")
        alertPassword.present()
        return false;
    }
    if(this.password==''){
      alertInput.present()
      return false;
    }
    if(this.password2==''){
      alertInput.present()
      return false;
    }
    if(this.email==''){
      alertInput.present()
      return false;
    }
    if(this.name == ''){
      alertInput.present()
      return false;
    }
    if(this.number == null){
      alertInput.present()
      return false;
    }
    return true;
  }

}
