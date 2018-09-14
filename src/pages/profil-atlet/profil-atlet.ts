import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { ChangePasswordPage } from '../change-password/change-password';
import { Http, HttpModule } from '@angular/http';
import { WebService } from '../../service/WebService';
import { AuthService } from '../../service/AuthService';
import { HomePage } from '../home/home';
/**
 * Generated class for the ProfilAtletPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profil-atlet',
  templateUrl: 'profil-atlet.html',
})
export class ProfilAtletPage {
  
  changePassword:any;
  //infoprofile:any;
  

  infoprofile = {
    id: "",
    nama: "",
    tanggallahir: "",
    email:"",
    point:"",
    exp:"",
    level:""
  
  };

  levelatlet:any;

  constructor(public navCtrl: NavController, private app:App, public navParams: NavParams, public http: Http
  ,public webService: WebService, public authService: AuthService) {
    this.changePassword = ChangePasswordPage;

    // this.http.get('https://www.reddit.com/r/gifs/new/.json?limit=10').map(res => res.json()).subscribe(data => {
    //     this.infoprofile = data.data.children;
    // });
  }

  ionViewDidLoad() {
    
    let req = {
      'id' : this.authService.id
    }

    console.log('ionViewDidLoad ProfilAtletPage');
    this.webService.post(this.webService.url + "getprofile.php", JSON.stringify(req), null).subscribe(response => {
      //console.log(response["_body"]);
      let responseData = JSON.parse(response["_body"]);
      if(responseData){
        console.log(JSON.stringify(responseData))
      
        this.infoprofile = responseData[0];
        console.log("cekk", this.infoprofile)

        this.ceklevel(this.infoprofile.exp)



      }
    }, error =>{
    })

    

  }

  ceklevel(exp){
    this.webService.get(this.webService.url + "get_level_atlet.php", null).subscribe(response => {
      //console.log(response["_body"]);
      let responseData = JSON.parse(response["_body"]);
      if(responseData){
        console.log(JSON.stringify(responseData))
        this.levelatlet = responseData;
        console.log(this.levelatlet.length)


        for(let i=0; i < (this.levelatlet.length - 1); i++){
          if(exp <= "10000"){
            this.infoprofile.level = '50';
          }
          else if(this.levelatlet[i].exp_max < exp){
            console.log("cek data yang masuk ", i ," antaraa" , this.levelatlet)
           
            this.infoprofile.level = this.levelatlet[i+1].level;
            
          }
          
          

        }


        //console.log(this.classInfo);
      }
    }, error =>{
    })
    
  }


  logout(){
    this.authService.logout(() => {
      //set root
      this.app.getRootNav().setRoot(HomePage);
    });
  }

}
