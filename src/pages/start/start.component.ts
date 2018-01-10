import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { NavController } from "ionic-angular";
import { Data } from "../../app/data";
import { IntroComponent } from '../intro';

@Component({
    selector: "app-start",
    templateUrl: "start.component.html"
})

export class StartComponent implements OnInit {
    phoneNumberForm: FormGroup;
    codeForm: FormGroup;
    isPhoneNumberSubmitted: boolean;
    countries: Object;
    countriesKeys: Array<string>;
    isLoaded: boolean;

    constructor(public navCtrl: NavController, private fb: FormBuilder) {
        this.isLoaded = false;
    }

    ngOnInit() {
        this.countries = Data.countries;
        this.countriesKeys = Object.keys(this.countries);
        this.phoneNumberForm = this.fb.group({
            country: ["lt"],
            phoneNumber: [""]
        });

        setTimeout(() => this.isLoaded = true, 1);
    }

    submitPhoneNumber() {
        // Perform phone number submit request
        this.codeForm = this.fb.group({
            code: [""]
        });

        // this.isPhoneNumberSubmitted = true;
        this.submitCode();
    }

    submitCode() {
        // Perform code submit request
        this.navCtrl.push(IntroComponent);
    }
}
