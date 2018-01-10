import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, Slides } from "ionic-angular";
import { LayoutComponent } from '../layout';

@Component({
    selector: "app-intro",
    templateUrl: "intro.component.html"
})

export class IntroComponent implements OnInit {
    @ViewChild(Slides) slides: Slides;

    constructor(public navCtrl: NavController) {}

    ngOnInit() {
        this.slides.lockSwipes(true);
    }

    switchSlide(index) {
        this.slides.lockSwipes(false);
        this.slides.slideTo(index);
    }

    openApp() {
        this.navCtrl.push(LayoutComponent);
    }
}
