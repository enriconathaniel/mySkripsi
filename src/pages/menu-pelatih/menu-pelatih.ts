import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ClubPage } from '../club/club';
import { QuestAtletPage } from '../quest-atlet/quest-atlet';
import { HistoryAtletPage } from '../history-atlet/history-atlet';
import { LeaderboardAtletPage } from '../leaderboard-atlet/leaderboard-atlet';
import { RewardAtletPage } from '../reward-atlet/reward-atlet';
import { AuthService } from '../../service/AuthService';
import { WebService } from '../../service/WebService';
import { Http } from '../../../node_modules/@angular/http';

/**
 * Generated class for the MenuPelatihPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menu-pelatih',
  templateUrl: 'menu-pelatih.html',
})
export class MenuPelatihPage {
  clubPage:any;
  questPage:any;
  historyPage:any;
  leaderboardPage:any;
  rewardPage:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http
    ,public webService: WebService, public authService: AuthService) {
    this.clubPage = ClubPage;
    this.questPage = QuestAtletPage;
    this.historyPage = HistoryAtletPage;
    this.leaderboardPage = LeaderboardAtletPage;
    this.rewardPage = RewardAtletPage;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPelatihPage');
    
    console.log("role", this.authService.role);
  }

}
