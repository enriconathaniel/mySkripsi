import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddQuestPelatihPage } from '../add-quest-pelatih/add-quest-pelatih';
import { Http } from '../../../node_modules/@angular/http';
import { WebService } from '../../service/WebService';
import { AuthService } from '../../service/AuthService';

/**
 * Generated class for the MainQuestPelatihPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-main-quest-pelatih',
  templateUrl: 'main-quest-pelatih.html',
})
export class MainQuestPelatihPage {
  questlist:any;
  addQuestPage:any;
  role:any;
  rolevalid:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public http: Http, public webService: WebService, public authService: AuthService) {
    this.addQuestPage = AddQuestPelatihPage;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuestAtletPage');
    this.role = this.authService.role;
    if(this.role == 'pelatih'){
      this.rolevalid = true ;
    } else this.rolevalid = false;

    let req = {
      'id' : this.authService.id
    }

    this.webService.post(this.webService.url + "getquest.php", JSON.stringify(req), null).subscribe(response => {
      //console.log(response["_body"]);
      let responseData = JSON.parse(response["_body"]);
      if(responseData){
        console.log(JSON.stringify(responseData))
        
        this.questlist = responseData;
        //console.log(this.classInfo);
      }
    }, error =>{
    })

  }

}
