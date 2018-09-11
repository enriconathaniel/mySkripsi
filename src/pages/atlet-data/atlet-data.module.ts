import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AtletDataPage } from './atlet-data';

@NgModule({
  declarations: [
    AtletDataPage,
  ],
  imports: [
    IonicPageModule.forChild(AtletDataPage),
  ],
})
export class AtletDataPageModule {}
