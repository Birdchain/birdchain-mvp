interface ISettings {
    isLimited: boolean;
    isUnlimited: boolean;
    isHidden: boolean;
    isSending: boolean;
    limitPerMonth: number;
}

export const SETTINGS: ISettings = {
    isLimited: true,
    isUnlimited: false,
    isHidden: true,
    isSending: false,
    limitPerMonth: 1000
};
