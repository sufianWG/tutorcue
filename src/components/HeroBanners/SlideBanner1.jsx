import { Button } from '@heroui/react';
import Image from 'next/image';
import React from 'react';
import { FaPlay, FaArrowRight, FaRegCalendarAlt } from "react-icons/fa";
import HeroBannerImage from '@/assets/Slider-1-Img.png';

const SlideBanner1 = () => {
    return (
        <div className='bg-[var(--surface-alt)]'>
            <div className='max-w-6xl mx-auto pt-15 px-8 md:px-12 lg:px-0 lg:px-0 lg:min-h-screen flex flex-col md:flex-row items-center justify-start lg:justify-between gap-10'>
                <div className="w-full lg:w-1/2 space-y-4">
                    <h3 className="text-[var(--primary)] text-xs font-bold uppercase bg-[var(--muted)]/10 px-4 py-2 rounded-full w-fit flex items-center gap-2"> <FaRegCalendarAlt size={15} /> LEARN AT THE RIGHT TIME</h3>
                    <h1 className='text-[var(--secondary)] text-3xl sm:text-4xl lg:text-5xl font-bold'>Find the right tutor <br /> for the way <span className='text-[var(--primary)]'>you learn.</span></h1>
                    <p className="text-[var(--muted)] text-base">Browse expert tutors by subject, availability,
                        location and teaching mode. Book sessions
                        that fit your goals and your schedule.</p>
                        <div className="flex gap-4">
                            <Button className={"rounded-md bg-[var(--primary)] text-[var(--surface)] hover:bg-[var(--primary-hover)] px-2 py-1"}>Explore Tutors <FaArrowRight /> </Button>
                            <Button className={"rounded-md bg-[var(--transparent)] text-[var(--secondary)] hover:bg-[var(--primary)] hover:text-[var(--surface)] px-2 py-1 border-[var(--secondary)] hover:border-[var(--primary)] border-2"}>How it works <FaPlay /></Button>
                        </div>
                </div>
                <div className="lg:mt-0 lg:mb-0">
                    <div className="aspect-[3/2] w-[300px] lg:w-[500px] max-w-[500px] relative mx-auto lg:">
                        <Image src={HeroBannerImage} alt="Hero Banner Image" fill className="object-contain" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SlideBanner1;