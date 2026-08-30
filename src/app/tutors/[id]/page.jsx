import Booking from "@/components/TutorDetailPage/Booking";
import TutorDetails from "@/components/TutorDetailPage/TutorDetails";
import TutorSummaryCard from "@/components/TutorDetailPage/TutorSummaryCard";
import { tutorsDetail } from "@/lib/api";

const tutorDetailPage = async ({ params }) => {
    const { id } = await params;
    // console.log(id);
    const tutor = await tutorsDetail(id)
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