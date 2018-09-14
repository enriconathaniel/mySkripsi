import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup } from '@angular/forms/src/model';
import { FormBuilder, Validators } from '@angular/forms';
import { WebService } from '../../service/WebService';
import { MenuAtletPage } from '../menu-atlet/menu-atlet';
import { AuthService } from '../../service/AuthService';

/**
 * Generated class for the ChangePasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html',
})
export class ChangePasswordPage {
  changePasswordForm: FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private builder: FormBuilder, private webService : WebService,public authService: AuthService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangePasswordPage');
  }
  ngOnInit(){
    this.formCheck()
  }

  formCheck(){
    this.changePasswordForm = this.builder.group({
      old_password: ['', Validators.required],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(12)])],
      confirm_password: ['', Validators.required],
    }, {validator: this.matchingPasswords('password', 'confirm_password')});
  }

  matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    // TODO maybe use this https://github.com/yuyang041060120/ng2-validation#notequalto-1
    return (group: FormGroup): {[key: string]: any} => {
      let password = group.controls[passwordKey];
      let confirmPassword = group.controls[confirmPasswordKey];

      if (password.value !== confirmPassword.value) {
        return {
          mismatchedPasswords: true
        };
      }
    }
  }


  onSubmit(){

    let thisForm = this.changePasswordForm.value;


    let req_password = {
      "id" : this.authService.id,
      
      "password" : thisForm.old_password
    }
    console.log(req_password)
    this.webService.post("http://localhost:8080/api_skripsi/get_check_oldpassword.php", JSON.stringify(req_password), null).subscribe(response => {
      console.log(response,'<<<<<<<<<');
      let responseData = JSON.parse(response["_body"]);
      console.log(responseData)
      if(responseData['success']){
        console.log(responseData['email']);
        console.log("password bener")

        let req = {
          "id" : this.authService.id,
          "email": responseData['email'],
          "password" : thisForm.password
        }
        console.log(req)
        this.webService.post("http://localhost:8080/api_skripsi/update_password.php", JSON.stringify(req), null).subscribe(response => {
          console.log(response,'<<<<<<<<<');
          let responseData = JSON.parse(response["_body"]);
          console.log(responseData)
          if(responseData['insert']){
            console.log("passwordganti" , thisForm.password)
            this.navCtrl.popTo(MenuAtletPage);
          }
        }, error =>{
        })



      }
    }, error =>{
    })




    


  }

}
