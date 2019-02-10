import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  Environment
} from '@ionic-native/google-maps';
import { StoreProvider } from '../../providers/store/store';
import { Storage } from '@ionic/storage';

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
  map: GoogleMap;
  latLng
  constructor(public navCtrl: NavController,
    public viewCtrl: ViewController,
    private googleMaps: GoogleMaps,
    public toastCtrl: ToastController,
    private storage: Storage,
    private storeProvider: StoreProvider,
    public navParams: NavParams) {
    this.store = navParams.get('store')
    console.log(this.store)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditInformationPage');
    this.loadMap();
  }

  dismiss() {
     this.viewCtrl.dismiss();
  }

  loadMap(){

    Environment.setEnv({
      'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyB2qyJBkvFWDCUer05D-U6Z3-wVVYFd5dI',
      'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyB2qyJBkvFWDCUer05D-U6Z3-wVVYFd5dI'
    });

    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: 43.0741904, // default location
          lng: -89.3809802 // default location
        },
        zoom: 18,
        tilt: 30
      }
    };

    this.map = this.googleMaps.create('map_canvas', mapOptions);

    // Wait the MAP_READY before using any methods.
    this.map.one(GoogleMapsEvent.MAP_READY)
    .then(() => {
      // Now you can use all methods safely.
      this.getPosition();
    })
    .catch(error =>{
      console.log(error);
    });

  }

  getPosition(): void{
    this.map.getMyLocation()
    .then(response => {
      this.latLng = response.latLng;
      this.map.moveCamera({
        target: response.latLng
      });
      this.map.addMarker({
        title: 'My Position',
        icon: 'blue',
        animation: 'DROP',
        position: response.latLng,
        draggable: true
      });
    })
    .catch(error =>{
      console.log(error);
    });
  }

  setUbication(){
    if (this.store.id == null) {
        return false
    }
    if(this.latLng == null){
      return false
    }
    const toast = this.toastCtrl.create({
      message: 'Ubicación guardada',
      duration: 3300,
      position: 'top'
    });

    this.storeProvider.setLatLng(this.store.id, this.latLng).then((data)=>{
      this.storage.get('store').then((data)=>{
        data.latLng = this.latLng
        console.log(data)
        this.storage.set('store', data);
        toast.present();
      })
    })
    .catch(error=>{
      console.log(error)
    })
  }

}
