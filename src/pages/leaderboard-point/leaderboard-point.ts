import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { WebService } from '../../service/WebService';
import { AuthService } from '../../service/AuthService';
import { Http } from '@angular/http';

/**
 * Generated class for the LeaderboardPointPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-leaderboard-point',
  templateUrl: 'leaderboard-point.html',
})
export class LeaderboardPointPage {
  leaderboardpoint:any;
  constructor(public navCtrl: NavController, private app:App, public navParams: NavParams, public http: Http
    ,public webService: WebService, public authService: AuthService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LeaderboardPointPage');

    this.webService.get(this.webService.url + "get_leaderboard_point.php", null).subscribe(response => {
      //console.log(response["_body"]);
      let responseData = JSON.parse(response["_body"]);
      if(responseData){
        console.log(JSON.stringify(responseData))
      
        this.leaderboardpoint = responseData;
        //console.log(this.classInfo);
      }
    }, error =>{
    })
  }

}
