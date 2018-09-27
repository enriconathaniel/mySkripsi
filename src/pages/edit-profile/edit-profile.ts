import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import { WebService } from '../../service/WebService';
import { AuthService } from '../../service/AuthService';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ProfilAtletPage } from '../profil-atlet/profil-atlet';

/**
 * Generated class for the EditProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {
  infoatlet:any;
  editForm:FormGroup;
  constructor(
    public navCtrl: NavController,
    private app: App,
    public navParams: NavParams,
    public http: Http,
    private builder: FormBuilder,
    public webService: WebService,
    public authService: AuthService,
    public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfilePage');
    let req = {
      id: this.authService.id,
    };

    this.webService.post(this.webService.url + "getprofile.php",JSON.stringify(req), null).subscribe(response => {
      //console.log(response["_body"]);
      let responseData = JSON.parse(response["_body"]);
      if(responseData){
        console.log(JSON.stringify(responseData))
      
        this.infoatlet = responseData;
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
      atletname: ['', Validators.required]
      
    });
  }

  onEdit(){
    let thisForm = this.editForm.value;
    let req = {
      "id" : this.authService.id,
      "atletname" : thisForm.atletname
    }
    console.log(req)
    this.webService.post(this.webService.url + "update_atlet_profile.php", JSON.stringify(req), null).subscribe(response => {
      console.log(response,'<<<<<<<<<');
      let responseData = JSON.parse(response["_body"]);
      console.log(responseData)
      if(responseData['insert']){
        
        this.navCtrl.popTo(ProfilAtletPage);
      }
    }, error =>{
    })


  }

}
