import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { FileTransfer } from '@ionic-native/file-transfer';

import { File } from '@ionic-native/file';
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
import { AddQuestPelatihPage } from '../pages/add-quest-pelatih/add-quest-pelatih';
import { MainQuestPelatihPage } from '../pages/main-quest-pelatih/main-quest-pelatih';
import { SideQuestPelatihPage } from '../pages/side-quest-pelatih/side-quest-pelatih';
import { AddTaskPage } from '../pages/add-task/add-task';
import { CreateTaskPage } from '../pages/create-task/create-task';
import { AddRewardPage } from '../pages/add-reward/add-reward';
import { ChangePasswordPage } from '../pages/change-password/change-password';
import { LoginPelatihPage } from '../pages/login-pelatih/login-pelatih';
import { WebService } from '../service/WebService';
//import { SQLite } from '../../node_modules/@ionic-native/sqlite';
// import { FormsModule } from '@angular/forms';

import { Http } from '../../node_modules/@angular/http';
import { HttpModule } from '@angular/http';
import { RegisterPage } from '../pages/register/register';
import { AuthService } from '../service/AuthService';
import { IonicStorageModule } from '../../node_modules/@ionic/storage';
import { HistoryRewardPage } from '../pages/history-reward/history-reward';
import { EditClubPage } from '../pages/edit-club/edit-club';
import { AtletDataPage } from '../pages/atlet-data/atlet-data';
import { MenuPelatihPage } from '../pages/menu-pelatih/menu-pelatih';
import { HasilLatihanPage } from '../pages/hasil-latihan/hasil-latihan';
import { LeaderboardExpPage } from '../pages/leaderboard-exp/leaderboard-exp';
import { LeaderboardPointPage } from '../pages/leaderboard-point/leaderboard-point';
import { DataQuestPage } from '../pages/data-quest/data-quest';
import { EditProfilePage } from '../pages/edit-profile/edit-profile';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginAtletPage,
    LoginPelatihPage,
    MenuAtletPage,
    ProfilAtletPage,
    ClubPage,
    QuestAtletPage,
    HistoryAtletPage,
    LeaderboardAtletPage,
    RewardAtletPage,
    AddQuestPelatihPage,
    MainQuestPelatihPage,
    SideQuestPelatihPage,
    AddTaskPage,
    CreateTaskPage,
    AddRewardPage,
    ChangePasswordPage,
    RegisterPage,
    HistoryRewardPage,
    EditClubPage,
    AtletDataPage,
    MenuPelatihPage,
    HasilLatihanPage,
    LeaderboardExpPage,
    LeaderboardPointPage,
    DataQuestPage,
    EditProfilePage
    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    IonicStorageModule.forRoot()
    // FormsModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginAtletPage,
    LoginPelatihPage,
    MenuAtletPage,
    ProfilAtletPage,
    ClubPage,
    QuestAtletPage,
    HistoryAtletPage,
    LeaderboardAtletPage,
    RewardAtletPage,
    AddQuestPelatihPage,
    MainQuestPelatihPage,
    SideQuestPelatihPage,
    AddTaskPage,
    CreateTaskPage,
    AddRewardPage,
    ChangePasswordPage,
    RegisterPage,
    HistoryRewardPage,
    EditClubPage,
    AtletDataPage,
    MenuPelatihPage,
    HasilLatihanPage,
    LeaderboardExpPage,
    LeaderboardPointPage,
    DataQuestPage,
    EditProfilePage
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    // Http,
    AuthService,
    WebService,
    //DatabaseService,
    //SettingsService,
    //SQLite,
    HttpModule,
    //FileTransfer,
    //FileUploadOptions,
    //FileTransferObject,
    //File,
    //OneSignal,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
