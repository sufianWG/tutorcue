import Profile from "@/components/Profile/Profile";

export const metadata = {
    title: "My Profile | TutorCue",
    description:
        "Manage your TutorCue profile information, account details, and learning preferences.",
};
const profilePage = () => {
    return (
        <div>
            <Profile></Profile>
        </div>
    );
};

export default profilePage;