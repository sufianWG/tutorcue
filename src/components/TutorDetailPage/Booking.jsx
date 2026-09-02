"use client"

import { weekDaysList } from "@/lib/formatDate";
import { Separator } from "@heroui/react";
import { useEffect, useState } from "react";
import { FaRegCalendarDays } from "react-icons/fa6";
import { FiLayers } from "react-icons/fi";
import { LuCalendarDays } from "react-icons/lu";
import BookingModal from "./BookingModal";
import { authClient } from "@/lib/auth-client";
import { tutorSlots } from "@/lib/api";

const Booking = ({ tutor }) => {
    const { _id } = tutor;
    const [slotData, setSlotData] = useState([]);
    // const slots = generateTimeSlots(start, end)
    // console.log("slots:", slots);


    const weekDays = weekDaysList()
    // console.log("weekDays", weekDays);

    // database theke latest slots data get korbe
    const reFetchSlotsData = async () => {
        try {
            const { data: tokenData } = await authClient.token();
            const token = tokenData?.token;
            if (!token) return;
            const getData = await tutorSlots(_id, token);
            setSlotData(getData);
        } catch (error) {
            console.log("Error getting slots data:", error);
        }
    };

    // page load hole current week er slots get korbe
    useEffect(() => {
        if (!_id) return;
        const slotstHandler = async () => {
            await reFetchSlotsData()
        }
        slotstHandler()
    }, [_id])

    // current week er first available session date
    const firstAvailableDay = weekDays.find(wDay =>
        slotData.some(item =>
            item.year === wDay.year &&
            item.month === wDay.month &&
            Number(item.dateNumber) ===
            Number(wDay.dateNumber)
        )
    );

    // const firstDateDayAndYr = `${weekDays[0]?.day}, ${weekDays[0]?.dateNumber} ${weekDays[0]?.month} ${weekDays[0]?.year}`
    const firstDateDayAndYr = firstAvailableDay
    ? `${firstAvailableDay.day}, ${firstAvailableDay.dateNumber} ${firstAvailableDay.month} ${firstAvailableDay.year}`
    : "N/A";

    // database er actual available slots total
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