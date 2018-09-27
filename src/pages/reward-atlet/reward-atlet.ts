import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import { WebService } from '../../service/WebService';
import { AddRewardPage } from '../add-reward/add-reward';
import { AuthService } from '../../service/AuthService';
import { HistoryRewardPage } from '../history-reward/history-reward';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';

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
  loading:any;
  infoprofile = {
    id: "",
    nama: "",
    tanggallahir: "",
    email:"",
    point:"",
    exp:""
  
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public http: Http, public webService: WebService, public authService: AuthService,
    public alertCtrl: AlertController, private loadingCtrl: LoadingController ) {
      this.addreward = AddRewardPage;
      this.historyreward = HistoryRewardPage;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RewardAtletPage');
    this.role = this.authService.role;
    if(this.role == 'pelatih'){
      this.rolevalid = true ;
    } else this.rolevalid = false;
    
    

  }
  ionViewWillEnter(){
    let req = {
      'id' : this.authService.id
    }
    this.presentLoading();
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

    this.dismissLoading();
  }

  addReward(id_reward){
    console.log("idbarangapaya" , id_reward)
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
      let alert = this.alertCtrl.create({
        title: 'Confirm purchase',
        message: 'Apakah anda akan membeli ini?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Beli',
            handler: () => {
              
              this.webService.post(this.webService.url + "update_atlet_reward.php", JSON.stringify(req_update), null).subscribe(response => {
                console.log(response,'<<<<<<<<<');
                let responseData = JSON.parse(response["_body"]);
                console.log(responseData,'responsedata 1');
                if(responseData['insert']){
                  
                  let req_history = {
                    'id_user' : this.authService.id,
                    'id_reward': idreward
                  }
                  console.log("cek_histori",req_history)
                  this.webService.post(this.webService.url + "add_history_reward.php", JSON.stringify(req_history), null).subscribe(response => {
                    console.log(response,'<<<<<<<<<');
                    let responseData = JSON.parse(response["_body"]);
                    console.log(responseData)
                    if(responseData['insert']){
                      this.navCtrl.popTo(RewardAtletPage);
                    }
                  }, error =>{
                  })
                }
              }, error =>{
              })

            }
          }
        ]
      });
      alert.present();
      
        

    }
    else if((pointatlet - rewardharga) < 0){
      let alert = this.alertCtrl.create({
        title: 'Point Kurang',
        subTitle: 'Point anda tidak cukup',
        buttons: [
          {
            text: 'Ok',
            handler: data => {
              
            }
          }
        ]
      });
      alert.present();
    }
  }

  onDelete(id_barang){
    let req = {
      'id' : id_barang
    }


    let alert = this.alertCtrl.create({
      title: 'Confirm Delete',
      message: 'Yakin anda akan menghapus data ini?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Hapus',
          handler: () => {
            
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
      ]
    });
    alert.present();
    
  }

  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: 'Confirm purchase',
      message: 'Do you want to buy this book?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Buy',
          handler: () => {
            
          }
        }
      ]
    });
    alert.present();
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
