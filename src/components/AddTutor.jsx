"use client";

import { Button, Checkbox, CheckboxGroup, FieldError, Form, Input, Label, Select, SelectItem, Textarea, TextField } from "@heroui/react";
import { useState } from "react";
import { HiOutlineBookOpen, HiOutlineClock, HiOutlineMapPin, HiOutlineUserCircle } from "react-icons/hi2";
import { LuCalendarDays } from "react-icons/lu";
import { MdOutlineSchool } from "react-icons/md";


const AddTutor = () => {
    const [availableDays, setAvailableDays] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState(new Set([]));
    const [selectedTeachingMode, setSelectedTeachingMode] = useState(new Set([]));

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

        const tutorData = {
            ...formEntries,

            subject: [...selectedSubject][0],
            teachingMode: [...selectedTeachingMode][0],

            hourlyFee: Number(formEntries.hourlyFee),
            experience: Number(formEntries.experience),

            availableDays,

            availableTimeSlot: {
                start: formEntries.startTime,
                end: formEntries.endTime,
            },
        };

        delete tutorData.startTime;
        delete tutorData.endTime;

        console.log("Tutor Data:", tutorData);

        // Better Auth token + POST API এখানে করবে
    };

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

                                <Input name="tutorName" label="Tutor Name" placeholder="Enter tutor name" variant="bordered" isRequired classNames={{ inputWrapper: "border border-tc-border bg-tc-surface-alt rounded-md" }} />

                                <Input name="photo" label="Photo URL" placeholder="Paste profile photo URL" variant="bordered" isRequired classNames={{ inputWrapper: "border border-tc-border bg-tc-surface-alt rounded-md" }} />

                                <Select name="subject" label="Subject" placeholder="Select subject" variant="bordered" selectedKeys={selectedSubject} onSelectionChange={setSelectedSubject} isRequired classNames={{ trigger: "border border-tc-border bg-tc-surface-alt rounded-md" }}>
                                    {subjects.map((subject) => (
                                        <SelectItem key={subject}>
                                            {subject}
                                        </SelectItem>
                                    ))}
                                </Select>

                                <Input name="hourlyFee" type="number" label="Hourly Fee (BDT)" placeholder="500" variant="bordered" isRequired classNames={{ inputWrapper: "border border-tc-border bg-tc-surface-alt rounded-md" }} />

                            </div>
                        </div>

                        <div className="space-y-4 w-full">
                            <h2 className="text-lg font-bold text-tc-heading flex items-center gap-2">
                                <MdOutlineSchool size={22} />
                                Teaching Details
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                <TextField name="tutorName" className="w-full" type="text" isRequired>
                                    <Label>Tutor Name</Label>

                                    <Input placeholder="Enter tutor name" />

                                    <FieldError />
                                </TextField>
                                <TextField name="tutorName" className="w-full" type="url">
                                    <Label>Photo</Label>

                                    <Input placeholder="Enter your photo url" />

                                    <FieldError />
                                </TextField>

                            </div>

                            <Textarea name="bio" label="Short Bio" placeholder="Write a short introduction about yourself..." variant="bordered" minRows={4} isRequired classNames={{ inputWrapper: "border border-tc-border bg-tc-surface-alt rounded-md" }} />
                        </div>


                        <div className="space-y-5 w-full">
                            <h2 className="text-lg font-bold text-tc-heading flex items-center gap-2">
                                <LuCalendarDays size={22} />
                                Weekly Availability
                            </h2>

                            <div className="space-y-2">
                                <p className="text-sm font-medium text-tc-secondary">
                                    Available Days
                                </p>

                                <CheckboxGroup value={availableDays} onValueChange={setAvailableDays} orientation="horizontal" className="flex flex-wrap gap-3">
                                    {weekDays.map((day) => (
                                        <Checkbox key={day} value={day}>
                                            {day}
                                        </Checkbox>
                                    ))}
                                </CheckboxGroup>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                <Input name="startTime" type="time" label="Start Time" variant="bordered" isRequired startContent={<HiOutlineClock className="text-tc-muted text-lg" />} classNames={{ inputWrapper: "border border-tc-border bg-tc-surface-alt rounded-md" }} />

                                <Input name="endTime" type="time" label="End Time" variant="bordered" isRequired startContent={<HiOutlineClock className="text-tc-muted text-lg" />} classNames={{ inputWrapper: "border border-tc-border bg-tc-surface-alt rounded-md" }} />

                            </div>

                            <Input name="sessionStartDate" type="date" label="Session Starts From" variant="bordered" isRequired classNames={{ inputWrapper: "border border-tc-border bg-tc-surface-alt rounded-md" }} />
                        </div>


                        <div className="pt-2 w-full">
                            <Button type="submit" className="w-full bg-tc-primary text-white rounded-md font-semibold py-6 text-base hover:bg-tc-primary-hover">
                                <HiOutlineBookOpen size={20} />
                                Add Tutor
                            </Button>
                        </div>

                    </Form>
                </div>
            </div>
        </section>
    );
};

export default AddTutor;