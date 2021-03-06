import { Component, ViewChild } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

import { HomePage } from '../pages/home/home';
import { LoginAtletPage } from '../pages/login-atlet/login-atlet';
import { MenuAtletPage } from '../pages/menu-atlet/menu-atlet';
import { AuthService } from '../service/AuthService';
import { MenuPelatihPage } from '../pages/menu-pelatih/menu-pelatih';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  @ViewChild('sideMenuContent') nav: NavController;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, storage: Storage,
    private authService: AuthService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      storage.get('sessions').then((value) => {
        if (value != null && value.id !== '') {
          if(value.role == "atlet"){
            this.authService.id = value.id;
            this.authService.role = value.role;
            this.rootPage = MenuAtletPage;
          }
          else if(value.role == "pelatih"){
            this.authService.id = value.id;
            this.authService.role = value.role;
            this.rootPage = MenuPelatihPage;
          }
            
        } else {
          this.rootPage = HomePage;
        }
      });
    });
  }
}

