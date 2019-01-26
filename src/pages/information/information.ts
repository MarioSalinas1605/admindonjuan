import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { RecordProvider } from '../../providers/record/record';

/**
 * Generated class for the InformationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-information',
  templateUrl: 'information.html',
})
export class InformationPage {
  store
  listRecords
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private recordProvider: RecordProvider,
    private storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InformationPage');
  }

  ionViewWillEnter(){
    this.storage.get('store').then((val) => {
      if(val){
        this.store = val
        console.log(this.store)
        this.recordProvider.get(this.store.uid).valueChanges().subscribe((data)=>{
          if(data){
            this.listRecords = data
            console.log(this.listRecords)
          }
        })
      }
    })
  }

}
