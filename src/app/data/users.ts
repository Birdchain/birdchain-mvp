export interface IUser {
    id: number;
    nickName: string;
    profilePhoto: string;
}

export const USERS: IUser[] = [
    {
        id: 1,
        nickName: "Ali",
        profilePhoto: "assets/images/1.jpg"
    },
    {
        id: 2,
        nickName: "Arminas",
        profilePhoto: "assets/images/2.jpg"
    },
    {
        id: 3,
        nickName: "Audrius",
        profilePhoto: "assets/images/3.jpg"
    },
    {
        id: 4,
        nickName: "Elena",
        profilePhoto: "assets/images/4.jpg"
    },
    {
        id: 5,
        nickName: "Ernestas",
        profilePhoto: "assets/images/5.jpg"
    },
    {
        id: 6,
        nickName: "Gabriele",
        profilePhoto: "assets/images/6.jpg"
    },
    {
        id: 7,
        nickName: "Jonas",
        profilePhoto: "assets/images/7.jpg"
    },
    {
        id: 8,
        nickName: "Marius",
        profilePhoto: "assets/images/8.jpg"
    },
    {
        id: 9,
        nickName: "Simas",
        profilePhoto: "assets/images/9.jpg"
    },
    {
        id: 10,
        nickName: "Zygimantas",
        profilePhoto: "assets/images/10.jpg"
    }
];

export const CURRENT_USER = USERS[8];
