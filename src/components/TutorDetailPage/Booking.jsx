"use client"

import { weekDaysList } from "@/lib/formatDate";
import { generateTimeSlots, testDate } from "@/lib/formatTime";
import { LuCalendarDays } from "react-icons/lu";

const Booking = ({ tutor }) => {
    const { availableTimeSlot, availableDays } = tutor;
    const start = availableTimeSlot?.start
    const end = availableTimeSlot?.end
    const slots = generateTimeSlots(start, end)
    console.log("slots:", slots);

    const weekDays = weekDaysList()
    console.log("weekDays", weekDays);

    // const testArray = ["Mango","Apple","Banana","Orange"]
    // const isPresent = testArray.includes("Pineapple");
    // console.log("isPresent", isPresent);

    return (
        <div className="bg-tc-surface p-3 md:p-7 shadow rounded-lg space-y-3">
            <h2 className="text-tc-secondary text-lg font-bold flex gap-2 items-center "><LuCalendarDays size={20} /> Availability This Week</h2>
            <div>
                {
                    weekDays.map((wDay, ind) => {
                        return <div key={ind} className="flex justify-between items-center gap-2 md:gap-0 space-y-3">
                            <div className="flex gap-3 md:gap-5 items-center text-base text-tc-secondary">
                                <span>{wDay.day}</span>
                                <span>{wDay.dateNumber} {wDay.month}</span>
                            </div>
                            <div>
                                <p className="text-base text-tc-secondary">{
                                availableDays.includes(wDay.dayFull) ? <span>{slots.length} slots left</span>
                                : "N/A" } </p>
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    );
};

export default Booking;