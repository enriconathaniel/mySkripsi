import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { WebService } from '../../service/WebService';
import { AddRewardPage } from '../add-reward/add-reward';

/**
 * Generated class for the RewardAtletPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reward-atlet',
  templateUrl: 'reward-atlet.html',
})
export class RewardAtletPage {

  rewardlist:any;
  addreward:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http
    ,public webService: WebService) {
      this.addreward = AddRewardPage;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RewardAtletPage');

    this.webService.get(this.webService.url + "getreward.php", null).subscribe(response => {
      //console.log(response["_body"]);
      let responseData = JSON.parse(response["_body"]);
      if(responseData){
        console.log(JSON.stringify(responseData))
        
        this.rewardlist = responseData;
        //console.log(this.classInfo);
      }
    }, error =>{
    })

  }

}
