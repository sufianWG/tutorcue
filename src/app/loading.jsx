import Loader from "@/components/shared/Loader";

const Loading = () => {
    return (
        <div className="min-h-[70vh] flex items-center justify-center">
            <Loader size="lg" text="Loading TutorCue..." />
        </div>
    );
};

export default Loading;
