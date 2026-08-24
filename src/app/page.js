import Image from "next/image";
import NavBar from "../components/shared/NavBar";
import SliderBanner1 from "@/components/HeroBanners/SlideBanner1";
import SliderBanner2 from "@/components/HeroBanners/SlideBanner2";
import SliderBanner3 from "@/components/HeroBanners/SlideBanner3";
import HeroSlider from "@/components/HeroSlider";
import ExploreBySubject from "@/components/Home/ExploreBySubject";

export default function Home() {
  return (
    <div>
      <HeroSlider></HeroSlider>
      <ExploreBySubject></ExploreBySubject>
    </div>
  );
}
