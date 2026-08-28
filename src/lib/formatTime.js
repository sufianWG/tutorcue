export const convertTo12Hour = (time) => {
    const [hour, minute] = time.split(":");

    const hourNumber = Number(hour);

    const period = hourNumber >= 12 ? "PM" : "AM";

    const convertedHour =
        hourNumber % 12 || 12;

    return `${convertedHour}:${minute} ${period}`;
};