import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddQuestPelatihPage } from '../add-quest-pelatih/add-quest-pelatih';
import { Http } from '../../../node_modules/@angular/http';
import { WebService } from '../../service/WebService';

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
  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public http: Http, public webService: WebService) {
    this.addQuestPage = AddQuestPelatihPage;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuestAtletPage');

    this.webService.get(this.webService.url + "getquest.php", null).subscribe(response => {
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
