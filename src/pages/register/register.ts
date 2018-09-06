import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '../../../node_modules/@angular/forms';
import { WebService } from '../../service/WebService';
import { LoginAtletPage } from '../login-atlet/login-atlet';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  RegisterForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private builder: FormBuilder, private webService : WebService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  ngOnInit(){
    this.formCheck()
  }

  formCheck(){
    this.RegisterForm = this.builder.group({
      nama: ['', Validators.required],
      tanggallahir: ['', Validators.required],
      email: ['', Validators.compose([Validators.required])],
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
    let thisForm = this.RegisterForm.value;
    let req = {
      "nama" : thisForm.nama,
      "tanggallahir" : thisForm.tanggallahir,
      "email" : thisForm.email,
      "password" : thisForm.password
    }
    console.log(req)
    this.webService.post("http://localhost:8080/api_skripsi/register.php", JSON.stringify(req), null).subscribe(response => {
      console.log(response,'<<<<<<<<<');
      let responseData = JSON.parse(response["_body"]);
      console.log(responseData)
      if(responseData['success']){
        // let x = this.AuthService.signup(
        //   this.SignUpForm.value.first_name, this.SignUpForm.value.last_name,
        //   this.SignUpForm.value.email, this.SignUpForm.value.no_hp, 
        //   this.SignUpForm.value.password, ()=>{ console.log("Kepangil")}
        // );
        //let x = this.AuthService.signup(this.RegisterForm.value.email, this.RegisterForm.value.password)
        this.navCtrl.popTo(LoginAtletPage);
      }
    }, error =>{
    })
  }


}
