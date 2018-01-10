import { Component, OnInit } from "@angular/core";
import { DatabaseService } from "../../app/database.service";

@Component({
    selector: "app-settings",
    templateUrl: "settings.component.html"
})

export class SettingsComponent implements OnInit {
    isLimited: boolean;
    isUnlimited: boolean;
    isHidden: boolean;
    isSending: boolean;
    limitPerMonth: number;

    constructor(private database: DatabaseService) {}

    ngOnInit() {
        const settings = this.database.getSettings();
        this.isLimited = settings.isLimited;
        this.isUnlimited = settings.isUnlimited;
        this.isHidden = settings.isHidden;
        this.isSending = settings.isSending;
        this.limitPerMonth = settings.limitPerMonth;
    }

    updateSettings(field) {
        if (field === "isLimited" && this.isLimited) {
            this.isUnlimited = false;
        } else if (field === "isUnlimited" && this.isUnlimited) {
            this.isLimited = false;
        }

        this.database.updateSettings(field, this[field]);
    }
}
