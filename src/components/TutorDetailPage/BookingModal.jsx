"use client"

import { authClient } from "@/lib/auth-client";
import { convertTo12Hour } from "@/lib/formatTime";
import { Button, Calendar, DateField, DatePicker, Label, Modal, Surface } from "@heroui/react";
import { useEffect, useState } from "react";
import { HiOutlineCalendarDays } from "react-icons/hi2";
import { MdOutlineCalendarMonth } from "react-icons/md";

const BookingModal = ({ tutor }) => {
    const [slotData, setSlotData] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const { _id } = tutor;

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setSelectedSlot(null);

        console.log("selected date:", date);
    }
    const selectedMonth = selectedDate
        ? new Date(
            selectedDate.year,
            selectedDate.month - 1
        ).toLocaleString("en-US", {
            month: "short"
        })
        : null;
    console.log("selectedMonth", selectedMonth);

    const selectedDateData = selectedDate
        ? slotData.find(item =>
            item.year === selectedDate.year &&
            Number(item.dateNumber) === selectedDate.day &&
            item.month === selectedMonth
        )
        : null;
    console.log("selectedDateData", selectedDateData);

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
    useEffect(() => {
        if (!_id) return;

        const slotsHandler = async () => {
            const { data: tokenData, error } = await authClient.token()
            const token = tokenData?.token
            console.log("token", token);
            const res = await fetch(`${process.env.NEXT_PUBLIC_TUTORCUE_SERVER_URL}/tutorslots/${_id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            })
            if (!res.ok) {
                throw new Error(`slots data getting failed, status : ${res.status}`)
            }
            const slotDataFromApi = await res.json()
            console.log("slots data getting successfully", slotDataFromApi);
            setSlotData(slotDataFromApi);
            return slotDataFromApi
        }
        slotsHandler()
    }, [_id])

    console.log("slotData", slotData);

    return (
        <div>
            <Modal>
                <Button variant="secondary" className={"mt-3 rounded-md text-base bg-tc-primary text-tc-surface font-semibold w-full flex items-center justify-center gap-2 hover:bg-tc-secondary"} ><HiOutlineCalendarDays size={20} /> Book Session</Button>
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
                                                                    <button
                                                                        key={ind}
                                                                        type="button"
                                                                        disabled={isBooked}
                                                                        onClick={() => setSelectedSlot(slot)}
                                                                        className={`border rounded-md p-2 text-sm transition ${isSelected ? "bg-tc-primary text-white border-tc-primary" : "border-tc-border text-tc-secondary"} ${isBooked ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:border-tc-primary"}`}
                                                                    >
                                                                        { convertTo12Hour(slot.start)} - {convertTo12Hour(slot.end)}
                                                                        {
                                                                            isBooked && (
                                                                                <span className="block text-xs">
                                                                                    Booked
                                                                                </span>
                                                                            )
                                                                        }
                                                                    </button>
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
                                        </div>
                                        <Modal.Footer>
                                            <Button slot="close" className={"w-full rounded-md bg-tc-secondary text-tc-surface hover:bg-tc-primary"} isDisabled={!selectedDateData || !selectedSlot}>Book Now</Button>
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