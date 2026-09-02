"use client"

import { turtorSlots } from "@/lib/api";
import { authClient } from "@/lib/auth-client";
import { convertTo12Hour } from "@/lib/formatTime";
import { Button, Calendar, DateField, DatePicker, Label, Modal, Surface, useOverlayState } from "@heroui/react";
import { useEffect, useState } from "react";
import { HiOutlineCalendarDays } from "react-icons/hi2";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { toast } from "react-toastify";


const BookingModal = ({ tutor, slotData, reFetchSlotsData }) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [selectedSessionMode, setSelectedSessionMode] = useState("online");
    const { _id, teachingMode } = tutor;
    const modalState = useOverlayState();

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setSelectedSlot(null);

        // console.log("selected date:", date);
    }
    const selectedMonth = selectedDate
        ? new Date(
            selectedDate.year,
            selectedDate.month - 1
        ).toLocaleString("en-US", {
            month: "short"
        })
        : null;
    // console.log("selectedMonth", selectedMonth);

    const selectedDateData = selectedDate
        ? slotData.find(item =>
            item.year === selectedDate.year &&
            Number(item.dateNumber) === selectedDate.day &&
            item.month === selectedMonth
        )
        : null;
    // console.log("selectedDateData", selectedDateData);

    const isDateAvailable = (date) => {
        const month = new Date(
            date.year,
            date.month - 1
        ).toLocaleString("en-US", {
            month: "short"
        });

        return slotData.some(item =>
            item.year === date.year &&
            Number(item.dateNumber) === date.day &&
            item.month === month &&
            item.availableSlots > 0
        );
    }

    // console.log("slotData", slotData);
    const { data: session } = authClient.useSession();
    const user = session?.user;

    const handleBooking = async () => {
        if (!selectedDateData || !selectedSlot) return;

        const bookingData = {
            userId: user._id,
            studentName: user.name,
            studentEmail: user.email,
            tutorId: tutor._id,
            tutor: {
                name: tutor.tutorName,
                photo: tutor.photo,
                subject: tutor.subject,
                rating: tutor.rating
            },
            dayFull: selectedDateData.dayFull,
            day: selectedDateData.dayShort,
            dateNumber: selectedDateData.dateNumber,
            month: selectedDateData.month,
            year: selectedDateData.year,

            sessionTime: {
                start: selectedSlot.start,
                end: selectedSlot.end
            },
            sessionMode: selectedSessionMode,
        }
        const { data: postTokenData, error } = await authClient.token()
        const token = postTokenData?.token
        // console.log("token", token);

        const res = await fetch(`${process.env.NEXT_PUBLIC_TUTORCUE_SERVER_URL}/booking`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(bookingData)
        })
        const bookingResult = await res.json()
        console.log("Booking result:", bookingResult)
        if (res.ok) {
            toast.success("Booking successful!")
            reFetchSlotsData()
            modalState.close();
        } else {
            toast.error("Booking failed!")
        }
    }

    return ( 
        <div>
            <Modal state={modalState}>
                <Button onPress={modalState.open} variant="secondary" className={"mt-3 rounded-md text-base bg-tc-primary text-tc-surface font-semibold w-full flex items-center justify-center gap-2 hover:bg-tc-secondary"} ><HiOutlineCalendarDays size={20} /> Book Session</Button>
                <Modal.Backdrop>
                    <Modal.Container placement="auto">
                        <Modal.Dialog className="sm:max-w-md">
                            <Modal.CloseTrigger />
                            <Modal.Header>
                                <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
                                    <MdOutlineCalendarMonth className="text-lg" />
                                </Modal.Icon>
                                <Modal.Heading>Book a Session</Modal.Heading>
                                <p className="mt-1.5 text-sm leading-5 text-muted">
                                    Book a session with the tutor by filling out the form below.
                                </p>
                            </Modal.Header>
                            <Modal.Body className="p-4">
                                <Surface variant="default">
                                    <form className="flex flex-col gap-4 p-2">
                                        <DatePicker
                                            value={selectedDate}
                                            onChange={handleDateChange}
                                            className="w-full"
                                            isDateUnavailable={(date) => !isDateAvailable(date)}
                                        >
                                            <Label>Date</Label>
                                            <DateField.Group>
                                                <DateField.Input>
                                                    {(segment) => (
                                                        <DateField.Segment segment={segment} />
                                                    )}
                                                </DateField.Input>
                                                <DateField.Suffix>
                                                    <DatePicker.Trigger>
                                                        <DatePicker.TriggerIndicator />
                                                    </DatePicker.Trigger>
                                                </DateField.Suffix>
                                            </DateField.Group>
                                            <DatePicker.Popover>
                                                <Calendar aria-label="Select session date">
                                                    <Calendar.Header>
                                                        <Calendar.YearPickerTrigger>
                                                            <Calendar.YearPickerTriggerHeading />
                                                            <Calendar.YearPickerTriggerIndicator />
                                                        </Calendar.YearPickerTrigger>
                                                        <Calendar.NavButton slot="previous" />
                                                        <Calendar.NavButton slot="next" />
                                                    </Calendar.Header>

                                                    <Calendar.Grid>
                                                        <Calendar.GridHeader>
                                                            {(day) => (
                                                                <Calendar.HeaderCell>
                                                                    {day}
                                                                </Calendar.HeaderCell>
                                                            )}
                                                        </Calendar.GridHeader>
                                                        <Calendar.GridBody>
                                                            {(date) => (
                                                                <Calendar.Cell date={date} />
                                                            )}
                                                        </Calendar.GridBody>
                                                    </Calendar.Grid>
                                                </Calendar>
                                            </DatePicker.Popover>
                                        </DatePicker>
                                        <div className="space-y-2">
                                            <Label>Slots</Label>
                                            {
                                                !selectedDate && (
                                                    <p className="text-sm text-tc-muted">
                                                        Select a date first
                                                    </p>
                                                )
                                            }
                                            {
                                                selectedDate && selectedDateData && (
                                                    <div className="grid grid-cols-2 gap-2">
                                                        {
                                                            selectedDateData.slots.map((slot, ind) => {
                                                                const isBooked =
                                                                    slot.status === "booked";

                                                                const isSelected =
                                                                    selectedSlot?.start === slot.start &&
                                                                    selectedSlot?.end === slot.end;

                                                                return (
                                                                    <Button
                                                                        key={ind}
                                                                        type="button"
                                                                        disabled={isBooked}
                                                                        onClick={() => setSelectedSlot(slot)}
                                                                        className={`border rounded-md p-2 text-sm transition ${isSelected ? "bg-tc-primary text-white border-tc-primary" : "border-tc-border text-tc-secondary"} ${isBooked ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:border-tc-primary"}`}
                                                                    >
                                                                        {convertTo12Hour(slot.start)} - {convertTo12Hour(slot.end)}
                                                                        {
                                                                            isBooked && (
                                                                                <span className="block text-xs">
                                                                                    Booked
                                                                                </span>
                                                                            )
                                                                        }
                                                                    </Button>
                                                                );
                                                            })
                                                        }
                                                    </div>
                                                )
                                            }

                                            {
                                                selectedDate && !selectedDateData && (
                                                    <p className="text-sm text-tc-muted">
                                                        No slots available for this date
                                                    </p>
                                                )
                                            }
                                            {
                                                teachingMode === "Both" && (
                                                    <div className="space-y-2">
                                                        <Label>Session Mode</Label>
                                                        <div className="grid grid-cols-2 gap-2">
                                                            <Button
                                                                type="button"
                                                                onClick={() => setSelectedSessionMode("Online")}
                                                                className={`border rounded-md p-2 ${selectedSessionMode === "Online"
                                                                    ? "bg-tc-primary text-white"
                                                                    : "border-tc-border"
                                                                    }`}
                                                            >
                                                                Online
                                                            </Button>
                                                            <Button
                                                                type="button"
                                                                onClick={() => setSelectedSessionMode("Offline")}
                                                                className={`border rounded-md p-2 ${selectedSessionMode === "Offline"
                                                                    ? "bg-tc-primary text-white"
                                                                    : "border-tc-border"
                                                                    }`}
                                                            >
                                                                Offline
                                                            </Button>
                                                        </div>
                                                    </div>
                                                )}
                                        </div>
                                        <Modal.Footer>
                                            <Button onClick={handleBooking} className={"w-full rounded-md bg-tc-secondary text-tc-surface hover:bg-tc-primary"} isDisabled={!selectedDateData || !selectedSlot ||
                                                (teachingMode === "Both" && !selectedSessionMode)}>Book Now</Button>
                                        </Modal.Footer>
                                    </form>
                                </Surface>
                            </Modal.Body>
                        </Modal.Dialog>
                    </Modal.Container>
                </Modal.Backdrop>
            </Modal>
        </div>
    );
};

export default BookingModal;