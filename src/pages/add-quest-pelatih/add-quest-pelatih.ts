import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Thumbnail } from 'ionic-angular';
import { FormBuilder, Validators, FormArray, FormControl } from '../../../node_modules/@angular/forms';
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
  selectgaya:any;
  userlist:any;
  arrmenit:any =[];
  arrdetik:any = [];
  arrmilisecond:any=[];

  userCollection : {id: string, nama: string}[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
      private builder: FormBuilder, private webService : WebService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddQuestPelatihPage');

    for(let i = 0 ; i < 60 ; i++){
      let index = i.toString();
        if(i<10){
        index = '0'+i;
        }
        this.arrmenit.push(index);
        this.arrdetik.push(index);
      }
    for(let i = 0 ; i < 100 ; i++){
      let index = i.toString();
      if(i<10){
        index = '0'+i;
        }
      this.arrmilisecond.push(index);
  }
    console.log(this.arrmenit,'arrmn');

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
  }

  ngOnInit(){
    this.formCheck()
  }

  formCheck(){
    this.addquestForm = this.builder.group({
      user_check: this.builder.array([]),
      id_gaya: ['', Validators.required],
      menit_target: ['', Validators.required],
      detik_target: ['', Validators.required],
      milisecond_target: ['', Validators.required],
      
    });
  }

  onChange(id: string, nama: string, checked){
    const answers = <FormArray>this.addquestForm.controls.user_check
    if(checked) {
        answers.push(new FormControl({id: id, nama: nama}))
    } else{ 
        let idx = answers.controls.findIndex(x => x.value.id == id)
        if(idx > -1){
          answers.removeAt(idx)
        }

    }
    
  }

  onSubmit(){
    
    let thisForm = this.addquestForm.value;
    console.log("cek data", thisForm.user_check.length)

    for(let i = 0 ; i < thisForm.user_check.length; i++){
      let req = {
        "id_atlet" : thisForm.user_check[i].id,
        "id_gaya" : thisForm.id_gaya,
        "waktu_target" : thisForm.menit_target + ":" + thisForm.detik_target + ":" + thisForm.milisecond_target
      }
      console.log(req)
      this.webService.post("http://localhost:8080/api_skripsi/add_main_quest.php", JSON.stringify(req), null).subscribe(response => {
        console.log(response,'<<<<<<<<<');
        let responseData = JSON.parse(response["_body"]);
        console.log(responseData)
        if(responseData['insert']){
          
          this.navCtrl.popTo(QuestAtletPage);
        }
      }, error =>{
      })
    }

    
    
  }

}
