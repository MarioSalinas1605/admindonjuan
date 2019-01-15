import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ProductProvider} from "../../providers/product/product";

/**
 * Generated class for the NewProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-product',
  templateUrl: 'new-product.html',
})
export class NewProductPage {
  name: string = ''
  size: string = ''
  sizes: string[] = [];
  list: Array<string> = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public productProvider: ProductProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewProductPage');
  }

  addSize(){
    this.list.push(this.size)
    this.sizes.push(this.size)
    this.size=''
    console.log(this.sizes)
  }

  save(){
    const product = {
          id: Date.now(),
          name: this.name,
          sizes: this.sizes,
          sizes2: this.list
        };
    this.productProvider.createProduct(product).then((data) => {
      // let toast = this.toastCtrl.create({
      //   message: 'Producto guardado con éxito',
      //   duration: 3000,
      //   position: 'bottom'
      console.log("Bien guardado")
      this.name = ''
      this.sizes = []
      });
  }
}
