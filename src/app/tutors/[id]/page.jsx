import Booking from "@/components/TutorDetailPage/Booking";
import TutorDetails from "@/components/TutorDetailPage/TutorDetails";
import TutorSummaryCard from "@/components/TutorDetailPage/TutorSummaryCard";
import { tutorsDetail } from "@/lib/api";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
export async function generateMetadata({ params }) {
    const sessionData = await auth.api.getSession({
        headers: await headers()
    });

    const jwtToken = sessionData.token;

    const tutor = await tutorsDetail(params.id, jwtToken);

    return {
        title: `${tutor.tutorName} | TutorCue Tutor Profile`,
        description: `Book a tutoring session with ${tutor.tutorName} for ${tutor.subject}. View availability, experience, teaching mode, and hourly fee.`,
    };
}
const tutorDetailPage = async ({ params }) => {
    const { id } = await params;
    // console.log(id);
    const { token } = await auth.api.getToken({
        headers: await headers()
    })
    // console.log("token", token);

    const tutor = await tutorsDetail(id, token)
    console.log("tutor", tutor);
    return (
        <div className="bg-tc-background">
            <div className="container mx-auto py-6 md:py-10 px-2 md:px-4">
                <div className="flex gap-2 md:gap-3 flex-col md:flex-row">
                    <div className="flex-2/3 space-y-3">
                        <div> <TutorSummaryCard tutor={tutor}></TutorSummaryCard> </div>
                        <div> <TutorDetails tutor={tutor}></TutorDetails> </div>
                    </div>
                    <div className="flex-1/3"> <Booking tutor={tutor}></Booking> </div>
                </div>
            </div>
        </div>
    );
};

export default tutorDetailPage;