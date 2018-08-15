import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddRewardPage } from './add-reward';

@NgModule({
  declarations: [
    AddRewardPage,
  ],
  imports: [
    IonicPageModule.forChild(AddRewardPage),
  ],
})
export class AddRewardPageModule {}
