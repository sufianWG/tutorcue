"use client"
import { Button } from '@heroui/react';
import Image from 'next/image';
import React from 'react';
import { FaPlay, FaArrowRight } from "react-icons/fa";
import HeroBannerImage2 from '@/assets/slider-2-img.png';
import HeroBannerImage2Light from '@/assets/slider-2-img-light.png';
import { useTheme } from 'next-themes';
import { SiKnowledgebase } from 'react-icons/si';
import { FaGraduationCap, FaStar, FaUser } from 'react-icons/fa6';
import { MdOutlineBarChart } from 'react-icons/md';
import { HiUsers } from 'react-icons/hi';
const SlideBanner2 = () => {
    const { resolvedTheme } = useTheme();

    if (!resolvedTheme) {
        return null;
    }

    const isDark = resolvedTheme == "dark"
    return (
        <div className='bg-[var(--surface-alt)]'>
            <div className='max-w-6xl mx-auto py-10 lg:py-15 px-8 md:px-12 lg:px-0 lg:min-h-screen flex flex-col md:flex-row items-center justify-start md:justify-between gap-10'>
                <div className="space-y-4">
                    <h3 className="text-[var(--primary)] text-xs font-bold uppercase bg-[var(--muted)]/10 px-4 py-2 rounded-full w-fit flex items-center gap-2"> <SiKnowledgebase size={15} /> Learn Smarter, Not Harder</h3>
                    <h1 className='text-[var(--secondary)] text-3xl sm:text-4xl lg:text-5xl font-bold'>Expert Tutors <br /> <span className='text-[var(--primary)]'>Better Results.</span></h1>
                    <p className="text-[var(--muted)] text-base md:w-2/3 lg:w-full">Connect with verified tutors who are passionate
                        about teaching and dedicated to your success.</p>
                    <div className="mt-6 flex flex-col md:flex-row gap-4 md:gap-8 text-[var(--secondary)] text-sm font-bold">
                        <div className="flex items-center gap-2"> <span className="bg-[var(--primary)]/30 text-[var(--secondary)] p-2 rounded-full"> <FaUser size={18} /> </span>  Verified Tutors </div>
                        <div className="flex items-center gap-2"> <span className="bg-[var(--primary)]/30 text-[var(--secondary)] p-2 rounded-full"> <FaGraduationCap size={18} /> </span> Personalized Learning </div>
                        <div className="flex items-center gap-2"> <span className="bg-[var(--primary)]/30 text-[var(--secondary)] p-2 rounded-full"> <MdOutlineBarChart size={18} /> </span> Better Grades Guaranteed </div>
                    </div>
                    <div className="flex gap-4">
                        <Button className={"rounded-md bg-[var(--primary)] text-[var(--surface)] hover:bg-[var(--primary-hover)] px-2 py-1"}>Find Your Tutor <FaArrowRight /> </Button>
                        <Button className={"rounded-md bg-[var(--transparent)] text-[var(--secondary)] hover:bg-[var(--primary)] hover:text-[var(--surface)] px-2 py-1 border-[var(--secondary)] hover:border-[var(--primary)] border-2"}>Learn More <FaPlay /></Button>
                    </div>
                </div>
                <div className="lg:mb-0 relative">
                    <div className="aspect-[3/2] w-[300px] lg:w-[500px] max-w-[500px] relative mx-auto lg:">
                        <Image src={isDark ? HeroBannerImage2Light : HeroBannerImage2} alt="Hero Banner Image" fill className="object-contain" />
                    </div>

                    <div className="relative md:absolute md:-top-20 lg:-top-2 md:-left-35 flex md:-left-10 flex-col items-center md:items-start">
                        <div className="md:-ml-4 w-fit flex items-center gap-4 justify-center lg:justify-start bg-[var(--surface)] shadow-lg rounded-lg p-4 mt-4 md:mt-0 mb-0 lg:mb-2">
                            <div className="bg-[var(--primary)]/30 text-[var(--secondary)] p-2 rounded-full"><HiUsers size={24} /></div>
                            <div>
                                <h3 className="text-lg font-bold"> 10,000+</h3>
                                <p className='text-sm font-bold'>Happy Students</p>
                            </div>
                        </div>
                        <div className="w-fit flex items-center gap-4 justify-center lg:justify-start bg-[var(--surface)] shadow-lg rounded-lg p-4 mt-6 lg:mt-0">
                            <div className="bg-[var(--primary)]/30 text-[var(--secondary)] p-2 rounded-full"><FaStar size={24} /></div>
                            <div>
                                <h3 className="text-lg font-bold"> 4.9/5</h3>
                                <p className='text-sm font-bold'>Average Rating</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SlideBanner2;