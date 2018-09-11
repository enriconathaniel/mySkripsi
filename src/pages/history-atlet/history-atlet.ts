import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddTaskPage } from '../add-task/add-task';
import { AuthService } from '../../service/AuthService';
import { WebService } from '../../service/WebService';
import { Http } from '../../../node_modules/@angular/http';

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
  historyall:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public http: Http, public webService: WebService, public authService: AuthService) {
    this.addTaskPage = AddTaskPage;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoryAtletPage');

    this.webService.get(this.webService.url + "get_hasil_latihan_all.php", null).subscribe(response => {
      //console.log(response["_body"]);
      let responseData = JSON.parse(response["_body"]);
      if(responseData){
        console.log(JSON.stringify(responseData))
        
        this.historyall = responseData;
        //console.log(this.classInfo);
      }
    }, error =>{
    })

  }

}
