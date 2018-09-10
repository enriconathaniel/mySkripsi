import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../service/AuthService';
import { MenuAtletPage } from '../menu-atlet/menu-atlet';

/**
 * Generated class for the LoginPelatihPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login-pelatih',
  templateUrl: 'login-pelatih.html',
})
export class LoginPelatihPage {
  loginForm: FormGroup;
  constructor(public navCtrl: NavController, private app:App, 
              public navParams: NavParams, public authService:AuthService,
              private builder: FormBuilder, private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPelatihPage');
  }

  ngOnInit(){
    this.formCheck()
  }

  formCheck(){
    this.loginForm = this.builder.group({
      email: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(12)])]
    });
  }

  signInPelatih(){
    console.log(this.loginForm.value.email , this.loginForm.value.password);
    this.authService.login_pelatih(this.loginForm.value.email, this.loginForm.value.password, ()=>{
      this.app.getRootNav().setRoot(MenuAtletPage); 
      console.log("Kepangil")
    }, (errorType) => {
      if(errorType === 'INVALID_LOGIN_DATA'){
        let alert = this.alertCtrl.create({
            //title: 'Invalid E-mail or Password',
            subTitle: 'Invalid E-mail or Password',
            buttons: ['Dismiss']
        });
        alert.present();
      }
    }
    );

    // this.navCtrl.setRoot(MenuAtletPage);
  }

}
