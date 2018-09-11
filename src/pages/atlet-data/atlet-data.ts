import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '../../../node_modules/@angular/http';
import { WebService } from '../../service/WebService';
import { AuthService } from '../../service/AuthService';

/**
 * Generated class for the AtletDataPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-atlet-data',
  templateUrl: 'atlet-data.html',
})
export class AtletDataPage {
  idatlet = this.navParams.data;
  listlatihan:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public http: Http, public webService: WebService, public authService: AuthService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AtletDataPage');

    let req = {
      'id' : this.idatlet
    }

    this.webService.post(this.webService.url + "get_history_reward.php", JSON.stringify(req) ,null).subscribe(response => {
      //console.log(response["_body"]);
      let responseData = JSON.parse(response["_body"]);
      if(responseData){
        console.log(JSON.stringify(responseData))
        
        this.listlatihan = responseData;
        //console.log(this.classInfo);
      }
    }, error =>{
    })

  }

}
