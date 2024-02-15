export const giveCurrentDateTime = (): string => {
    const today: Date = new Date();
    const date: string =
        today.getFullYear() +
        '-' +
        (today.getMonth() + 1) +
        '-' +
        today.getDate();
    const time: string =
        today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    const dateTime: string = date + ' ' + time;
    return dateTime;
};
