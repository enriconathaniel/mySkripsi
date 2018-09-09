import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, AlertController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { MenuAtletPage } from '../menu-atlet/menu-atlet';
import { AuthService } from '../../service/AuthService';
import { FormGroup , FormControl, FormBuilder, Validators} from '../../../node_modules/@angular/forms';

/**
 * Generated class for the LoginAtletPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login-atlet',
  templateUrl: 'login-atlet.html',
})
export class LoginAtletPage {
  loginForm: FormGroup;

  constructor(public navCtrl: NavController,private app:App, public navParams: NavParams,  public authService:AuthService,
    private builder: FormBuilder, private alertCtrl: AlertController ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginAtletPage');
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

  signInAtlet(){
    console.log(this.loginForm.value.email , this.loginForm.value.password);
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password, ()=>{
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

  openSignUpPage(){
    this.navCtrl.push(RegisterPage);
  }
}
