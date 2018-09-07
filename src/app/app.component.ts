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
import { AddQuestPelatihPage } from '../pages/add-quest-pelatih/add-quest-pelatih';
import { MainQuestPelatihPage } from '../pages/main-quest-pelatih/main-quest-pelatih';
import { SideQuestPelatihPage } from '../pages/side-quest-pelatih/side-quest-pelatih';
import { AddTaskPage } from '../pages/add-task/add-task';
import { CreateTaskPage } from '../pages/create-task/create-task';
import { AddRewardPage } from '../pages/add-reward/add-reward';
import { ChangePasswordPage } from '../pages/change-password/change-password';
import { LoginPelatihPage } from '../pages/login-pelatih/login-pelatih';
import { RegisterPage } from '../pages/register/register';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = MenuAtletPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

