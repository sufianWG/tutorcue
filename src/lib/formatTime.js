export const convertTo12Hour = (time) => {
    const [hour, minute] = time.split(":");

    const hourNumber = Number(hour);

    const period = hourNumber >= 12 ? "PM" : "AM";

    const convertedHour =
        hourNumber % 12 || 12;

    return `${convertedHour}:${minute} ${period}`;
};

const minuteToTime = (minutes) => {
    const hour = Math.floor(minutes / 60)
    const minute = minutes % 60
    const time = `${String(hour).padStart(2, "0")} : ${String(minute).padStart(2, "0")}`
    // console.log(time);
    return time
}

export const generateTimeSlots = (start, end, duration = 60) => {
    const slots = []
    const [startHour, startMinute] = start.split(":").map(stItem => Number(stItem))
    // console.log("startHour:", startHour, "startMinute:", startMinute);
    const [endHour, endMinute] = end.split(":").map(endItem => Number(endItem))
    // console.log("endHour:", endHour, "endMinute:", endMinute);
    let currentInMinute = startHour * 60 + startMinute
    // console.log(currentInMinute);
    const endInMinute = endHour * 60 + endMinute
    while (currentInMinute + duration <= endInMinute) {
        const slotStart = currentInMinute
        const slotEnd = currentInMinute + duration
        const slotStartTime = minuteToTime(slotStart)
        const slotEndTime = minuteToTime(slotEnd)

        slots.push({
            start: slotStartTime,
            end: slotEndTime
        })
        currentInMinute += duration
    }
    return slots
}