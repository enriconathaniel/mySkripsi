import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginAtletPage } from './login-atlet';

@NgModule({
  declarations: [
    LoginAtletPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginAtletPage),
  ],
})
export class LoginAtletPageModule {}
