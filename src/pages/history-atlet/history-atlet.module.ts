import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HistoryAtletPage } from './history-atlet';

@NgModule({
  declarations: [
    HistoryAtletPage,
  ],
  imports: [
    IonicPageModule.forChild(HistoryAtletPage),
  ],
})
export class HistoryAtletPageModule {}
