import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WebService } from '../../service/WebService';
import {FormGroup, Validators, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { HistoryAtletPage } from '../history-atlet/history-atlet';
import { CreateTaskPage } from '../create-task/create-task';

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

  userCollection : {id: string, nama: string}[];
  
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
      gaya: ['', Validators.required],

      user_check: this.builder.array([])
    });
    console.log(this.addtaskForm, "task form")
  }

  onSubmit(){
    console.log(this.addtaskForm, "cekdataaddtask")
    this.navCtrl.push(CreateTaskPage, this.addtaskForm.value);
  }

  onChange(id: string, nama: string, checked){
    const answers = <FormArray>this.addtaskForm.controls.user_check
    if(checked) {
        answers.push(new FormControl({id: id, nama: nama}))
    } else{ 
        let idx = answers.controls.findIndex(x => x.value.id == id)
        if(idx > -1){
          answers.removeAt(idx)
        }

    }
    
  }
  

}
