import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { WebService } from '../../service/WebService';
import { AddRewardPage } from '../add-reward/add-reward';
import { AuthService } from '../../service/AuthService';
import { HistoryRewardPage } from '../history-reward/history-reward';

/**
 * Generated class for the RewardAtletPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reward-atlet',
  templateUrl: 'reward-atlet.html',
})
export class RewardAtletPage {
  historyreward:any;
  rewardlist:any;
  addreward:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public http: Http, public webService: WebService, public authService: AuthService ) {
      this.addreward = AddRewardPage;
      this.historyreward = HistoryRewardPage;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RewardAtletPage');

    this.webService.get(this.webService.url + "getreward.php", null).subscribe(response => {
      //console.log(response["_body"]);
      let responseData = JSON.parse(response["_body"]);
      if(responseData){
        console.log(JSON.stringify(responseData))
        
        this.rewardlist = responseData;
        //console.log(this.classInfo);
      }
    }, error =>{
    })

  }

  onSubmit(idreward, rewardharga){
    //let thisForm = this.addrewardForm.value;
    let req = {
      'id_user' : this.authService.id,
      'id_reward': idreward
    }
    console.log(req)
    this.webService.post("http://localhost:8080/api_skripsi/add_history_reward.php", JSON.stringify(req), null).subscribe(response => {
      console.log(response,'<<<<<<<<<');
      let responseData = JSON.parse(response["_body"]);
      console.log(responseData)
      if(responseData['insert']){
        // let x = this.AuthService.signup(
        //   this.SignUpForm.value.first_name, this.SignUpForm.value.last_name,
        //   this.SignUpForm.value.email, this.SignUpForm.value.no_hp, 
        //   this.SignUpForm.value.password, ()=>{ console.log("Kepangil")}
        // );
        //let x = this.AuthService.signup(this.RegisterForm.value.email, this.RegisterForm.value.password)

        this.navCtrl.popTo(RewardAtletPage);
      }
    }, error =>{
    })
  }

}
