export const extractTime = (dateString) => {
    const date = new Date(dateString);
    // const hours = padZero(date.getHours());
    // const minutes = padZero(date.getMinutes());
    const amPm = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    const dateOnly = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${dateOnly}-${month}-${year},${amPm}`;
}

const padZero = (number) => {
    return number.toString().padStart(2, "0");
}