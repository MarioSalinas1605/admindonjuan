import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { StoreProvider } from '../../providers/store/store';
import { Storage } from '@ionic/storage';
import { RecordProvider } from '../../providers/record/record';

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
    public alertController: AlertController,
    public recordProvider: RecordProvider,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InProcessPage');
    this.storage.get('store').then((data)=>{
      console.log(data)
      if(data){
        this.store = data
        this.storeProvider.getOrderProcess(this.store.id).valueChanges().subscribe((sdata)=>{
          console.log(sdata)
          if(sdata){
            this.list = sdata
          }
        })
      }
    })
  }

  async presentAlertConfirm(item) {
    const alert = await this.alertController.create({
      title: 'Confirmación',
      message: '¿Como quiere finalizar la orden?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
            this.addProcessOrderHistory(item, "cancel")
            this.deleteProcessOrder(item)
          }
        }, {
          text: 'Entregada',
          handler: () => {
            this.addProcessOrderHistory(item, "ok")
            this.deleteProcessOrder(item)
          }
        }
      ]
    });
    await alert.present();
  }

  addProcessOrderHistory(item, status){
    console.log('Confirm Okay');
    if (status=="ok") {
      item.status = "ok"
    }else{
      item.status = "cancel"
    }
    this.recordProvider.addToStore(item)
    this.recordProvider.addToUser(item)
    console.log(item)
  }

  deleteProcessOrder(item){
    this.recordProvider.deleteFromStore(item)
    this.recordProvider.deleteFromUser(item)
  }

  toMaps(item){
    console.log("https://maps.google.com/?q="+item.markerlatlong.lat+","+item.markerlatlong.lng)
    window.location.href="https://maps.google.com/?q="+item.markerlatlong.lat+","+item.markerlatlong.lng;
  }

}
