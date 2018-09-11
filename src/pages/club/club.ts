import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { WebService } from '../../service/WebService';
import { EditClubPage } from '../edit-club/edit-club';
import { AtletDataPage } from '../atlet-data/atlet-data';


/**
 * Generated class for the ClubPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-club',
  templateUrl: 'club.html',
})
export class ClubPage {
  userlist:any;
  infoclub:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http
    ,public webService: WebService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClubPage');

    this.webService.get(this.webService.url + "getclub.php", null).subscribe(response => {
      //console.log(response["_body"]);
      let responseData = JSON.parse(response["_body"]);
      if(responseData){
        console.log(JSON.stringify(responseData))
      
        this.infoclub = responseData;
        //console.log(this.classInfo);
      }
    }, error =>{
    })

    this.webService.get(this.webService.url + "getatletlist.php", null).subscribe(response => {
      //console.log(response["_body"]);
      let responseData = JSON.parse(response["_body"]);
      if(responseData){
        // console.log(JSON.stringify(responseData),'ASaas')
        
        this.userlist = responseData.map(function(element){
          element.isChecked = false;
          return element;
        });
        //console.log(this.classInfo);
      }
    }, error =>{
    })

  }

  edit(){
    this.navCtrl.push(EditClubPage);
  }

  infoatlet(id){
    this.navCtrl.push(AtletDataPage,id);

  }

}
