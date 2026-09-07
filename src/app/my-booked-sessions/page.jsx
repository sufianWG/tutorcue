import MyBookedSessions from "@/components/MyBookedSessions/MyBookedSessions";

export const metadata = {
    title: "My Booked Sessions | TutorCue",
    description:
        "View and manage your booked tutoring sessions, session pass codes, upcoming lessons, completed sessions, and cancellations.",
};

const myBookedSessionPage = () => {
    return (
        <div>
            <MyBookedSessions></MyBookedSessions>
        </div>
    );
};

export default myBookedSessionPage;