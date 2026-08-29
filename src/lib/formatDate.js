let startDayOfWeek = null
const startOfWeek = () => {
    const today = new Date()
    const currentDay = today.getDay();
    // console.log("currentDay", currentDay);

    const diff = currentDay === 0 ? -6 : 1 - currentDay
    // console.log(diff);

    const monday = new Date(today);
    // console.log("monday before setdate", monday);
    monday.setDate(
        today.getDate() + diff
    )
    // console.log("monday:", monday);
    startDayOfWeek = monday
}
startOfWeek();
// console.log("startDayOfWeek:", startDayOfWeek);
export const weekDaysList = () => {
    const weekDays = []
    // console.log("weekDays:", weekDays);
    for (let i = 0; i < 7; i++) {
        const date = new Date(startDayOfWeek)
        date.setDate(
            startDayOfWeek.getDate() + i
        )
        // console.log("weekDay", date);
        const dayFull = date.toLocaleDateString("en-US", {
            weekday: "long"
        })
        const day = date.toLocaleDateString("en-US", {
            weekday: "short"
        })
        // console.log(day);
        const dateNumber = String(date.getDate()).padStart(2, "0")
        // console.log(dateNumber);
        const month = date.toLocaleDateString("en-US", {
            month: "short"
        })
        // console.log(month);
        weekDays.push({
            dayFull,
            day,
            dateNumber,
            month
        })
    }
    return weekDays
}
