"use client"

import { weekDaysList } from "@/lib/formatDate";
import { generateTimeSlots, testDate } from "@/lib/formatTime";
import { Button, Separator } from "@heroui/react";
import { useEffect, useState } from "react";
import { FaRegCalendarDays } from "react-icons/fa6";
import { FiLayers } from "react-icons/fi";
import { LuCalendarDays } from "react-icons/lu";
import BookingModal from "./BookingModal";
import { authClient } from "@/lib/auth-client";
import { tutorSlots } from "@/lib/api";

const Booking = ({ tutor }) => {
    const { _id, tutorName, availableTimeSlot, availableDays } = tutor;
    const [slotData, setSlotData] = useState([]);
    const start = availableTimeSlot?.start
    const end = availableTimeSlot?.end
    const slots = generateTimeSlots(start, end)
    // console.log("slots:", slots);


    const slotWithStatus = slots.map(slot => {
        return {
            ...slot,
            status: "available",
            bookedBy: null
        }
    })
    // console.log("slotWithStatus", slotWithStatus);
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
    const reFetchSlotsData = () => {
        const slotstHandler = async () => {
            const { data: tokenData } = await authClient.token()
            const token = tokenData?.token
            const getData = await tutorSlots(_id, token)
            setSlotData(getData);
        }
        slotstHandler()
    }

    useEffect(() => {
        if (!_id || !tutorSlotsData.length) return;

        const slotstHandler = async () => {
            const { data: tokenData, error } = await authClient.token()
            const token = tokenData?.token
            // console.log("token", token);
            try {
                const postRes = await fetch(`${process.env.NEXT_PUBLIC_TUTORCUE_SERVER_URL}/tutorslots`, {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(tutorSlotsData)
                })
                if (!postRes.ok) {
                    throw new Error(`slots storing failed, status : ${postRes.status}`)
                }
                const postData = await postRes.json()
                console.log("slots storing successfully", postData);

                // post kora sesh howar por database theke latest data paowar jonno abr get kortechi karon ei component er vitore latest data er dorkar ache
                reFetchSlotsData()

            } catch (error) {
                console.log('error with storing or getting slots data', error);
            }
        }
        slotstHandler()
    }, [_id])

    const firstDateDayAndYr = `${weekDays[0]?.day}, ${weekDays[0]?.dateNumber} ${weekDays[0]?.month} ${weekDays[0]?.year}`
    const totalSlotAvailableInThisWeek = slotData.reduce(
        (total, dayData) => {
            return total + dayData.availableSlots;
        },
        0
    );


    // console.log("firstDateDayAndYr", firstDateDayAndYr);
    return (
        <div className="bg-tc-surface/70 p-3 md:p-7 shadow rounded-lg space-y-3">
            <h2 className="text-tc-secondary text-lg font-bold flex gap-2 items-center"><LuCalendarDays size={20} /> Availability This Week</h2>
            <div>
                {
                    weekDays.map((wDay, ind) => {
                        const daySlotData = slotData.find(item =>
                            item.year === wDay.year &&
                            item.month === wDay.month &&
                            Number(item.dateNumber) === Number(wDay.dateNumber)
                        );
                        return <div key={ind}>
                            <div className="flex justify-between items-center gap-2 md:gap-0 space-y-3">
                                <div className="text-base text-tc-secondary">
                                    <span>{wDay.day}</span>
                                    <span className="ml-3">{wDay.dateNumber} {wDay.month}</span>
                                </div>
                                <div>
                                    <p className="text-base text-tc-secondary">{
                                        daySlotData
                                            ? `${daySlotData.availableSlots} slots left`
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
            <BookingModal tutor={tutor} slotData={slotData} reFetchSlotsData={reFetchSlotsData}></BookingModal>
        </div>
    );
};

export default Booking;