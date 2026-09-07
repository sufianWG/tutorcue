"use client";

import { Button, FieldError, Form, Input, Label, ListBox, Modal, Select, Surface, TextArea, TextField, TimeField } from "@heroui/react";
import { parseTime } from "@internationalized/date";
import { useEffect, useState } from "react";
import { HiOutlineClock, HiOutlinePencilSquare } from "react-icons/hi2";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import Loader from "@/components/shared/Loader";

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

const UpdateTutorModal = ({ tutor, modalState, onUpdated }) => {
    const [mounted, setMounted] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [selectedSubject, setSelectedSubject] = useState(tutor.subject);
    const [selectedTeachingMode, setSelectedTeachingMode] = useState(tutor.teachingMode);
    const [availableDays, setAvailableDays] = useState(new Set(tutor.availableDays || []));

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleUpdateTutor = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const formEntries = Object.fromEntries(formData.entries());
        // console.log("formEntries", formEntries);

        if (!formEntries.startTime || !formEntries.endTime || availableDays.size === 0) {
            toast.error("Please select available days and time");
            return;
        }

        const updatedData = {
            ...formEntries,

            subject: selectedSubject,
            teachingMode: selectedTeachingMode,

            hourlyFee: Number(formEntries.hourlyFee),
            experience: Number(formEntries.experience),

            availableDays: [...availableDays],

            availableTimeSlot: {
                start: formEntries.startTime,
                end: formEntries.endTime,
            },
        };

        delete updatedData.startTime;
        delete updatedData.endTime;

        // console.log("updatedData:", updatedData);

        setIsUpdating(true)

        const { data: postTokenData } = await authClient.token()
        const token = postTokenData?.token
        // console.log("token", token);

        const res = await fetch(`${process.env.NEXT_PUBLIC_TUTORCUE_SERVER_URL}/tutors/${tutor._id}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(updatedData)
        })
        const updateResult = await res.json()
        // console.log("Update result:", updateResult)
        setIsUpdating(false)
        if (res.ok) {
            toast.success("Tutor updated successfully!")
            onUpdated()
            modalState.close()
        } else {
            toast.error("Failed to update tutor!")
        }
    };

    if (!mounted) {
        return null;
    }

    return (
        <Modal state={modalState}>
            <Modal.Backdrop>
                <Modal.Container placement="auto">
                    <Modal.Dialog className="sm:max-w-xl">
                        <Modal.CloseTrigger />
                        <Modal.Header>
                            <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
                                <HiOutlinePencilSquare className="text-lg" />
                            </Modal.Icon>
                            <Modal.Heading>Update Tutor</Modal.Heading>
                            <p className="mt-1.5 text-sm leading-5 text-muted">
                                Update {tutor.tutorName}&apos;s teaching information below.
                            </p>
                        </Modal.Header>
                        <Modal.Body className="p-4">
                            <Surface variant="default">
                                <Form onSubmit={handleUpdateTutor} className="flex flex-col gap-4 p-2">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <TextField name="tutorName" defaultValue={tutor.tutorName} isRequired>
                                            <Label>Full Name</Label>
                                            <Input className="border border-tc-border bg-tc-surface-alt rounded-md px-3 py-2 w-full" />
                                            <FieldError />
                                        </TextField>
                                        <TextField name="photo" type="url" defaultValue={tutor.photo} isRequired>
                                            <Label>Photo URL</Label>
                                            <Input className="border border-tc-border bg-tc-surface-alt rounded-md px-3 py-2 w-full" />
                                            <FieldError />
                                        </TextField>
                                        <Select placeholder="Select subject" value={selectedSubject} onChange={setSelectedSubject} isRequired>
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
                                        <Select placeholder="Select teaching mode" value={selectedTeachingMode} onChange={setSelectedTeachingMode} isRequired>
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
                                        <TextField name="hourlyFee" type="number" defaultValue={String(tutor.hourlyFee)} isRequired>
                                            <Label>Hourly Fee (BDT)</Label>
                                            <Input className="border border-tc-border bg-tc-surface-alt rounded-md px-3 py-2 w-full" />
                                            <FieldError />
                                        </TextField>
                                        <TextField name="experience" type="number" defaultValue={String(tutor.experience)} isRequired>
                                            <Label>Experience (years)</Label>
                                            <Input className="border border-tc-border bg-tc-surface-alt rounded-md px-3 py-2 w-full" />
                                            <FieldError />
                                        </TextField>
                                    </div>
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
                                        <TimeField name="startTime" defaultValue={parseTime(tutor.availableTimeSlot.start)} fullWidth isRequired>
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
                                        <TimeField name="endTime" defaultValue={parseTime(tutor.availableTimeSlot.end)} fullWidth isRequired>
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
                                    <TextField name="aboutTutor" defaultValue={tutor.aboutTutor} isRequired>
                                        <Label>About Tutor</Label>
                                        <TextArea placeholder="Brief description about the tutor and teaching approach." rows={4} className="border border-tc-border bg-tc-surface-alt rounded-md px-3 py-2 w-full" />
                                        <FieldError />
                                    </TextField>
                                    <Modal.Footer>
                                        <Button onClick={modalState.close} className={"rounded-md border border-tc-border text-tc-secondary px-4 py-2"}>
                                            Cancel
                                        </Button>
                                        <Button type="submit" isDisabled={isUpdating} className={"rounded-md bg-tc-primary text-tc-surface px-4 py-2 hover:bg-tc-secondary"}>
                                            {
                                                isUpdating ? (
                                                    <Loader size="sm" className="text-white" text="Saving..." />
                                                ) : "Save Changes"
                                            }
                                        </Button>
                                    </Modal.Footer>
                                </Form>
                            </Surface>
                        </Modal.Body>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
};

export default UpdateTutorModal;
