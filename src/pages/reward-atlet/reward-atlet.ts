import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { WebService } from '../../service/WebService';
import { AddRewardPage } from '../add-reward/add-reward';
import { AuthService } from '../../service/AuthService';
import { HistoryRewardPage } from '../history-reward/history-reward';

/**
 * Generated class for the RewardAtletPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reward-atlet',
  templateUrl: 'reward-atlet.html',
})
export class RewardAtletPage {
  historyreward:any;
  rewardlist:any;
  addreward:any;
  role:any;
  rolevalid:any;
  list_barang:any;
  arrgold:any = [];
  arrsilver:any = [];
  arrbronze:any = [];
  infoprofile = {
    id: "",
    nama: "",
    tanggallahir: "",
    email:"",
    point:"",
    exp:""
  
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public http: Http, public webService: WebService, public authService: AuthService ) {
      this.addreward = AddRewardPage;
      this.historyreward = HistoryRewardPage;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RewardAtletPage');
    this.role = this.authService.role;
    if(this.role == 'pelatih'){
      this.rolevalid = true ;
    } else this.rolevalid = false;
    
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
        //console.log(this.classInfo);
      }
    }, error =>{
    })

    this.webService.get(this.webService.url + "get_reward_barang.php", null).subscribe(response => {
      //console.log(response["_body"]);
      let responseData = JSON.parse(response["_body"]);
      if(responseData){
        console.log(JSON.stringify(responseData))
        this.rewardlist = responseData;

       

        //this.list_barang = responseData;
        //console.log(this.classInfo);
      }
    }, error =>{
    })

  }

  addReward(id_reward){
    this.navCtrl.push(AddRewardPage, id_reward)
  }


  onSubmit(idreward, rewardharga, pointatlet){
    //let thisForm = this.addrewardForm.value;
    
    if((pointatlet - rewardharga) >= 0){
      let req_update = {
        'id_user' : this.authService.id,
        'harga': rewardharga
      }
      
      console.log("update req ",req_update)


      this.webService.post("http://localhost:8080/api_skripsi/update_atlet_reward.php", JSON.stringify(req_update), null).subscribe(response => {
        console.log(response,'<<<<<<<<<');
        let responseData = JSON.parse(response["_body"]);
        console.log(responseData,'responsedata 1');
        if(responseData['insert']){
          
          let req_history = {
            'id_user' : this.authService.id,
            'id_reward': idreward
          }
          console.log("cek_histori",req_history)
          this.webService.post("http://localhost:8080/api_skripsi/add_history_reward.php", JSON.stringify(req_history), null).subscribe(response => {
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

              this.navCtrl.popTo(RewardAtletPage);
            }
          }, error =>{
          })

          
        }
      }, error =>{
      })

    }
    else if((pointatlet - rewardharga) < 0){
      console.log("kurangduitnyaaa")
    }

    


  }

  onDelete(id_barang){
    let req = {
      'id' : id_barang
    }

    console.log(req);
    this.webService.post(this.webService.url + "delete_data_barang.php", JSON.stringify(req), null).subscribe(response => {
      //console.log(response["_body"]);
      let responseData = JSON.parse(response["_body"]);
      if(responseData['success']){
        console.log("cek hapus")
      
        this.navCtrl.popTo(RewardAtletPage);
        //console.log(this.classInfo);
      }
    }, error =>{
    })
  }

}
