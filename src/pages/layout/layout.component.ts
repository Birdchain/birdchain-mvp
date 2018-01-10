import { Component, OnInit, ViewChild } from "@angular/core";
import { Platform, Slides, ToastController } from "ionic-angular";
import { DatabaseService } from "../../app/database.service";
import { Observable } from "rxjs/Rx";

@Component({
    selector: "app-layout",
    templateUrl: "./layout.component.html"
})

export class LayoutComponent implements OnInit {
    @ViewChild(Slides) slides: Slides;
    slide: number;
    isMessagesOpened: boolean;
    balance: number;
    private isSending: boolean;
    private navPath: Array<number>;
    private isGoingBack: boolean;

    constructor(
        private platform: Platform,
        private toastCtrl: ToastController,
        private database: DatabaseService
    ) {}

    ngOnInit() {
        this.isMessagesOpened = false;
        this.slide = 0;
        this.balance = 0;
        this.isSending = this.database.getSettings().isSending;

        let interval;

        if(this.isSending) {
            interval = Observable.interval(this.database.updateInterval).subscribe(() => this.onSubscribe())
        }

        this.database.settingsUpdated.subscribe((res) => {
            if (!res.isSending && interval) {
                interval.unsubscribe();
            } else if (res.isSending) {
                interval = Observable.interval(this.database.updateInterval).subscribe(() => this.onSubscribe());
            }

            this.isSending = res.isSending;
        });
        this.handleBackButton();
    }

    switchSlide(index) {
        this.slide = index;
        this.slides.slideTo(index);
        if (this.isMessagesOpened) {
            this.isMessagesOpened = false;
        }
    }

    onSlideChanged() {
        this.slide = this.slides.getActiveIndex();
        if (this.isMessagesOpened) {
            this.isMessagesOpened = false;
        }
        if (this.isGoingBack) {
            this.isGoingBack = false;
            return;
        }
        this.navPath.push(this.slide);
    }

    onWindowChanged(value) {
        this.isMessagesOpened = value;
    }

    private handleBackButton() {
        let lastTimeBackPress = 0;
        const timePeriodToExit  = 2000;
        this.navPath = [];
        this.platform.registerBackButtonAction(() => {
            if (this.isMessagesOpened) {
                this.isMessagesOpened = false;
                return;
            }
            if (this.navPath.length < 1) {
                if (new Date().getTime() - lastTimeBackPress < timePeriodToExit) {
                    this.platform.exitApp();
                } else {
                    let toast = this.toastCtrl.create({
                        message:  'Press back again to exit',
                        duration: 3000,
                        position: 'bottom'
                    });
                    toast.present();
                    lastTimeBackPress = new Date().getTime();
                }
                return;
            }

            this.navPath.pop();
            this.slide = this.navPath[this.navPath.length - 1];
            this.slides.slideTo(this.slide);
            this.isGoingBack = true;
        });
    }

    private onSubscribe() {
        this.balance += 1;
    }
}
