import MainNotFound from "@/components/NotFoundPages/MainNotFound";

export const metadata = {
    title: "Page Not Found | TutorCue",
    description:
        "The page you are looking for does not exist on TutorCue. Return to the homepage to continue browsing tutors.",
};

const NotFoundPage = () => {
    return (
        <div>
            <MainNotFound></MainNotFound>
        </div>
    );
};

export default NotFoundPage;