import Login from '@/components/Login';

export const metadata = {
    title: "Login | TutorCue",
    description:
        "Sign in to your TutorCue account to manage tutors, bookings, and personalized learning sessions.",
};

const LoginPage = () => {
    return (
        <div>
            <Login></Login>
        </div>
    );
};

export default LoginPage;