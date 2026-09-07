import MyTutors from "@/components/MyTutors/MyTutors";

export const metadata = {
    title: "My Tutors | TutorCue",
    description:
        "Manage all tutors you have added on TutorCue. Update tutor information, availability, and teaching details.",
};
const myTutorPage = () => {
    return (
        <div>
            <MyTutors></MyTutors>
        </div>
    );
};

export default myTutorPage;