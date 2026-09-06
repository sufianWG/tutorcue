"use client";

import { Button, Calendar, DateField, DatePicker, FieldError, Form, Input, Label, ListBox, Select, Surface, TextArea, TextField, TimeField } from "@heroui/react";
import { useEffect, useState } from "react";
import { HiOutlineBookOpen, HiOutlineClock, HiOutlineMapPin, HiOutlineUserCircle } from "react-icons/hi2";
import { LuCalendarDays } from "react-icons/lu";
import { MdOutlineSchool } from "react-icons/md";
import Loader from "@/components/shared/Loader";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";


const AddTutor = () => {
    const [mounted, setMounted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [availableDays, setAvailableDays] = useState(new Set());
    const [selectedSubject, setSelectedSubject] = useState("");
    const [selectedTeachingMode, setSelectedTeachingMode] = useState("");
    const router = useRouter()

    useEffect(() => {
        setMounted(true);
    }, []);

    const subjects = [
        "Programming",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology",
        "English",
        "ICT",
        "Accounting",
    ];

    const teachingModes = [
        "Online",
        "Offline",
        "Both",
    ];

    const weekDays = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
    ];

    const handleAddTutor = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const formEntries = Object.fromEntries(formData.entries());
        // console.log("formEntries", formEntries);

        if (!formEntries.sessionStartDate || !formEntries.startTime || !formEntries.endTime || availableDays.size === 0) {
            toast.error("Please select the session start date, time and available days")
            return;
        }

        const tutorData = {
            ...formEntries,

            subject: selectedSubject,
            teachingMode: selectedTeachingMode,

            hourlyFee: Number(formEntries.hourlyFee),
            experience: Number(formEntries.experience),
            totalSlot: Number(formEntries.totalSlot),

            availableDays: [...availableDays],

            availableTimeSlot: {
                start: formEntries.startTime,
                end: formEntries.endTime,
            },
        };

        delete tutorData.startTime;
        delete tutorData.endTime;

        // console.log("Tutor Data:", tutorData);

        setIsSubmitting(true)

        const { data: postTokenData } = await authClient.token()
        const token = postTokenData?.token
        // console.log("token", token);

        const res = await fetch(`${process.env.NEXT_PUBLIC_TUTORCUE_SERVER_URL}/tutors`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(tutorData)
        })
        const addTutorResult = await res.json()
        // console.log("Add tutor result:", addTutorResult)
        setIsSubmitting(false)
        if (res.ok) {
            toast.success("Tutor added successfully!")
            router.push('/tutors')
        } else {
            toast.error("Failed to add tutor!")
        }
    };

    if (!mounted) {
        return null;
    }

    return (
        <section className="bg-tc-background py-10 md:py-14">
            <div className="container mx-auto px-5">
                <div className="max-w-4xl mx-auto bg-tc-surface border border-tc-border rounded-xl shadow-md p-5 md:p-8">

                    <div className="text-center space-y-2 mb-8">
                        <h1 className="text-3xl md:text-4xl font-bold text-tc-heading">
                            Become a Tutor
                        </h1>

                        <p className="text-tc-muted">
                            Fill in your teaching information so students can find and book your sessions.
                        </p>
                    </div>

                    <Form onSubmit={handleAddTutor} className="space-y-8 w-full">


                        <div className="space-y-4 w-full">
                            <h2 className="text-lg font-bold text-tc-heading flex items-center gap-2">
                                <HiOutlineUserCircle size={22} />
                                Tutor Information
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <TextField name="tutorName" isRequired>
                                    <Label>Tutor Name</Label>
                                    <Input placeholder="Enter tutor name" className="border border-tc-border bg-tc-surface-alt rounded-md px-3 py-2 w-full" />
                                    <FieldError />
                                </TextField>
                                <TextField name="photo" type="url" isRequired>
                                    <Label>Photo URL</Label>
                                    <Input placeholder="Input profile photo URL" className="border border-tc-border bg-tc-surface-alt rounded-md px-3 py-2 w-full" />
                                    <FieldError />
                                </TextField>
                                <Select placeholder="Select subject" onChange={setSelectedSubject} isRequired>
                                    <Label>Subject</Label>
                                    <Select.Trigger className="border border-tc-border bg-tc-surface-alt rounded-md">
                                        <Select.Value />
                                        <Select.Indicator />
                                    </Select.Trigger>
                                    <Select.Popover className={"rounded-md"}>
                                        <ListBox>
                                            {subjects.map((subject) => (
                                                <ListBox.Item key={subject} id={subject} textValue={subject} className={"rounded-md"}>
                                                    {subject}
                                                    <ListBox.ItemIndicator />
                                                </ListBox.Item>
                                            ))}
                                        </ListBox>
                                    </Select.Popover>
                                </Select>
                                <TextField name="hourlyFee" type="number" isRequired>
                                    <Label>Hourly Fee (BDT)</Label>
                                    <Input placeholder="500" className="border border-tc-border bg-tc-surface-alt rounded-md px-3 py-2 w-full" />
                                    <FieldError />
                                </TextField>
                                <TextField name="location" isRequired>
                                    <Label>Location</Label>
                                    <div className="relative">
                                        <HiOutlineMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-tc-muted text-lg pointer-events-none" />
                                        <Input placeholder="e.g. Dhaka, Bangladesh" className="border border-tc-border bg-tc-surface-alt rounded-md pl-9 pr-3 py-2 w-full" />
                                    </div>
                                    <FieldError />
                                </TextField>
                                <Select placeholder="Select teaching mode" onChange={setSelectedTeachingMode} isRequired>
                                    <Label>Teaching Mode</Label>
                                    <Select.Trigger className="border border-tc-border bg-tc-surface-alt rounded-md">
                                        <Select.Value />
                                        <Select.Indicator />
                                    </Select.Trigger>
                                    <Select.Popover className={"rounded-md"}>
                                        <ListBox>
                                            {teachingModes.map((mode) => (
                                                <ListBox.Item key={mode} id={mode} textValue={mode} className={"rounded-md"}>
                                                    {mode}
                                                    <ListBox.ItemIndicator />
                                                </ListBox.Item>
                                            ))}
                                        </ListBox>
                                    </Select.Popover>
                                </Select>
                                <TextField name="institution" isRequired>
                                    <Label>Institution</Label>
                                    <Input placeholder="e.g. University of Dhaka" className="border border-tc-border bg-tc-surface-alt rounded-md px-3 py-2 w-full" />
                                    <FieldError />
                                </TextField>
                                <TextField name="experience" type="number" isRequired>
                                    <Label>Experience (years)</Label>
                                    <Input placeholder="3" className="border border-tc-border bg-tc-surface-alt rounded-md px-3 py-2 w-full" />
                                    <FieldError />
                                </TextField>
                                <TextField name="totalSlot" type="number" isRequired>
                                    <Label>Total Slot</Label>
                                    <Input placeholder="20" className="border border-tc-border bg-tc-surface-alt rounded-md px-3 py-2 w-full" />
                                    <FieldError />
                                </TextField>
                            </div>
                        </div>
                        <div className="space-y-4 w-full">
                            <h2 className="text-lg font-bold text-tc-heading flex items-center gap-2">
                                <MdOutlineSchool size={22} />
                                Teaching Details
                            </h2>
                            <TextField name="bio" isRequired>
                                <Label>Short Bio</Label>
                                <TextArea placeholder="Write a short introduction about yourself..." rows={4} className="border border-tc-border bg-tc-surface-alt rounded-md px-3 py-2 w-full" />
                                <FieldError />
                            </TextField>
                        </div>
                        <div className="space-y-5 w-full">
                            <h2 className="text-lg font-bold text-tc-heading flex items-center gap-2">
                                <LuCalendarDays size={22} />
                                Weekly Availability
                            </h2>
                            <div className="space-y-2">
                                <p className="text-sm font-medium text-tc-secondary">
                                    Select Your Available Days
                                </p>
                                <Surface className="border border-tc-border bg-tc-surface-alt rounded-md">
                                    <ListBox aria-label="Select Your Available Days" selectionMode="multiple" orientation="horizontal" selectedKeys={availableDays} onSelectionChange={setAvailableDays} className="flex flex-row flex-wrap gap-2 p-2">
                                        {weekDays.map((day) => (
                                            <ListBox.Item key={day} id={day} textValue={day} className={({ isSelected }) => `w-fit border rounded-md px-4 py-2 text-sm cursor-pointer transition ${isSelected ? "bg-tc-primary text-white border-tc-primary" : "border-tc-border text-tc-secondary hover:border-tc-primary"}`}>
                                                {day}
                                            </ListBox.Item>
                                        ))}
                                    </ListBox>
                                </Surface>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <TimeField name="startTime" fullWidth isRequired>
                                    <Label>Start Time</Label>
                                    <TimeField.Group className="border border-tc-border bg-tc-surface-alt rounded-md px-3 py-2">
                                        <HiOutlineClock className="text-tc-muted text-lg" />
                                        <TimeField.Input>
                                            {(segment) => (
                                                <TimeField.Segment segment={segment} />
                                            )}
                                        </TimeField.Input>
                                    </TimeField.Group>
                                    <FieldError />
                                </TimeField>
                                <TimeField name="endTime" fullWidth isRequired>
                                    <Label>End Time</Label>
                                    <TimeField.Group className="border border-tc-border bg-tc-surface-alt rounded-md px-3 py-2">
                                        <HiOutlineClock className="text-tc-muted text-lg" />
                                        <TimeField.Input>
                                            {(segment) => (
                                                <TimeField.Segment segment={segment} />
                                            )}
                                        </TimeField.Input>
                                    </TimeField.Group>
                                    <FieldError />
                                </TimeField>
                            </div>
                            <DatePicker name="sessionStartDate" className="w-full" isRequired>
                                <Label>Session Starts From</Label>
                                <DateField.Group className="border border-tc-border bg-tc-surface-alt rounded-md px-3 py-2">
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
                                    <Calendar aria-label="Select session start date">
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
                                <FieldError />
                            </DatePicker>
                        </div>
                        <div className="pt-2 w-full">
                            <Button type="submit" isDisabled={isSubmitting} className="w-full bg-tc-primary text-white rounded-md font-semibold py-6 text-base hover:bg-tc-primary-hover">
                                {
                                    isSubmitting ? (
                                        <Loader size="sm" className="text-white" text="Adding Tutor..." />
                                    ) : (
                                        <>
                                            <HiOutlineBookOpen size={20} />
                                            Add Tutor
                                        </>
                                    )
                                }
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
        </section>
    );
};

export default AddTutor;