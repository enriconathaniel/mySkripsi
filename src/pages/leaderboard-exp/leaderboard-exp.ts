import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { AuthService } from '../../service/AuthService';
import { WebService } from '../../service/WebService';
import { Http } from '@angular/http';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';

/**
 * Generated class for the LeaderboardExpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-leaderboard-exp',
  templateUrl: 'leaderboard-exp.html',
})
export class LeaderboardExpPage {
  leaderboardexp:any;
  loading:any;
  constructor(public navCtrl: NavController, private app:App, public navParams: NavParams, public http: Http
    ,public webService: WebService, public authService: AuthService, private loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LeaderboardExpPage');

    this.webService.get(this.webService.url + "get_leaderboard_exp.php", null).subscribe(response => {
      //console.log(response["_body"]);
      let responseData = JSON.parse(response["_body"]);
      if(responseData){
        console.log(JSON.stringify(responseData))
      
        this.leaderboardexp = responseData;
        //console.log(this.classInfo);
      }
    }, error =>{
    })

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
