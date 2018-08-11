import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginAtletPage } from '../pages/login-atlet/login-atlet';
import { MenuAtletPage } from '../pages/menu-atlet/menu-atlet';
import { ProfilAtletPage } from '../pages/profil-atlet/profil-atlet';
import { ClubPage } from '../pages/club/club';
import { QuestAtletPage } from '../pages/quest-atlet/quest-atlet';
import { HistoryAtletPage } from '../pages/history-atlet/history-atlet';
import { LeaderboardAtletPage } from '../pages/leaderboard-atlet/leaderboard-atlet';
import { RewardAtletPage } from '../pages/reward-atlet/reward-atlet';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginAtletPage,
    MenuAtletPage,
    ProfilAtletPage,
    ClubPage,
    QuestAtletPage,
    HistoryAtletPage,
    LeaderboardAtletPage,
    RewardAtletPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginAtletPage,
    MenuAtletPage,
    ProfilAtletPage,
    ClubPage,
    QuestAtletPage,
    HistoryAtletPage,
    LeaderboardAtletPage,
    RewardAtletPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
