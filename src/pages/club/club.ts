import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { Http } from '@angular/http';
import { WebService } from '../../service/WebService';
import { EditClubPage } from '../edit-club/edit-club';
import { AtletDataPage } from '../atlet-data/atlet-data';
import { HomePage } from '../home/home';
import { AuthService } from '../../service/AuthService';


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
  role:any;
  rolevalid:any;

  constructor(public navCtrl: NavController, private app:App, public navParams: NavParams, public http: Http
    ,public webService: WebService, public authService: AuthService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClubPage');
    this.role = this.authService.role;

    if(this.role == 'pelatih'){
      this.rolevalid = true ;
    } else this.rolevalid = false;

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

  logout(){
    this.authService.logout(() => {
      //set root
      this.app.getRootNav().setRoot(HomePage);
    });
  }

}
