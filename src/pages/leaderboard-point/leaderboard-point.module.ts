import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LeaderboardPointPage } from './leaderboard-point';

@NgModule({
  declarations: [
    LeaderboardPointPage,
  ],
  imports: [
    IonicPageModule.forChild(LeaderboardPointPage),
  ],
})
export class LeaderboardPointPageModule {}
