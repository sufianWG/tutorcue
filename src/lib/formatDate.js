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
    return monday
}
export const weekDaysList = (weekOffset = 0) => {
    // protibar call korar shomoy fresh kore "ajker tarikh" hisab kora hocche,
    // module load howar shomoy ekbar hisab kore rakhle purono/stale tarikh thake jete pare
    const startDayOfWeek = startOfWeek();
    // console.log("startDayOfWeek:", startDayOfWeek);
    const weekDays = []
    // console.log("weekDays:", weekDays);
    for (let i = 0; i < 7; i++) {
        const date = new Date(startDayOfWeek)
        date.setDate(
            startDayOfWeek.getDate() + i + (weekOffset * 7)
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
        const year = date.getFullYear()
        // console.log(month);
        weekDays.push({
            dayFull,
            day,
            dateNumber,
            month,
            year
        })
    }
    return weekDays
}
