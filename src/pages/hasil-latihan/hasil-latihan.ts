import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {AuthService} from '../../service/AuthService';
import {WebService} from '../../service/WebService';
import {Http} from '../../../node_modules/@angular/http';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { HistoryAtletPage } from '../history-atlet/history-atlet';
import { AlertCmp } from 'ionic-angular/components/alert/alert-component';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';

/**
 * Generated class for the HasilLatihanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-hasil-latihan',
  templateUrl: 'hasil-latihan.html',
})
export class HasilLatihanPage {
  idatlet = this.navParams.data;
  listlatihan: any;
  listlatihanlengkap: any;
  loading:any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http,
    public webService: WebService,
    public authService: AuthService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad HasilLatihanPage');

    let req = {
      id: this.idatlet,
    };
    this.presentLoading();
    console.log(req, '<<<<<<<<<>>>>>>>>>', this.idatlet);
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
            //console.log(this.classInfo);
          }
        },
        error => {},
      );
      this.dismissLoading();
  }

  onDelete(id_history){
    let req = {
      'id' : id_history
    }


    let alert = this.alertCtrl.create({
      title: 'Confirm Delete',
      message: 'Yakin anda akan menghapus data ini?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Hapus',
          handler: () => {
            
            console.log(req);
            this.webService.post(this.webService.url + "delete_hasil_latihan.php", JSON.stringify(req), null).subscribe(response => {
              //console.log(response["_body"]);
              let responseData = JSON.parse(response["_body"]);
              if(responseData['success']){
                console.log("cek hapus")
              
                this.navCtrl.popTo(HistoryAtletPage);
                //console.log(this.classInfo);
              }
            }, error =>{
            })

          }
        }
      ]
    });
    alert.present();
    
  }

  presentLoading(){
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    this.loading.present();

    // setTimeout(() => {
    //   loading.dismiss();
    // }, 5000);
  }

  dismissLoading(){
    this.loading.dismiss();
  }
}