import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { ChangePasswordPage } from '../change-password/change-password';
import { Http, HttpModule } from '@angular/http';
import { WebService } from '../../service/WebService';
import { AuthService } from '../../service/AuthService';
import { HomePage } from '../home/home';
/**
 * Generated class for the ProfilAtletPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profil-atlet',
  templateUrl: 'profil-atlet.html',
})
export class ProfilAtletPage {
  
  changePassword:any;
  infoprofile:any;
  // infoprofile = {
  //   id: "",
  //   nama_gaya: "",
  //   jarak: ""
  
  // };

  constructor(public navCtrl: NavController, private app:App, public navParams: NavParams, public http: Http
  ,public webService: WebService, public AuthService: AuthService) {
    this.changePassword = ChangePasswordPage;

    // this.http.get('https://www.reddit.com/r/gifs/new/.json?limit=10').map(res => res.json()).subscribe(data => {
    //     this.infoprofile = data.data.children;
    // });
  }

  ion
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilAtletPage');
    this.webService.get(this.webService.url + "getprofile.php", null).subscribe(response => {
      //console.log(response["_body"]);
      let responseData = JSON.parse(response["_body"]);
      if(responseData){
        console.log(JSON.stringify(responseData))
      
        this.infoprofile = responseData;
        //console.log(this.classInfo);
      }
    }, error =>{
    })
  }


  logout(){
    this.AuthService.logout(() => {
      //set root
      this.app.getRootNav().setRoot(HomePage);
  });
  }

}
