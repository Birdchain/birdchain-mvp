import { IUser, USERS } from './users';

interface IConversation {
    id: number;
    user: IUser,
    lastMessage: string;
    unreadCount: number;
    dateSent?: string;
}

export const CONVERSATIONS: IConversation[] = [
    {
        id: 1,
        user: USERS[0],
        lastMessage: "This is...",
        unreadCount: 24,
        dateSent: "11/10"
    },
    {
        id: 2,
        user: USERS[1],
        lastMessage: "This is...",
        unreadCount: 5,
        dateSent: "10/10"
    },
    {
        id: 3,
        user: USERS[2],
        lastMessage: "This is...",
        unreadCount: 0,
        dateSent: "Wednesday"
    },
    {
        id: 4,
        user: USERS[3],
        lastMessage: "This is...",
        unreadCount: 0,
        dateSent: "Thursday"
    },
    {
        id: 5,
        user: USERS[4],
        lastMessage: "This is...",
        unreadCount: 0,
        dateSent: "12/15"
    },
    {
        id: 6,
        user: USERS[5],
        lastMessage: "This is...",
        unreadCount: 0,
        dateSent: "02/05"
    },
    {
        id: 7,
        user: USERS[6],
        lastMessage: "This is...",
        unreadCount: 0,
        dateSent: "Monday"
    },
    {
        id: 8,
        user: USERS[7],
        lastMessage: "This is...",
        unreadCount: 0,
        dateSent: "12/24"
    },
    {
        id: 9,
        user: USERS[9],
        lastMessage: "This is...",
        unreadCount: 0,
        dateSent: "Friday"
    }
];
