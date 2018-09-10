import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../service/AuthService';
import { WebService } from '../../service/WebService';
import { Http } from '@angular/http';

/**
 * Generated class for the HistoryRewardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-history-reward',
  templateUrl: 'history-reward.html',
})
export class HistoryRewardPage {
  rewardlist:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public http: Http, public webService: WebService, public authService: AuthService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoryRewardPage');

    let req = {
      'id' : this.authService.id
    }

    this.webService.post(this.webService.url + "get_history_reward.php", JSON.stringify(req) ,null).subscribe(response => {
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
