import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the GpsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GpsProvider {
  public lat:Number = 18.989438631819077
  public lon:Number = -98.20023850115126
  constructor(public http: HttpClient) {
    console.log('Hello GpsProvider Provider');
  }

}
