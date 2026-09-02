import SignUp from '@/components/SignUp';

export const metadata = {
    title: "Create Account | TutorCue",
    description:
        "Create a TutorCue account to book tutoring sessions, manage bookings, and connect with trusted tutors.",
};
const signUpPage = () => {

    return (
        <div>
            <SignUp></SignUp>
        </div>
    );
};

export default signUpPage;