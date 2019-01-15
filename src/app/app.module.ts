import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { OrdersPage } from '../pages/orders/orders';
import { RecordPage } from '../pages/record/record';
import { YourProductsPage } from '../pages/your-products/your-products';
import { TabsPage } from '../pages/tabs/tabs';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { ProductProvider } from '../providers/product/product';
import { NewProductPage } from '../pages/new-product/new-product';
import { HttpClientModule } from '@angular/common/http';
import { OrderProvider } from '../providers/order/order';
import { GpsProvider } from '../providers/gps/gps';

export const firebaseConfig = {
  apiKey: "AIzaSyCMjs-827aomemKULQ5uFXuR_w06Higk0s",
  authDomain: "donjuan-d3d8f.firebaseapp.com",
  databaseURL: "https://donjuan-d3d8f.firebaseio.com",
  projectId: "donjuan-d3d8f",
  storageBucket: "donjuan-d3d8f.appspot.com",
  messagingSenderId: "885737150162"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    OrdersPage,
    RecordPage,
    YourProductsPage,
    TabsPage,
    NewProductPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    OrdersPage,
    RecordPage,
    YourProductsPage,
    TabsPage,
    NewProductPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireDatabase,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ProductProvider,
    OrderProvider,
    GpsProvider
  ]
})
export class AppModule {}
