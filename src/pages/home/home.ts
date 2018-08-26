import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginAtletPage } from '../login-atlet/login-atlet';
import { LoginPelatihPage } from '../login-pelatih/login-pelatih';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  loginAtlet:any;
  loginPelatih:any;
  constructor(public navCtrl: NavController) {
    this.loginAtlet = LoginAtletPage;
    this.loginPelatih = LoginPelatihPage;
  }

}
