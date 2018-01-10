import { EventEmitter, Injectable } from "@angular/core";
import { CONVERSATIONS } from "./data/conversations";
import { MESSAGES } from "./data/messages";
import { SETTINGS } from "./data/settings";

@Injectable()
export class DatabaseService {
    conversations;
    messages;
    settings;
    updateInterval: number;
    settingsUpdated: EventEmitter<any>;

    constructor() {
        this.conversations = CONVERSATIONS;
        this.messages = MESSAGES;
        this.settings = SETTINGS;
        this.settingsUpdated = new EventEmitter();
        this.updateInterval = 4000;
    }

    getConversations() {
        return this.conversations;
    }

    getMessages(conversationId) {
        return this.messages[conversationId];
    }

    getSettings() {
        return this.settings;
    }

    addMessage(conversationId, sender, text) {
        if (text.length < 1) {
            return;
        }

        const date = new Date();
        const newMessage = {sender, text, dateSent: `${date.getHours()}:${date.getMinutes()}`};
        this.messages[conversationId].push(newMessage);
    }

    updateSettings(setting, value) {
        this.settings[setting] = value;
        this.settingsUpdated.emit(this.settings);
    }
}
