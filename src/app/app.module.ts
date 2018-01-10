import { NgModule, ErrorHandler } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { IonicApp, IonicModule, IonicErrorHandler } from "ionic-angular";
import { MyApp } from "./app.component";

import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { ScreenOrientation } from "@ionic-native/screen-orientation";
import { IonicStorageModule } from "@ionic/storage";
import { LayoutComponent } from "../pages/layout";
import { ConversationsComponent } from "../pages/conversations";
import { MessagesComponent } from "../pages/messages";
import { WalletComponent } from "../pages/wallet";
import { SettingsComponent } from "../pages/settings";
import { StartComponent } from "../pages/start";
import { DatabaseService } from "./database.service";
import { IntroComponent } from '../pages/intro';

@NgModule({
    declarations: [
        MyApp,
        StartComponent,
        LayoutComponent,
        ConversationsComponent,
        MessagesComponent,
        WalletComponent,
        SettingsComponent,
        IntroComponent
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),
        IonicStorageModule.forRoot()
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        StartComponent,
        LayoutComponent,
        IntroComponent,
        MessagesComponent
    ],
    providers: [
        StatusBar,
        SplashScreen,
        DatabaseService,
        ScreenOrientation,
        {provide: ErrorHandler, useClass: IonicErrorHandler}
    ]
})
export class AppModule {}
