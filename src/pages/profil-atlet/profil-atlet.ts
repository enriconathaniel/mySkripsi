import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ChangePasswordPage } from '../change-password/change-password';

/**
 * Generated class for the ProfilAtletPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profil-atlet',
  templateUrl: 'profil-atlet.html',
})
export class ProfilAtletPage {
  changePassword:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.changePassword = ChangePasswordPage;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilAtletPage');
  }

}
