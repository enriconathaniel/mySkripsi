import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WebService } from '../../service/WebService';
import {FormGroup, Validators, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { HistoryAtletPage } from '../history-atlet/history-atlet';

/**
 * Generated class for the AddTaskPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-task',
  templateUrl: 'add-task.html',
})
export class AddTaskPage {
  addtaskForm:FormGroup;
  selectgaya:any;
  userlist:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private builder: FormBuilder, private webService : WebService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddTaskPage');

    this.webService.get(this.webService.url + "getgayarenang.php", null).subscribe(response => {
      //console.log(response["_body"]);
      let responseData = JSON.parse(response["_body"]);
      if(responseData){
        console.log(JSON.stringify(responseData))
        
        this.selectgaya = responseData;
        //console.log(this.classInfo);
      }
    }, error =>{
    })

    this.webService.get(this.webService.url + "getatletlist.php", null).subscribe(response => {
      //console.log(response["_body"]);
      let responseData = JSON.parse(response["_body"]);
      if(responseData){
        // console.log(JSON.stringify(responseData),'ASaas')
        
        this.userlist = responseData.map(function(element){
          element.isChecked = false;
          return element;
        });
        //console.log(this.classInfo);
      }
    }, error =>{
    })

  }

  ngOnInit(){
    this.formCheck()
  }

  formCheck(){
    this.addtaskForm = this.builder.group({
      deskripsi: ['', Validators.required],
      point: ['', Validators.required],
      max_umur: ['', Validators.required],
      min_exp: ['', Validators.required],
      max_exp: ['', Validators.required],
      repetition: ['', Validators.required],
      gaya: ['', Validators.required],
      waktu_target: ['', Validators.required]
      
    });
  }

  onSubmit(){
    let thisForm = this.addtaskForm.value;
    console.log(thisForm);
    let req = {
      "deskripsi" : thisForm.deskripsi,
      "point" : thisForm.point,
      "max_umur" : thisForm.max_umur,
      "min_exp" : thisForm.min_exp,
      "max_exp" : thisForm.max_exp,
      "repetition" : thisForm.repetition,
      "id_gaya" : thisForm.gaya,
      "waktu_target" : thisForm.waktu_target
    }
    console.log(req)
    this.webService.post("http://localhost:8080/api_skripsi/add_task.php", JSON.stringify(req), null).subscribe(response => {
      console.log(response,'<<<<<<<<<');
      let responseData = JSON.parse(response["_body"]);
      console.log(responseData)
      if(responseData['insert']){
        this.navCtrl.popTo(HistoryAtletPage);
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
