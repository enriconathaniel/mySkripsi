import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddTaskPage } from '../add-task/add-task';

/**
 * Generated class for the HistoryAtletPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-history-atlet',
  templateUrl: 'history-atlet.html',
})
export class HistoryAtletPage {
  addTaskPage:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.addTaskPage = AddTaskPage;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoryAtletPage');
  }

}
