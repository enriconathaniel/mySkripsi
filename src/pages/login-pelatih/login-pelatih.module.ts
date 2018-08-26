import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginPelatihPage } from './login-pelatih';

@NgModule({
  declarations: [
    LoginPelatihPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginPelatihPage),
  ],
})
export class LoginPelatihPageModule {}
