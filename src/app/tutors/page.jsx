import TutorCard from "@/components/TutorCard";
import { allTutors } from "@/lib/api";

const tutorsPage = async () => {
    const tutors = await allTutors();
    console.log(tutors);
    return (
        <div className="bg-tc-surface">
            <div className="container mx-auto p-3 md:p-4 lg:p-5">
                <div>Search components</div>
                <div>
                    <h3 className="text-base text-tc-muted py-3">Showing <span className="text-tc-primary">{tutors.length}</span> tutors</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 md:gap-2 lg:gap-3">
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