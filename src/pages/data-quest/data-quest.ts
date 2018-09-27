import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '../../../node_modules/@angular/http';
import { WebService } from '../../service/WebService';
import { AuthService } from '../../service/AuthService';
import { RewardAtletPage } from '../reward-atlet/reward-atlet';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { QuestAtletPage } from '../quest-atlet/quest-atlet';

/**
 * Generated class for the DataQuestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-data-quest',
  templateUrl: 'data-quest.html',
})
export class DataQuestPage {
  questlist:any;
  doneQuestList:any;
  idatlet = this.navParams.data;
  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public http: Http, public webService: WebService, public authService: AuthService,
    public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DataQuestPage');

    let req = {
      'id' : this.idatlet
    }

    this.webService.post(this.webService.url + "getquest.php", JSON.stringify(req), null).subscribe(response => {
      //console.log(response["_body"]);
      let responseData = JSON.parse(response["_body"]);
      if(responseData){
        console.log(JSON.stringify(responseData))
        
        this.questlist = responseData.filter(function(e){
          return e.status == '0';
        });
        this.doneQuestList = responseData.filter(function(e){
          return e.status == '1';
        });
        //console.log(this.classInfo);
      }
    }, error =>{
    })
  }
  onDelete(id_quest){
    let req = {
      'id' : id_quest
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
            this.webService.post(this.webService.url + "delete_main_quest.php", JSON.stringify(req), null).subscribe(response => {
              //console.log(response["_body"]);
              let responseData = JSON.parse(response["_body"]);
              if(responseData['success']){
                console.log("cek hapus")
              
                this.navCtrl.popTo(QuestAtletPage);
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

}
