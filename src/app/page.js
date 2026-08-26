import HeroSlider from "@/components/HeroSlider";
import AvailableTutors from "@/components/Home/AvailableTutors";
import ExploreBySubject from "@/components/Home/ExploreBySubject";
import SessionJourny from "@/components/Home/SessionJourny";

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
