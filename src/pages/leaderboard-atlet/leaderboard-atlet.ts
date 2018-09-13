import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LeaderboardExpPage } from '../leaderboard-exp/leaderboard-exp';
import { LeaderboardPointPage } from '../leaderboard-point/leaderboard-point';

/**
 * Generated class for the LeaderboardAtletPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-leaderboard-atlet',
  templateUrl: 'leaderboard-atlet.html',
})
export class LeaderboardAtletPage {
  tab1Root = LeaderboardExpPage;
  tab2Root = LeaderboardPointPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LeaderboardAtletPage');

    
  }

}
