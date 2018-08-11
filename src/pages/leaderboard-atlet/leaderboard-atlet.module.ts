import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LeaderboardAtletPage } from './leaderboard-atlet';

@NgModule({
  declarations: [
    LeaderboardAtletPage,
  ],
  imports: [
    IonicPageModule.forChild(LeaderboardAtletPage),
  ],
})
export class LeaderboardAtletPageModule {}
