import HeroSlider from "@/components/HeroSlider";
import AvailableTutors from "@/components/Home/AvailableTutors";
import ExploreBySubject from "@/components/Home/ExploreBySubject";
import SessionJourny from "@/components/Home/SessionJourny";

export const metadata = {
  title: "TutorCue | Find Trusted Tutors for Online & Offline Learning",
  description:
    "TutorCue helps students connect with experienced tutors for online and offline learning. Book sessions easily and learn at your preferred schedule.",
};

export default function Home() {
  return (
    <div>
      <HeroSlider></HeroSlider>
      <ExploreBySubject></ExploreBySubject>
      <AvailableTutors></AvailableTutors>
      <SessionJourny></SessionJourny>
    </div>
  );
}
