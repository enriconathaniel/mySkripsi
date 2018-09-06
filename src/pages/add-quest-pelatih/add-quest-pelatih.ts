import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators } from '../../../node_modules/@angular/forms';
import { WebService } from '../../service/WebService';
import { QuestAtletPage } from '../quest-atlet/quest-atlet';

/**
 * Generated class for the AddQuestPelatihPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-quest-pelatih',
  templateUrl: 'add-quest-pelatih.html',
})
export class AddQuestPelatihPage {
  addquestForm:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
      private builder: FormBuilder, private webService : WebService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddQuestPelatihPage');
  }

  ngOnInit(){
    this.formCheck()
  }

  formCheck(){
    this.addquestForm = this.builder.group({
      deskripsi: ['', Validators.required],
      point: ['', Validators.required],
      max_umur: ['', Validators.required],
      min_exp: ['', Validators.required],
      max_exp: ['', Validators.required],
      repetition: ['', Validators.required],
      
    });
  }

  onSubmit(){
    let thisForm = this.addquestForm.value;
    let req = {
      "deskripsi" : thisForm.deskripsi,
      "point" : thisForm.point,
      "max_umur" : thisForm.max_umur,
      "min_exp" : thisForm.min_exp,
      "max_exp" : thisForm.max_exp,
      "repetition" : thisForm.repetition
    }
    console.log(req)
    this.webService.post("http://localhost:8080/api_skripsi/add_quest.php", JSON.stringify(req), null).subscribe(response => {
      console.log(response,'<<<<<<<<<');
      let responseData = JSON.parse(response["_body"]);
      console.log(responseData)
      if(responseData['insert']){
        this.navCtrl.popTo(QuestAtletPage);
        //this.navCtrl.push(QuestAtletPage);
        // let x = this.AuthService.signup(
        //   this.SignUpForm.value.first_name, this.SignUpForm.value.last_name,
        //   this.SignUpForm.value.email, this.SignUpForm.value.no_hp, 
        //   this.SignUpForm.value.password, ()=>{ console.log("Kepangil")}
        // );
        //let x = this.AuthService.signup(this.RegisterForm.value.email, this.RegisterForm.value.password)
      }
    }, error =>{
    })
  }

}
