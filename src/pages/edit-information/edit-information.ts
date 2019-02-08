import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the EditInformationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-information',
  templateUrl: 'edit-information.html',
})
export class EditInformationPage {
  store
  constructor(public navCtrl: NavController,
    public viewCtrl: ViewController,
    public navParams: NavParams) {
    this.store = navParams.get('store')
    console.log(this.store)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditInformationPage');
  }

  dismiss() {
     this.viewCtrl.dismiss();
  }

}
