"use client"

import { weekDaysList } from "@/lib/formatDate";
import { generateTimeSlots, testDate } from "@/lib/formatTime";
import { Button, Separator } from "@heroui/react";
import { useEffect } from "react";
import { FaRegCalendarDays } from "react-icons/fa6";
import { FiLayers } from "react-icons/fi";
import { HiOutlineCalendarDays } from "react-icons/hi2";
import { LuCalendarDays } from "react-icons/lu";

const Booking = ({ tutor }) => {
    const { _id, tutorName, availableTimeSlot, availableDays } = tutor;
    const start = availableTimeSlot?.start
    const end = availableTimeSlot?.end
    const slots = generateTimeSlots(start, end)
    console.log("slots:", slots);

    const slotWithStatus = slots.map(slot => {
        return {
            ...slot,
            status: "available",
            bookedBy: null
        }
    })
    console.log("slotWithStatus", slotWithStatus);

    const weekDays = weekDaysList()
    // console.log("weekDays", weekDays);

    const tutorAvailableWeekDays = weekDays.filter(wDay => availableDays.includes(wDay.dayFull))
    // console.log("tutorAvailableWeekDays", tutorAvailableWeekDays);

    const tutorSlotsData = tutorAvailableWeekDays.map(wDay => {
        return {
            tutorId: _id,
            tutorName,
            dayFull: wDay.dayFull,
            dayShort: wDay.day,
            dateNumber: wDay.dateNumber,
            month: wDay.month,
            year: wDay.year,
            totalSlots: slotWithStatus.length,
            availableSlots: slotWithStatus.length,
            slots: slotWithStatus
        }
    })

    useEffect(() => {
        if (!_id || !tutorSlotsData.length) return;

        const slotsPostHandler = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_TUTORCUE_SERVER_URL}/tutorslots`, {
                    method: "POST",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify(tutorSlotsData)
                })
                if (!res.ok) {
                    throw new Error(`slots storing failed, status : ${res.status}`)
                }
                const data = await res.json()
                console.log("slots storing successfully", data);
            } catch (error) {
                console.log('error with storing slots data', error);
            }
        }
        slotsPostHandler()
    }, [_id])




    // const testArray = ["Mango","Apple","Banana","Orange"]
    // const isPresent = testArray.includes("Pineapple");
    // console.log("isPresent", isPresent);
    const firstDateDayAndYr = `${weekDays[0]?.day}, ${weekDays[0]?.dateNumber} ${weekDays[0]?.month} ${weekDays[0]?.year}`
    const totalSlotAvailableInThisWeek = availableDays.length * slots.length

    const handleBooking = () => {
        
    }
    // console.log("firstDateDayAndYr", firstDateDayAndYr);
    return (
        <div className="bg-tc-surface/70 p-3 md:p-7 shadow rounded-lg space-y-3">
            <h2 className="text-tc-secondary text-lg font-bold flex gap-2 items-center"><LuCalendarDays size={20} /> Availability This Week</h2>
            <div>
                {
                    weekDays.map((wDay, ind) => {
                        return <div key={ind}>
                            <div className="flex justify-between items-center gap-2 md:gap-0 space-y-3">
                                <div className="text-base text-tc-secondary">
                                    <span>{wDay.day}</span>
                                    <span className="ml-3">{wDay.dateNumber} {wDay.month}</span>
                                </div>
                                <div>
                                    <p className="text-base text-tc-secondary">{
                                        availableDays.includes(wDay.dayFull) ? <span>{slots.length} slots left</span>
                                            : "N/A"} </p>
                                </div>
                            </div>
                        </div>
                    })
                }
            </div>
            <Separator className="my-1" />
            <div className="space-y-3">
                <div>
                    <h3 className="text-base text-tc-secondary font-semibold">Session Starts From</h3>
                    <h2 className="text-tc-secondary text-lg font-bold flex gap-2 items-center"><FaRegCalendarDays size={20} /> {firstDateDayAndYr} </h2>
                </div>
                <div>
                    <h3 className="text-base text-tc-secondary font-semibold">Total Slots Left This Week</h3>
                    <h2 className="text-tc-secondary text-lg font-bold flex gap-2 items-center"><FiLayers size={20} /> {
                        totalSlotAvailableInThisWeek
                    } Slots Left </h2>
                </div>
            </div>
            <Button onClick={handleBooking} className={"mt-3 rounded-md text-base bg-tc-primary text-tc-surface font-semibold w-full flex items-center justify-center gap-2 hover:bg-tc-secondary"}> <HiOutlineCalendarDays size={20} /> Book Session</Button>
        </div>
    );
};

export default Booking;