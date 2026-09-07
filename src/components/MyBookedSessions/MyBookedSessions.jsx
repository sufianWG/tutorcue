"use client";

import { Button, Chip, Label, ListBox, Modal, Select, Table, useOverlayState } from "@heroui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { HiOutlineCalendarDays } from "react-icons/hi2";
import { PiCalendarXLight } from "react-icons/pi";
import { toast } from "react-toastify";
import Loader from "@/components/shared/Loader";
import SessionTokenCard from "@/components/Home/SessionTokenCard";
import { authClient } from "@/lib/auth-client";
import { convertTo12Hour } from "@/lib/formatTime";

const statusOptions = ["Upcoming", "Completed", "Cancelled"];

// session ti already sesh hoye gese kina segula check korar jonne, end time dhore date ta banano hocche
const getSessionDateTime = (booking) =>
    new Date(`${booking.month} ${booking.dateNumber}, ${booking.year} ${booking.sessionTime.end}`);

const getBookingStatus = (booking) => {
    if (booking.status === "cancelled") return "Cancelled";
    return getSessionDateTime(booking) < new Date() ? "Completed" : "Upcoming";
};

const MyBookedSessions = () => {
    const [mounted, setMounted] = useState(false);
    const [myBookings, setMyBookings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState("");
    const [cancellingBooking, setCancellingBooking] = useState(null);
    const [isCancelling, setIsCancelling] = useState(false);
    const { isPending: isSessionPending } = authClient.useSession();
    const cancelModalState = useOverlayState();

    useEffect(() => {
        setMounted(true);
    }, []);

    // amar joto session book kora ache shob DB theke niye ashbe
    const fetchMyBookings = async () => {
        try {
            const { data: tokenData } = await authClient.token();
            const token = tokenData?.token;
            if (!token) return;
            const res = await fetch(`${process.env.NEXT_PUBLIC_TUTORCUE_SERVER_URL}/my-bookings`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = await res.json();
            // console.log("myBookings:", data);
            setMyBookings(data);
        } catch (error) {
            console.log("Error getting my bookings:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // session ready na hoya porjonto wait kora hocche, na hole token na peye khali list thake jay
    useEffect(() => {
        if (isSessionPending) return;
        const myBookingsHandler = async () => {
            await fetchMyBookings()
        }
        myBookingsHandler()
    }, [isSessionPending]);

    const filteredBookings = statusFilter
        ? myBookings.filter((booking) => getBookingStatus(booking) === statusFilter)
        : myBookings;

    // pass card e sobcheye kache thaka upcoming session ti dekhano hobe, na thakle sobcheye shesh booking ti
    const upcomingBookings = myBookings
        .filter((booking) => getBookingStatus(booking) === "Upcoming")
        .sort((a, b) => getSessionDateTime(a) - getSessionDateTime(b));
    const featuredBooking = upcomingBookings[0] || myBookings[0] || null;

    const openCancelModal = (booking) => {
        setCancellingBooking(booking);
        cancelModalState.open();
    };

    const handleCancelBooking = async () => {
        setIsCancelling(true)

        const { data: postTokenData } = await authClient.token()
        const token = postTokenData?.token
        // console.log("token", token);

        const res = await fetch(`${process.env.NEXT_PUBLIC_TUTORCUE_SERVER_URL}/bookings/${cancellingBooking._id}/cancel`, {
            method: "PATCH",
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        const cancelResult = await res.json()
        // console.log("Cancel result:", cancelResult)
        setIsCancelling(false)
        if (res.ok) {
            toast.success("Session cancelled successfully!")
            cancelModalState.close()
            fetchMyBookings()
        } else {
            toast.error("Failed to cancel session!")
        }
    };

    if (!mounted || isLoading) {
        return (
            <div className="bg-tc-background py-16">
                <Loader text="Loading your sessions..." />
            </div>
        );
    }

    return (
        <section className="bg-tc-background py-8 md:py-10">
            <div className="container mx-auto px-3 md:px-4">
                <div className="flex flex-col lg:flex-row gap-4 items-start">
                    <div className="flex-2/3 w-full space-y-5">
                        <div className="space-y-1">
                            <h1 className="text-3xl md:text-4xl font-bold text-tc-heading">My Booked Sessions</h1>
                            <p className="text-tc-muted">View and manage all your tutoring sessions in one place.</p>
                        </div>

                        <div className="flex items-center justify-between gap-3 bg-tc-surface border border-tc-border rounded-lg p-3 md:p-4">
                            <h2 className="text-lg font-bold text-tc-heading">Your Sessions</h2>
                            <Select className="w-[180px]" placeholder="All Sessions" value={statusFilter} onChange={setStatusFilter}>
                                <Label className="sr-only">Filter by status</Label>
                                <Select.Trigger className="border border-tc-border bg-tc-surface-alt rounded-md">
                                    <Select.Value />
                                    <Select.Indicator />
                                </Select.Trigger>
                                <Select.Popover className={"rounded-md"}>
                                    <ListBox>
                                        <ListBox.Item id="" textValue="All Sessions">
                                            All Sessions
                                            <ListBox.ItemIndicator />
                                        </ListBox.Item>
                                        {statusOptions.map((status) => (
                                            <ListBox.Item key={status} id={status} textValue={status}>
                                                {status}
                                                <ListBox.ItemIndicator />
                                            </ListBox.Item>
                                        ))}
                                    </ListBox>
                                </Select.Popover>
                            </Select>
                        </div>

                        {
                            filteredBookings.length === 0 ? (
                                <div className="bg-tc-surface border border-tc-border rounded-lg py-16 text-center space-y-2">
                                    <PiCalendarXLight className="mx-auto text-tc-muted" size={50} />
                                    <h3 className="text-lg font-semibold text-tc-heading">No sessions found</h3>
                                    <p className="text-tc-muted">{myBookings.length === 0 ? "You haven't booked any sessions yet." : "No sessions match this filter."}</p>
                                    {
                                        myBookings.length === 0 &&
                                        <Link href="/tutors"><Button className="mt-2 bg-tc-primary text-tc-surface rounded-md px-4 py-2">Find a Tutor</Button></Link>
                                    }
                                </div>
                            ) : (
                                <div className="bg-tc-surface border border-tc-border rounded-lg overflow-hidden">
                                    <Table className="w-full">
                                        <Table.ScrollContainer>
                                            <Table.Content aria-label="My booked sessions table">
                                                <Table.Header>
                                                    <Table.Column isRowHeader>Tutor</Table.Column>
                                                    <Table.Column>Subject</Table.Column>
                                                    <Table.Column>Date</Table.Column>
                                                    <Table.Column>Time</Table.Column>
                                                    <Table.Column>Mode</Table.Column>
                                                    <Table.Column>Status</Table.Column>
                                                    <Table.Column>Actions</Table.Column>
                                                </Table.Header>
                                                <Table.Body items={filteredBookings}>
                                                    {(booking) => {
                                                        const status = getBookingStatus(booking);
                                                        return (
                                                            <Table.Row id={booking._id}>
                                                                <Table.Cell>
                                                                    <h4 className="font-semibold text-tc-heading">{booking.tutor?.name}</h4>
                                                                </Table.Cell>
                                                                <Table.Cell>{booking.tutor?.subject}</Table.Cell>
                                                                <Table.Cell>{booking.day}, {booking.dateNumber} {booking.month} {booking.year}</Table.Cell>
                                                                <Table.Cell>{convertTo12Hour(booking.sessionTime.start)} - {convertTo12Hour(booking.sessionTime.end)}</Table.Cell>
                                                                <Table.Cell>{booking.sessionMode}</Table.Cell>
                                                                <Table.Cell>
                                                                    <Chip className={`rounded-md ${status === "Upcoming" ? 'bg-tc-primary/30' : status === "Completed" ? 'bg-tc-success/40' : 'bg-tc-error/20'}`}>{status}</Chip>
                                                                </Table.Cell>
                                                                <Table.Cell>
                                                                    {
                                                                        status === "Upcoming" ? (
                                                                            <Button onClick={() => openCancelModal(booking)} className="border border-tc-error text-tc-error rounded-md px-3 py-1.5 text-sm hover:bg-tc-error hover:text-tc-surface">
                                                                                Cancel
                                                                            </Button>
                                                                        ) : (
                                                                            <span className="text-tc-muted">—</span>
                                                                        )
                                                                    }
                                                                </Table.Cell>
                                                            </Table.Row>
                                                        );
                                                    }}
                                                </Table.Body>
                                            </Table.Content>
                                        </Table.ScrollContainer>
                                    </Table>
                                </div>
                            )
                        }
                    </div>

                    <div className="flex-1/3 w-full">
                        <SessionTokenCard subject={featuredBooking?.tutor?.subject} tutor={featuredBooking?.tutor?.name} date={featuredBooking ? `${featuredBooking.day}, ${featuredBooking.dateNumber} ${featuredBooking.month} ${featuredBooking.year}` : undefined} startTime={featuredBooking ? convertTo12Hour(featuredBooking.sessionTime.start) : undefined} endTime={featuredBooking ? convertTo12Hour(featuredBooking.sessionTime.end) : undefined} mode={featuredBooking?.sessionMode} token={featuredBooking?.sessionPassCode} circleBg="bg-tc-background"></SessionTokenCard>
                    </div>
                </div>
            </div>

            <Modal state={cancelModalState}>
                <Modal.Backdrop>
                    <Modal.Container placement="auto">
                        <Modal.Dialog className="sm:max-w-sm">
                            <Modal.CloseTrigger />
                            <Modal.Header>
                                <Modal.Icon className="bg-danger-soft text-danger-soft-foreground">
                                    <HiOutlineCalendarDays className="text-lg" />
                                </Modal.Icon>
                                <Modal.Heading>Cancel this session?</Modal.Heading>
                                <p className="mt-1.5 text-sm leading-5 text-muted">
                                    Are you sure you want to cancel your session with <span className="font-semibold">{cancellingBooking?.tutor?.name}</span> on {cancellingBooking?.day}, {cancellingBooking?.dateNumber} {cancellingBooking?.month} {cancellingBooking?.year}?
                                </p>
                            </Modal.Header>
                            <Modal.Footer>
                                <Button onClick={cancelModalState.close} className={"rounded-md border border-tc-border text-tc-secondary px-4 py-2"}>
                                    Keep Booking
                                </Button>
                                <Button onClick={handleCancelBooking} isDisabled={isCancelling} className={"rounded-md bg-tc-error text-tc-surface px-4 py-2"}>
                                    {
                                        isCancelling ? (
                                            <Loader size="sm" className="text-white" text="Cancelling..." />
                                        ) : "Yes, Cancel"
                                    }
                                </Button>
                            </Modal.Footer>
                        </Modal.Dialog>
                    </Modal.Container>
                </Modal.Backdrop>
            </Modal>
        </section>
    );
};

export default MyBookedSessions;
