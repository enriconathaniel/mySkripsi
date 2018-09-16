import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {AuthService} from '../../service/AuthService';
import {Http} from '../../../node_modules/@angular/http';
import {WebService} from '../../service/WebService';

/**
 * Generated class for the SideQuestPelatihPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-side-quest-pelatih',
  templateUrl: 'side-quest-pelatih.html',
})
export class SideQuestPelatihPage {
  questlist: any;
  doneQuestList: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http,
    public webService: WebService,
    public authService: AuthService,
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SideQuestPelatihPage');

    let req = {
      id: this.authService.id,
    };

    this.webService
      .post(
        this.webService.url + 'get_side_quest.php',
        JSON.stringify(req),
        null,
      )
      .subscribe(
        response => {
          //console.log(response["_body"]);
          let responseData = JSON.parse(response['_body']);
          if (responseData) {
            console.log(JSON.stringify(responseData));

            this.questlist = responseData.filter(function(e) {
              return e.status == 'Belum selesai';
            });
            console.log(this.questlist);
            this.doneQuestList = responseData.filter(function(e) {
              return e.status == 'Selesai';
            });
            console.log(this.doneQuestList, 'done');

            //console.log(this.classInfo);
          }
        },
        error => {},
      );
  }
}