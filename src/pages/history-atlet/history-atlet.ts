import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {AddTaskPage} from '../add-task/add-task';
import {AuthService} from '../../service/AuthService';
import {WebService} from '../../service/WebService';
import {Http} from '../../../node_modules/@angular/http';
import {HasilLatihanPage} from '../hasil-latihan/hasil-latihan';

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
  addTaskPage: any;
  historyall: any;
  role: any;
  rolevalid: any;
  listlatihan: any;
  listlatihanlengkap: any;
  userlist: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http,
    public webService: WebService,
    public authService: AuthService,
  ) {
    this.addTaskPage = AddTaskPage;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoryAtletPage');
    this.role = this.authService.role;
    if (this.role == 'pelatih') {
      this.rolevalid = true;
    } else this.rolevalid = false;

    let req = {
      id: this.authService.id,
    };
    console.log('cekdataidatlet', req);
    this.webService
      .post(
        this.webService.url + 'gethasillatihan.php',
        JSON.stringify(req),
        null,
      )
      .subscribe(
        response => {
          //console.log(response["_body"]);
          let responseData = JSON.parse(response['_body']);
          if (responseData) {
            console.log(JSON.stringify(responseData));

            this.listlatihan = responseData;
            this.listlatihanlengkap = responseData.map(function(element) {
              console.log(element, 'element');
              element.date = element.tanggal.substring(0, 2);
              switch (element.tanggal.substring(3, 5)) {
                case '01':
                  element.month = 'Jan';
                  break;
                case '02':
                  element.month = 'Feb';
                  break;
                case '03':
                  element.month = 'Mar';
                  break;
                case '04':
                  element.month = 'Apr';
                  break;
                case '05':
                  element.month = 'May';
                  break;
                case '06':
                  element.month = 'Jun';
                  break;
                case '07':
                  element.month = 'Jul';
                  break;
                case '08':
                  element.month = 'Aug';
                  break;
                case '09':
                  element.month = 'Sept';
                  break;
                case '10':
                  element.month = 'Oct';
                  break;
                case '11':
                  element.month = 'Nov';
                  break;
                case '12':
                  element.month = 'Dec';
                  break;
              }
              element.year = element.tanggal.substring(6, 10);
              return element;
            });
            console.log(this.listlatihanlengkap);
          }
        },
        error => {},
      );

    this.webService
      .get(this.webService.url + 'getatletlist.php', null)
      .subscribe(
        response => {
          //console.log(response["_body"]);
          let responseData = JSON.parse(response['_body']);
          if (responseData) {
            // console.log(JSON.stringify(responseData),'ASaas')

            this.userlist = responseData.map(function(element) {
              element.isChecked = false;
              return element;
            });
            //console.log(this.classInfo);
          }
        },
        error => {},
      );
  }

  infoatlet(id) {
    this.navCtrl.push(HasilLatihanPage, id);
  }
}