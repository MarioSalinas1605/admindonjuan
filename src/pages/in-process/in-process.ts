import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StoreProvider } from '../../providers/store/store';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the InProcessPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-in-process',
  templateUrl: 'in-process.html',
})
export class InProcessPage {
  store
  list: any = []
  constructor(public navCtrl: NavController,
    public storeProvider: StoreProvider,
    private storage: Storage,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InProcessPage');
    this.storage.get('store').then((data)=>{
      console.log(data)
      if(data){
        this.store = data
        this.storeProvider.getOrderProcess(data.uid).valueChanges().subscribe((sdata)=>{
          console.log(sdata)
          if(sdata){
            this.list = sdata
          }
        })
      }
    })
  }


}
