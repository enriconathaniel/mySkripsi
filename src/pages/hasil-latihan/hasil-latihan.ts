import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../service/AuthService';
import { WebService } from '../../service/WebService';
import { Http } from '../../../node_modules/@angular/http';

/**
 * Generated class for the HasilLatihanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-hasil-latihan',
  templateUrl: 'hasil-latihan.html',
})
export class HasilLatihanPage {
  idatlet = this.navParams.data;
  listlatihan:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public http: Http, public webService: WebService, public authService: AuthService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HasilLatihanPage');

    let req = {
      'id' : this.idatlet
    }
    console.log(req ,"<<<<<<<<<>>>>>>>>>" , this.idatlet)
    this.webService.post(this.webService.url + "gethasillatihan.php", JSON.stringify(req) ,null).subscribe(response => {
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
