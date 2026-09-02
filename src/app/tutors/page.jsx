import Pagination from "@/components/Pagination";
import TutorCard from "@/components/TutorCard";
import TutorSearchFilter from "@/components/TutorSearchFilter";
import { allTutors } from "@/lib/api";

export const metadata = {
    title: "Browse Tutors | TutorCue",
    description:
        "Browse qualified tutors by subject, location, institution, and teaching mode. Find the right tutor and book your learning session instantly.",
};
const tutorsPage = async ({ searchParams }) => {
    const params = await searchParams;
    const data = await allTutors(params);
    const tutors = data.tutors
    const pagiData = data.pagination;
    // console.log(pagiData);

    return (
        <div className="bg-tc-surface">
            <div className="container mx-auto p-3 md:p-4 lg:p-5">
                <div className="">
                    <TutorSearchFilter></TutorSearchFilter>
                </div>
                <div>
                    <h3 className="text-base text-tc-muted py-3">Showing <span className="text-tc-primary">{tutors.length}</span> tutors of <span className="text-tc-primary">{pagiData.totalTutors}</span> </h3>
                    {tutors.length === 0 ? <div className="text-center">
                        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-tc-heading">No tutor found</h1>
                        <h3 className="text-tc-muted text-sm md:text-lg">Please try again..</h3>
                    </div> :
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-2 lg:gap-3">
                            {
                                tutors.map(tutor => {
                                    return <TutorCard key={tutor._id} tutor={tutor}></TutorCard>
                                })
                            }
                        </div>}
                </div>
                <div className="py-5 mx-auto my-10">
                    <Pagination pagiData={pagiData}></Pagination>
                </div>
            </div>
        </div>
    );
};

export default tutorsPage;