import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { NewProductPage } from '../new-product/new-product';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { LoginPage } from '../login/login';

/**
 * Generated class for the YourProductsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-your-products',
  templateUrl: 'your-products.html',
})
export class YourProductsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private authenticationProvider: AuthenticationProvider, private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad YourProductsPage');
  }

  goToNewProduct(){
    this.navCtrl.push(NewProductPage)
  }

  logOut(){
    let alert = this.alertCtrl.create({
      title: 'Fue un gusto atenderte!',
      subTitle: 'Esperamos que vuelvas',
      buttons: ['Ok']
    });
    let alertError = this.alertCtrl.create({
      title: 'Ups!',
      subTitle: 'Hubo un error',
      buttons: ['Ok']
    });

    this.authenticationProvider.logOut()
    .then(
      (data)=>{
        alert.present();
        console.log(data)
        this.navCtrl.setRoot(LoginPage);
      }
    ).catch(
      (error)=>{
        alertError.present();
        console.log(error)
      }
    )
  }

}
