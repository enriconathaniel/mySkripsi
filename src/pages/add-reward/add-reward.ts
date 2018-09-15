import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '../../../node_modules/@angular/forms';
import { WebService } from '../../service/WebService';
import { RewardAtletPage } from '../reward-atlet/reward-atlet';

/**
 * Generated class for the AddRewardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-reward',
  templateUrl: 'add-reward.html',
})
export class AddRewardPage {
  addrewardForm : FormGroup;
  rewardlist:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
      private builder: FormBuilder, private webService : WebService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddRewardPage');
    console.log("ini nav params", this.navParams.data)
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

  ngOnInit(){
    this.formCheck()
  }

  formCheck(){
    this.addrewardForm = this.builder.group({
      nama: ['', Validators.required]
      
    });
  }

  onSubmit(){
    let thisForm = this.addrewardForm.value;
    let req = {
      "nama_barang" : thisForm.nama,
      "id_reward" : this.navParams.data
    }
    console.log(req)
    this.webService.post("http://localhost:8080/api_skripsi/add_reward_barang.php", JSON.stringify(req), null).subscribe(response => {
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
