import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginAtletPage } from '../pages/login-atlet/login-atlet';
import { MenuAtletPage } from '../pages/menu-atlet/menu-atlet';
import { ProfilAtletPage } from '../pages/profil-atlet/profil-atlet';
import { ClubPage } from '../pages/club/club';
import { QuestAtletPage } from '../pages/quest-atlet/quest-atlet';
import { HistoryAtletPage } from '../pages/history-atlet/history-atlet';
import { LeaderboardAtletPage } from '../pages/leaderboard-atlet/leaderboard-atlet';
import { RewardAtletPage } from '../pages/reward-atlet/reward-atlet';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

