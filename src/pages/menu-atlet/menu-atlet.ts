import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProfilAtletPage } from '../profil-atlet/profil-atlet';
import { ClubPage } from '../club/club';
import { QuestAtletPage } from '../quest-atlet/quest-atlet';
import { HistoryAtletPage } from '../history-atlet/history-atlet';
import { LeaderboardAtletPage } from '../leaderboard-atlet/leaderboard-atlet';
import { RewardAtletPage } from '../reward-atlet/reward-atlet';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.profilePage = ProfilAtletPage;
    this.clubPage = ClubPage;
    this.questPage = QuestAtletPage;
    this.historyPage = HistoryAtletPage;
    this.leaderboardPage = LeaderboardAtletPage;
    this.rewardPage = RewardAtletPage;
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuAtletPage');
  }

}
