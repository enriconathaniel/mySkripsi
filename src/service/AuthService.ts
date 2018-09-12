import { Injectable } from '@angular/core';
import { WebService } from './WebService';
import { Headers } from '@angular/http';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Injectable()
export class AuthService{
    email = "";
    id: any;
    role: any;
    notification: "";
    rolepelatih : "pelatih";
    roleatlet: "atlet";

    constructor(private webSvc:WebService,
        private alertCtrl: AlertController,
         private storage: Storage,
        private webService: WebService){}

    login(email:string, password:string, onSuccess:Function, onFailed: Function){
        //let url = "http://delthraze.esy.es/Boopang/API/sign_in.php";
        //let url = "http://localhost/umnspa/login.php";
        let url = this.webService.url + "login.php";
        let requestData = {
            "email" : email,
            "password" : password,
        };

        let header = new Headers({
            'Content-Type': 'application/json'
        });

        this.webSvc.post(url, JSON.stringify(requestData), header)
        .subscribe(response => {
            console.log(response,'hhS');
            if(response == null){
                onFailed("NO_CONNECTION");
            }
            else{
                console.log(response["_body"]);
                let responseData:any = JSON.parse(response["_body"]);
                //console.log(JSON.stringify(responseData));
                if(responseData == null){
                    onFailed();
                }
                else if(responseData['success'] == true){
                    this.id = responseData['id'];
                    this.role = responseData['role'];
                    const session = {
                        id: responseData['id'],
                        role: responseData['role']
                    }
                    this.storage.set('sessions', session);
                    onSuccess();
                }
                else{
                    onFailed("INVALID_LOGIN_DATA");
                }
            }
        }, error => {
            onFailed();
        });
    }


    login_pelatih(email:string, password:string, onSuccess:Function, onFailed: Function){
        //let url = "http://delthraze.esy.es/Boopang/API/sign_in.php";
        //let url = "http://localhost/umnspa/login.php";
        let url = this.webService.url + "login_pelatih.php";
        let requestData = {
            "email" : email,
            "password" : password,
        };

        let header = new Headers({
            'Content-Type': 'application/json'
        });

        this.webSvc.post(url, JSON.stringify(requestData), header)
        .subscribe(response => {
            console.log(response,'hhS');
            if(response == null){
                onFailed("NO_CONNECTION");
            }
            else{
                console.log(response["_body"]);
                let responseData:any = JSON.parse(response["_body"]);
                //console.log(JSON.stringify(responseData));
                if(responseData == null){
                    onFailed();
                }
                else if(responseData['success'] == true){
                    this.id = responseData['id'];
                    this.role = responseData['role'];
                    const session = {
                        id: responseData['id'],
                        role: responseData['role']
                    }
                    this.storage.set('sessions', session);
                    onSuccess();
                }
                else{
                    onFailed("INVALID_LOGIN_DATA");
                }
            }
        }, error => {
            onFailed();
        });
    }
    
    logout(onSuccess:Function){
        const session = {
            id: '',
            role:''
        }
        this.storage.set('sessions', session);
        onSuccess();
    }

    presentAlert2() {
        
    }

    presentAlert(){
        console.log('invalid email pass')
        // swal({
        //     text: "Invalid E-mail or Password",
        //     icon: "warning",
        // })
    }
    
}