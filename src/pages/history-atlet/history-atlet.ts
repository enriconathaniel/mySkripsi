import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddTaskPage } from '../add-task/add-task';
import { AuthService } from '../../service/AuthService';
import { WebService } from '../../service/WebService';
import { Http } from '../../../node_modules/@angular/http';
import { HasilLatihanPage } from '../hasil-latihan/hasil-latihan';

/**
 * Generated class for the HistoryAtletPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-history-atlet',
  templateUrl: 'history-atlet.html',
})
export class HistoryAtletPage {
  addTaskPage:any;
  historyall:any;
  role:any;
  rolevalid:any;
  listlatihan:any;
  userlist:any;
  

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public http: Http, public webService: WebService, public authService: AuthService) {
    this.addTaskPage = AddTaskPage;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoryAtletPage');
    this.role = this.authService.role;
    if(this.role == 'pelatih'){
      this.rolevalid = true ;
    } else this.rolevalid = false;

    let req = {
      'id' : this.authService.id
    }
    console.log("cekdataidatlet", req)
    this.webService.post(this.webService.url + "gethasillatihan.php", JSON.stringify(req) ,null).subscribe(response => {
      //console.log(response["_body"]);
      let responseData = JSON.parse(response["_body"]);
      if(responseData){
        console.log(JSON.stringify(responseData))
        
        this.listlatihan = responseData;
        //console.log(this.classInfo);
      }
    }, error =>{
    })


    this.webService.get(this.webService.url + "getatletlist.php", null).subscribe(response => {
      //console.log(response["_body"]);
      let responseData = JSON.parse(response["_body"]);
      if(responseData){
        // console.log(JSON.stringify(responseData),'ASaas')
        
        this.userlist = responseData.map(function(element){
          element.isChecked = false;
          return element;
        });
        //console.log(this.classInfo);
      }
    }, error =>{
    })

  }

  infoatlet(id){
    this.navCtrl.push(HasilLatihanPage,id);

  }

}
