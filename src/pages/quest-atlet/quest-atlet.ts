import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddQuestPelatihPage } from '../add-quest-pelatih/add-quest-pelatih';
import { Http } from '../../../node_modules/@angular/http';
import { WebService } from '../../service/WebService';
import { AuthService } from '../../service/AuthService';
import { MainQuestPelatihPage } from '../main-quest-pelatih/main-quest-pelatih';
import { SideQuestPelatihPage } from '../side-quest-pelatih/side-quest-pelatih';

/**
 * Generated class for the QuestAtletPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-quest-atlet',
  templateUrl: 'quest-atlet.html',
})
export class QuestAtletPage {
  questlist:any;
  addQuestPage:any;
  role:any;
  rolevalid:any;

  tab1Root = MainQuestPelatihPage;
  tab2Root = SideQuestPelatihPage;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public http: Http, public webService: WebService, public authService: AuthService) {
    this.addQuestPage = AddQuestPelatihPage;
  }

  ionViewDidLoad() {
    this.role = this.authService.role;
    if(this.role == 'pelatih'){
      this.rolevalid = true ;
    } else this.rolevalid = false;
    console.log('ionViewDidLoad QuestAtletPage');

    

  }

}
