import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { DatabaseService } from "../../app/database.service";
import { CONVERSATIONS } from "../../app/data/conversations";
import {CURRENT_USER} from '../../app/data/users';

@Component({
    selector: "app-messages",
    templateUrl: "messages.component.html"
})

export class MessagesComponent implements OnInit {
    id: number;
    messages;
    currUser;
    form: FormGroup;
    @Input() messageId: number;
    conversation;

    constructor(private fb: FormBuilder, private database: DatabaseService) {}

    ngOnInit() {
        this.id = this.messageId;
        this.conversation = CONVERSATIONS[this.id - 1];
        this.currUser = CURRENT_USER;
        this.form = this.fb.group({
            text: [""]
        });

        this.messages = this.database.getMessages(this.id);
    }

    sendMessage() {
        this.database.addMessage(this.id, this.currUser, this.form.get("text").value);
        this.form.patchValue({
            text: ""
        });
    }
}
