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
    this.webService.post(this.webService.url + "update_info_club.php", JSON.stringify(req), null).subscribe(response => {
      console.log(response,'<<<<<<<<<');
      let responseData = JSON.parse(response["_body"]);
      console.log(responseData)
      if(responseData['insert']){
        
        this.navCtrl.popTo(ClubPage);
      }
    }, error =>{
    })


  }

}
