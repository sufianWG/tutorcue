"use client"

import { weekDaysList } from "@/lib/formatDate";
import { Button, Separator } from "@heroui/react";
import { useEffect, useState } from "react";
import { FaRegCalendarDays } from "react-icons/fa6";
import { FiLayers } from "react-icons/fi";
import { LuCalendarDays } from "react-icons/lu";
import { MdOutlineNavigateNext } from "react-icons/md";
import BookingModal from "./BookingModal";
import { authClient } from "@/lib/auth-client";
import { tutorSlots } from "@/lib/api";
import Loader from "@/components/shared/Loader";

const Booking = ({ tutor }) => {
    const { _id } = tutor;
    const [slotData, setSlotData] = useState([]);
    const [isSlotDataLoading, setIsSlotDataLoading] = useState(true);
    const [showNextWeek, setShowNextWeek] = useState(false);
    const { isPending: isSessionPending } = authClient.useSession();
    // const slots = generateTimeSlots(start, end)
    // console.log("slots:", slots);

    // default e shudhu ei sptaher 7 din, "Next Week" button chaplei porer sopta o jog hoy
    const weekDays = showNextWeek ? weekDaysList().concat(weekDaysList(1)) : weekDaysList()
    // console.log("weekDays", weekDays)
    // console.log("slotData", slotData);

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
        } finally {
            setIsSlotDataLoading(false);
        }
    };

    // page load hole current + next week er slots get korbe
    // session ready na hoya porjonto wait kora hocche, na hole token na peye khali slotData thake jay
    useEffect(() => {
        if (!_id || isSessionPending) return;
        const slotstHandler = async () => {
            await reFetchSlotsData()
        }
        slotstHandler()
    }, [_id, isSessionPending])

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

    // ekhon jotogula din display hocche (7 na 14), shudhu totogula diner slot jog kore total ber kora hocche,
    // ete list e ja dekhano hocche total tar sathe সবসময় mile jabe
    const totalSlotAvailableInThisWeek = weekDays.reduce(
        (total, wDay) => {
            const daySlotData = slotData.find(item =>
                item.year === wDay.year &&
                item.month === wDay.month &&
                Number(item.dateNumber) === Number(wDay.dateNumber)
            );
            return total + (daySlotData ? daySlotData.availableSlots : 0);
        },
        0
    );

    // console.log("firstDateDayAndYr", firstDateDayAndYr);

    if (isSlotDataLoading) {
        return (
            <div className="bg-tc-surface/70 p-3 md:p-7 shadow rounded-lg">
                <Loader text="Loading availability..." />
            </div>
        );
    }

    return (
        <div className="bg-tc-surface/70 p-3 md:p-7 shadow rounded-lg space-y-3">
            <h2 className="text-tc-secondary text-lg font-bold flex gap-2 items-center"><LuCalendarDays size={20} /> Upcoming Availability</h2>
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
            {
                !showNextWeek &&
                <Button onClick={() => setShowNextWeek(true)} className="w-full rounded-md bg-tc-surface-alt text-tc-secondary border border-tc-border hover:bg-tc-primary hover:text-tc-surface flex items-center justify-center gap-2">
                    Next Week <MdOutlineNavigateNext size={20} />
                </Button>
            }
            <Separator className="my-1" />
            <div className="space-y-3">
                <div>
                    <h3 className="text-base text-tc-secondary font-semibold">Session Starts From</h3>
                    <h2 className="text-tc-secondary text-lg font-bold flex gap-2 items-center"><FaRegCalendarDays size={20} /> {firstDateDayAndYr} </h2>
                </div>
                <div>
                    <h3 className="text-base text-tc-secondary font-semibold">Total Slots Left {showNextWeek ? "(This & Next Week)" : "(This Week)"}</h3>
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