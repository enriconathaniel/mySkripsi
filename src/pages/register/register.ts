import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '../../../node_modules/@angular/forms';
import { WebService } from '../../service/WebService';
import { LoginAtletPage } from '../login-atlet/login-atlet';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';

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
  loading:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private builder: FormBuilder, private webService : WebService,
    public loadingCtrl: LoadingController, public alertCtrl: AlertController) {
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
    this.presentLoading();
    this.webService.post(this.webService.url + "register.php", JSON.stringify(req), null).subscribe(response => {
      console.log(response,'<<<<<<<<<');
      let responseData = JSON.parse(response["_body"]);
      console.log(responseData)
      if(responseData['success']){
        let alert = this.alertCtrl.create({
          title: 'Success',
          subTitle: 'Daftar anggota baru telah berhasil, silahkan login',
          buttons: [
            {
              text: 'Ok',
              handler: data => {
                
              }
            }
          ]
        });
        alert.present();
        this.navCtrl.popTo(LoginAtletPage);

      }
    }, error =>{
    })
    this.dismissLoading();
  }

  presentLoading(){
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    this.loading.present();

    // setTimeout(() => {
    //   loading.dismiss();
    // }, 5000);
  }

  dismissLoading(){
    this.loading.dismiss();
  }

}
