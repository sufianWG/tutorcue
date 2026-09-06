import AddTutor from "@/components/AddTutor";

export const metadata = {
    title: "Become a Tutor | TutorCue",
    description:
        "Create your tutor profile on TutorCue. Share your expertise, set your schedule, and start teaching students online or offline.",
};
const addTutorPage = () => {
    return (
        <div>
            <AddTutor></AddTutor>
        </div>
    );
};

export default addTutorPage;