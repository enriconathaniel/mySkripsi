import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '../../../node_modules/@angular/forms';
import { WebService } from '../../service/WebService';
import { HistoryAtletPage } from '../history-atlet/history-atlet';

/**
 * Generated class for the CreateTaskPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-task',
  templateUrl: 'create-task.html',
})
export class CreateTaskPage {
  userchecked:any;
  allForm = this.navParams.data;
  createTaskForm: FormGroup;
  userlist: any;
  gayapick:any;
  addtask: FormArray;
  
  arrmenit:any =[];
  arrdetik:any = [];
  arrmilisecond:any=[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private builder: FormBuilder, private webService: WebService) {
  }

  ionViewDidLoad() {

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
    console.log("semua data " ,this.navParams.data)
    this.userlist = this.allForm.user_check;
    this.gayapick = this.allForm.gaya;

    const control = <FormArray> this.createTaskForm.controls.waktuRenangAtlet;
    for(let i=0; i<this.userlist.length; i++){
      control.push(
        this.builder.group({
          namaAtlit: [this.userlist[i].nama, Validators.required],
          idAtlit: [this.userlist[i].id, Validators.required],
          //waktuAtlit: ['', Validators.required],
          waktuMenit: ['', Validators.required],
          waktuDetik: ['', Validators.required],
          waktuMilisecond: ['', Validators.required]
        })
      );
    }
  }

  ngOnInit(){
    this.formCheck()
  }

  formCheck(){
    this.createTaskForm = this.builder.group({
      waktuRenangAtlet: this.builder.array([])
      // data_atlet: this.builder.array([]),
      // data_waktu: this.builder.array([]),
      //addtask: this.builder.array([this.createList()])
    });

    console.log(this.createTaskForm, "task form")
  }
  
  // createList(): FormGroup {
  //   return this.builder.group({
  //     data_atlet: '',
  //     data_waktu: ''
  //   });
  // }

  onSubmit(){
    console.log("waktu atlet >>>", this.createTaskForm.value.waktuRenangAtlet[0].namaAtlit)
    console.log(this.createTaskForm, "<<<cekdatamasukga")
    let thisForm = this.createTaskForm.value;

    for(let i = 0; i < this.userlist.length; i++){
      
      let req = {
        "id_user" : this.createTaskForm.value.waktuRenangAtlet[i].idAtlit,
        "id_gaya" : this.allForm.gaya,
        "waktu_target" : this.createTaskForm.value.waktuRenangAtlet[i].waktuMenit + ":" + 
                        this.createTaskForm.value.waktuRenangAtlet[i].waktuDetik + ":" + 
                        this.createTaskForm.value.waktuRenangAtlet[i].waktuMilisecond
      }
      console.log(req)
      
      
      this.webService.post("http://localhost:8080/api_skripsi/add_history_latihan.php", JSON.stringify(req), null).subscribe(response => {
        console.log(response,'<<<<<<<<<');
        let responseData = JSON.parse(response["_body"]);
        console.log(responseData)
        if(responseData['insert']){
          this.navCtrl.popTo(HistoryAtletPage);

          let req2 = {
            "id_user" : this.createTaskForm.value.waktuRenangAtlet[i].idAtlit
          }

          this.webService.post("http://localhost:8080/api_skripsi/update_atlet_latihan.php", JSON.stringify(req2), null).subscribe(response => {
            console.log(response,'<<<<<<<<<');
            let responseData = JSON.parse(response["_body"]);
            console.log(responseData)
          }, error =>{
          })


        }
      }, error =>{
      })

      

    } 

    

    
  }

}
