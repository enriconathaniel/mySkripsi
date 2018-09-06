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

  constructor(public navCtrl: NavController, public navParams: NavParams,
      private builder: FormBuilder, private webService : WebService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddRewardPage');
  }

  ngOnInit(){
    this.formCheck()
  }

  formCheck(){
    this.addrewardForm = this.builder.group({
      nama: ['', Validators.required],
      harga: ['', Validators.required],
      gambar: ['', Validators.required],
      
    });
  }

  onSubmit(){
    let thisForm = this.addrewardForm.value;
    let req = {
      "nama" : thisForm.nama,
      "harga" : thisForm.harga,
      "gambar" : thisForm.gambar
    }
    console.log(req)
    this.webService.post("http://localhost:8080/api_skripsi/addreward.php", JSON.stringify(req), null).subscribe(response => {
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
