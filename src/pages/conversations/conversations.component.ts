import { Component, Input, Output, OnInit, EventEmitter } from "@angular/core";
import { FormBuilder, FormGroup }  from "@angular/forms";
import { DatabaseService } from "../../app/database.service";

@Component({
    selector: "app-conversations",
    templateUrl: "conversations.component.html"
})

export class ConversationsComponent implements OnInit {
    conversations;
    @Input() isMessagesOpened: boolean;
    @Output() onWindowChange: EventEmitter<boolean>;
    messageId: number;
    isSelectionModeActivated: boolean;
    form: FormGroup;

    constructor(private fb: FormBuilder, private database: DatabaseService) {
        this.isMessagesOpened = false;
        this.onWindowChange = new EventEmitter<boolean>();
        this.messageId = 1;
    }

    ngOnInit() {
        this.form = this.fb.group({
            search: [""]
        });

        this.conversations = this.database.getConversations();
    }

    private findConversation(conversation) {
        return this.conversations.findIndex((currConversation) => currConversation.id === conversation.id);
    }

    onTap(conversation) {
        if (this.isSelectionModeActivated) {
            this.onPress(conversation);

            const selectedConversationIndex = this.conversations.findIndex((currConversation) => currConversation.selected);

            if (selectedConversationIndex < 0) {
                this.isSelectionModeActivated = false;
            }

            return;
        }

        this.isMessagesOpened = true;
        this.messageId = conversation.id;
        conversation.unreadCount = 0;
        this.onWindowChange.emit(this.isMessagesOpened);
    }

    newConversation() {
        console.log("New message initiated");
    }

    onPress(conversation) {
        if (!this.isSelectionModeActivated) {
            this.isSelectionModeActivated = true;
        }

        const conversationIndex = this.findConversation(conversation);
        this.conversations[conversationIndex].selected = !this.conversations[conversationIndex].selected;
    }

    removeConversations() {
        this.conversations = this.conversations.filter((conversation) => !conversation.selected);
        this.isSelectionModeActivated = false;
    }

    search() {
        console.log("Search initiated");
    }
}
