import TutorCard from "@/components/TutorCard";
import TutorSearchFilter from "@/components/TutorSearchFilter";
import { allTutors, paginationData } from "@/lib/api";

const tutorsPage = async ({searchParams}) => {
    // const {search, subject, teachingMode, location, sort } = await searchParams;
    const params = await searchParams;
    // console.log({
    //     search,
    //     subject,
    //     teachingMode,
    //     location,
    //     sort
    // });
    const tutors = await allTutors(params);
    const pagiData = await paginationData();
    // console.log(pagiData);
    // console.log(tutors);

    

    return (
        <div className="bg-tc-surface">
            <div className="container mx-auto p-3 md:p-4 lg:p-5">
                <div className="">
                    <TutorSearchFilter></TutorSearchFilter>
                </div>
                <div>
                    <h3 className="text-base text-tc-muted py-3">Showing <span className="text-tc-primary">{tutors.length}</span> tutors of <span className="text-tc-primary">{pagiData.totalTutors}</span> </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-2 lg:gap-3">
                        {
                            tutors.map(tutor => {
                                return <TutorCard key={tutor._id} tutor={tutor}></TutorCard>
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default tutorsPage;