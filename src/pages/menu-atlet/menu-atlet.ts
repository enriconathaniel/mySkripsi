import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProfilAtletPage } from '../profil-atlet/profil-atlet';
import { ClubPage } from '../club/club';
import { QuestAtletPage } from '../quest-atlet/quest-atlet';
import { HistoryAtletPage } from '../history-atlet/history-atlet';
import { LeaderboardAtletPage } from '../leaderboard-atlet/leaderboard-atlet';
import { RewardAtletPage } from '../reward-atlet/reward-atlet';
import { Http } from '../../../node_modules/@angular/http';
import { WebService } from '../../service/WebService';
import { AuthService } from '../../service/AuthService';

/**
 * Generated class for the MenuAtletPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menu-atlet',
  templateUrl: 'menu-atlet.html',
})
export class MenuAtletPage {
  profilePage:any;
  clubPage:any;
  questPage:any;
  historyPage:any;
  leaderboardPage:any;
  rewardPage:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http
    ,public webService: WebService, public authService: AuthService) {
    this.profilePage = ProfilAtletPage;
    this.clubPage = ClubPage;
    this.questPage = QuestAtletPage;
    this.historyPage = HistoryAtletPage;
    this.leaderboardPage = LeaderboardAtletPage;
    this.rewardPage = RewardAtletPage;
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuAtletPage');
    console.log("role",this.authService.role);
  }
  ionViewWillEnter(){
    console.log('cek will enter')
    let req = {
      'id' : this.authService.id
    }
    this.webService.post(this.webService.url + "check_side_quest.php", JSON.stringify(req), null).subscribe(response => {
      //console.log(response["_body"]);
      let responseData = JSON.parse(response["_body"]);
    }, error =>{
    })

    this.webService.post(this.webService.url + "check_main_quest.php", JSON.stringify(req), null).subscribe(response => {
      //console.log(response["_body"]);
      let responseData = JSON.parse(response["_body"]);
    }, error =>{
    })
  }

}
