import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { WebService } from '../../service/WebService';
import { AuthService } from '../../service/AuthService';
import { Http } from '@angular/http';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';

/**
 * Generated class for the LeaderboardPointPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-leaderboard-point',
  templateUrl: 'leaderboard-point.html',
})
export class LeaderboardPointPage {
  leaderboardpoint:any;
  loading:any;
  constructor(public navCtrl: NavController, private app:App, public navParams: NavParams, public http: Http
    ,public webService: WebService, public authService: AuthService, private loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LeaderboardPointPage');
    this.presentLoading();
    this.webService.get(this.webService.url + "get_leaderboard_point.php", null).subscribe(response => {
      console.log(response["_body"]);
      let responseData = JSON.parse(response["_body"]);
      if(responseData){
        console.log(JSON.stringify(responseData))
        
        this.leaderboardpoint = responseData;
        //console.log(this.classInfo);
      }
    }, error =>{
    })
    this.dismissLoading();
  }

  public sortByKey(array, key) {
    return array.sort(function (a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 0 : 1));
    });
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
