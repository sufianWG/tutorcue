import HeroSlider from "@/components/HeroSlider";
import AvailableTutors from "@/components/Home/AvailableTutors";
import ExploreBySubject from "@/components/Home/ExploreBySubject";

export default function Home() {
  return (
    <div>
      <HeroSlider></HeroSlider>
      <ExploreBySubject></ExploreBySubject>
      <AvailableTutors></AvailableTutors>
    </div>
  );
}
