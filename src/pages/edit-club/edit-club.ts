import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WebService } from '../../service/WebService';
import { FormBuilder, FormGroup, Validators } from '../../../node_modules/@angular/forms';
import { ClubPage } from '../club/club';

/**
 * Generated class for the EditClubPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-club',
  templateUrl: 'edit-club.html',
})
export class EditClubPage {
  idclub = this.navParams.data;
  id_club:any;
  infoclub:any;
  editForm:FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private builder: FormBuilder, private webService: WebService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditClubPage');
    this.id_club = this.idclub
    console.log(this.id_club)

    this.webService.get(this.webService.url + "getclub.php", null).subscribe(response => {
      //console.log(response["_body"]);
      let responseData = JSON.parse(response["_body"]);
      if(responseData){
        console.log(JSON.stringify(responseData))
      
        this.infoclub = responseData;
        //console.log(this.classInfo);
      }
    }, error =>{
    })

  }

  ngOnInit(){
    this.formCheck()
  }

  formCheck(){
    this.editForm = this.builder.group({
      clubinfo: ['', Validators.required]
      
    });
  }

  onEdit(){
    let thisForm = this.editForm.value;
    let req = {
      "clubinfo" : thisForm.clubinfo
    }
    console.log(req)
    this.webService.post("http://localhost:8080/api_skripsi/update_info_club.php", JSON.stringify(req), null).subscribe(response => {
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

        this.navCtrl.popTo(ClubPage);
      }
    }, error =>{
    })


  }

}
