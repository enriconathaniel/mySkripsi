import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DataQuestPage } from './data-quest';

@NgModule({
  declarations: [
    DataQuestPage,
  ],
  imports: [
    IonicPageModule.forChild(DataQuestPage),
  ],
})
export class DataQuestPageModule {}
