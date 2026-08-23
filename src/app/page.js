import Image from "next/image";
import NavBar from "../components/shared/NavBar";
import SliderBanner1 from "@/components/HeroBanners/SlideBanner1";
import SliderBanner2 from "@/components/HeroBanners/SlideBanner2";

export default function Home() {
  return (
    <div>
      <SliderBanner2></SliderBanner2>
      <div>
        <h1>Another section comming soon...</h1>
      </div>
    </div>
  );
}
