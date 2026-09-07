"use client";

import { Avatar, Button, Chip, Label, Modal, SearchField, Table, useOverlayState } from "@heroui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";
import { HiOutlinePencilSquare, HiOutlinePlus, HiOutlineTrash } from "react-icons/hi2";
import { PiUsersThreeLight } from "react-icons/pi";
import { toast } from "react-toastify";
import Loader from "@/components/shared/Loader";
import { authClient } from "@/lib/auth-client";
import { convertTo12Hour } from "@/lib/formatTime";
import UpdateTutorModal from "./UpdateTutorModal";

const PAGE_SIZE = 5;

const MyTutors = () => {
    const [mounted, setMounted] = useState(false);
    const [myTutors, setMyTutors] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [editingTutor, setEditingTutor] = useState(null);
    const [deletingTutor, setDeletingTutor] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const { isPending: isSessionPending } = authClient.useSession();
    const editModalState = useOverlayState();
    const deleteModalState = useOverlayState();

    useEffect(() => {
        setMounted(true);
    }, []);

    // amar joto tutor ache shob DB theke niye ashbe
    const fetchMyTutors = async () => {
        try {
            const { data: tokenData } = await authClient.token();
            const token = tokenData?.token;
            if (!token) return;
            const res = await fetch(`${process.env.NEXT_PUBLIC_TUTORCUE_SERVER_URL}/my-tutors`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = await res.json();
            // console.log("myTutors:", data);
            setMyTutors(data);
        } catch (error) {
            console.log("Error getting my tutors:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // session ready na hoya porjonto wait kora hocche, na hole token na peye khali list thake jay
    useEffect(() => {
        if (isSessionPending) return;
        const myTutorsHandler = async () => {
            await fetchMyTutors()
        }
        myTutorsHandler()
    }, [isSessionPending]);

    const filteredTutors = myTutors.filter((tutor) =>
        tutor.tutorName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tutor.subject?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.max(1, Math.ceil(filteredTutors.length / PAGE_SIZE));
    const paginatedTutors = filteredTutors.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

    const handleSearch = (value) => {
        setSearchTerm(value);
        setCurrentPage(1);
    };

    const openEditModal = (tutor) => {
        setEditingTutor(tutor);
        editModalState.open();
    };

    const openDeleteModal = (tutor) => {
        setDeletingTutor(tutor);
        deleteModalState.open();
    };

    const handleDeleteTutor = async () => {
        setIsDeleting(true)

        const { data: postTokenData } = await authClient.token()
        const token = postTokenData?.token
        // console.log("token", token);

        const res = await fetch(`${process.env.NEXT_PUBLIC_TUTORCUE_SERVER_URL}/tutors/${deletingTutor._id}`, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        const deleteResult = await res.json()
        // console.log("Delete result:", deleteResult)
        setIsDeleting(false)
        if (res.ok) {
            toast.success("Tutor deleted successfully!")
            deleteModalState.close()
            fetchMyTutors()
        } else {
            toast.error("Failed to delete tutor!")
        }
    };

    if (!mounted || isLoading) {
        return (
            <div className="bg-tc-background py-16">
                <Loader text="Loading your tutors..." />
            </div>
        );
    }

    return (
        <section className="bg-tc-background py-8 md:py-10">
            <div className="container mx-auto px-3 md:px-4 space-y-5">
                <div className="space-y-1">
                    <h1 className="text-3xl md:text-4xl font-bold text-tc-heading">My Tutors</h1>
                    <p className="text-tc-muted">Manage your tutors, update details, and control availability.</p>
                </div>

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 bg-tc-surface border border-tc-border rounded-lg p-3 md:p-4">
                    <SearchField className="w-full md:w-[320px]" value={searchTerm} onChange={handleSearch}>
                        <Label className="sr-only">Search tutors</Label>
                        <SearchField.Group className="rounded-md">
                            <SearchField.SearchIcon />
                            <SearchField.Input placeholder="Search tutors by name or subject..." />
                            <SearchField.ClearButton />
                        </SearchField.Group>
                    </SearchField>
                    <Link href="/add-tutor"><Button className="bg-tc-primary text-tc-surface rounded-md px-4 py-2 flex items-center justify-center gap-2 hover:bg-tc-primary-hover"><HiOutlinePlus size={18} /> Add Tutor</Button></Link>
                </div>

                {
                    filteredTutors.length === 0 ? (
                        <div className="bg-tc-surface border border-tc-border rounded-lg py-16 text-center space-y-2">
                            <PiUsersThreeLight className="mx-auto text-tc-muted" size={50} />
                            <h3 className="text-lg font-semibold text-tc-heading">No tutors found</h3>
                            <p className="text-tc-muted">{myTutors.length === 0 ? "You haven't added any tutors yet." : "No tutors match your search."}</p>
                        </div>
                    ) : (
                        <div className="bg-tc-surface border border-tc-border rounded-lg overflow-hidden">
                            <Table className="w-full">
                                <Table.ScrollContainer>
                                    <Table.Content aria-label="My tutors table">
                                        <Table.Header>
                                            <Table.Column isRowHeader>Tutor</Table.Column>
                                            <Table.Column>Subject</Table.Column>
                                            <Table.Column>Mode</Table.Column>
                                            <Table.Column>Hourly Fee</Table.Column>
                                            <Table.Column>Slots</Table.Column>
                                            <Table.Column>Created Date</Table.Column>
                                            <Table.Column>Actions</Table.Column>
                                        </Table.Header>
                                        <Table.Body items={paginatedTutors}>
                                            {(tutor) => (
                                                <Table.Row id={tutor._id}>
                                                    <Table.Cell>
                                                        <div className="flex items-center gap-3">
                                                            <Avatar size="sm">
                                                                <Avatar.Image alt={tutor.tutorName} src={tutor.photo} />
                                                                <Avatar.Fallback>{tutor.tutorName?.charAt(0)}</Avatar.Fallback>
                                                            </Avatar>
                                                            <div>
                                                                <h4 className="font-semibold text-tc-heading">{tutor.tutorName}</h4>
                                                                <p className="text-xs text-tc-muted">{tutor.location}</p>
                                                            </div>
                                                        </div>
                                                    </Table.Cell>
                                                    <Table.Cell>{tutor.subject}</Table.Cell>
                                                    <Table.Cell>
                                                        <Chip className={`rounded-md ${tutor.teachingMode == "Online" ? 'bg-tc-success/40' : tutor.teachingMode == "Offline" ? 'bg-tc-accent/40' : 'bg-tc-secondary/40'}`}>{tutor.teachingMode}</Chip>
                                                    </Table.Cell>
                                                    <Table.Cell>৳{tutor.hourlyFee} /hr</Table.Cell>
                                                    <Table.Cell>
                                                        <p className="text-sm text-tc-secondary">{tutor.availableDays?.join(", ")}</p>
                                                        <p className="text-xs text-tc-muted">{convertTo12Hour(tutor.availableTimeSlot.start)} - {convertTo12Hour(tutor.availableTimeSlot.end)}</p>
                                                    </Table.Cell>
                                                    <Table.Cell>{new Date(tutor.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</Table.Cell>
                                                    <Table.Cell>
                                                        <div className="flex items-center gap-2">
                                                            <Button onClick={() => openEditModal(tutor)} className="border border-tc-border text-tc-secondary rounded-md px-3 py-1.5 text-sm flex items-center gap-1 hover:border-tc-primary">
                                                                <HiOutlinePencilSquare size={16} /> Edit
                                                            </Button>
                                                            <Button onClick={() => openDeleteModal(tutor)} className="border border-tc-error text-tc-error rounded-md px-3 py-1.5 text-sm flex items-center gap-1 hover:bg-tc-error hover:text-tc-surface">
                                                                <HiOutlineTrash size={16} /> Delete
                                                            </Button>
                                                        </div>
                                                    </Table.Cell>
                                                </Table.Row>
                                            )}
                                        </Table.Body>
                                    </Table.Content>
                                </Table.ScrollContainer>
                            </Table>
                            <div className="flex flex-col md:flex-row items-center justify-between gap-3 p-3 md:p-4 border-t border-tc-border">
                                <p className="text-sm text-tc-muted">Showing {(currentPage - 1) * PAGE_SIZE + 1} to {Math.min(currentPage * PAGE_SIZE, filteredTutors.length)} of {filteredTutors.length} tutors</p>
                                <div className="flex items-center gap-2">
                                    <Button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} isDisabled={currentPage === 1} className="w-9 h-9 flex items-center justify-center rounded-md border border-tc-border text-tc-secondary disabled:opacity-40">
                                        <GrFormPreviousLink size={20} />
                                    </Button>
                                    <span className="w-9 h-9 flex items-center justify-center rounded-md bg-tc-primary text-tc-surface text-sm font-semibold">{currentPage}</span>
                                    <Button onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} isDisabled={currentPage === totalPages} className="w-9 h-9 flex items-center justify-center rounded-md border border-tc-border text-tc-secondary disabled:opacity-40">
                                        <GrFormNextLink size={20} />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>

            {editingTutor && <UpdateTutorModal key={editingTutor._id} tutor={editingTutor} modalState={editModalState} onUpdated={fetchMyTutors}></UpdateTutorModal>}

            <Modal state={deleteModalState}>
                <Modal.Backdrop>
                    <Modal.Container placement="auto">
                        <Modal.Dialog className="sm:max-w-sm">
                            <Modal.CloseTrigger />
                            <Modal.Header>
                                <Modal.Icon className="bg-danger-soft text-danger-soft-foreground">
                                    <HiOutlineTrash className="text-lg" />
                                </Modal.Icon>
                                <Modal.Heading>Delete Tutor</Modal.Heading>
                                <p className="mt-1.5 text-sm leading-5 text-muted">
                                    Are you sure you want to delete <span className="font-semibold">{deletingTutor?.tutorName}</span>? This action cannot be undone.
                                </p>
                            </Modal.Header>
                            <Modal.Footer>
                                <Button onClick={deleteModalState.close} className={"rounded-md border border-tc-border text-tc-secondary px-4 py-2"}>
                                    Cancel
                                </Button>
                                <Button onClick={handleDeleteTutor} isDisabled={isDeleting} className={"rounded-md bg-tc-error text-tc-surface px-4 py-2"}>
                                    {
                                        isDeleting ? (
                                            <Loader size="sm" className="text-white" text="Deleting..." />
                                        ) : "Delete"
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

export default MyTutors;
