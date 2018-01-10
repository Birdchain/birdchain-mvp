import { Component, ViewChild, OnInit } from "@angular/core";
import { NavController, Platform } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { Storage } from "@ionic/storage";
import { ScreenOrientation } from "@ionic-native/screen-orientation";
import { LayoutComponent } from "../pages/layout/layout.component";
import { StartComponent } from '../pages/start';

@Component({
    templateUrl: "app.html"
})
export class MyApp implements OnInit {
    @ViewChild("nav") navCtrl: NavController;
    rootPage: any;

    constructor(
        platform: Platform,
        statusBar: StatusBar,
        splashScreen: SplashScreen,
        screenOrientation: ScreenOrientation,
        private storage: Storage
    ) {
        platform.ready().then(() => {
            if (platform.is('android')) {
                screenOrientation.lock(screenOrientation.ORIENTATIONS.PORTRAIT);
            }
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }

    ngOnInit() {
        this.rootPage = StartComponent;

        this.storage.get("authToken").then(res => {
            if (res) {
                this.navCtrl.push(LayoutComponent);
            }
        });
    }
}
