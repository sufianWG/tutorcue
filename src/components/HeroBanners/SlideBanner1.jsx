"use client"

import { Avatar, Button } from '@heroui/react';
import Image from 'next/image';
import React from 'react';
import { FaPlay, FaArrowRight, FaRegCalendarAlt, FaUser, FaCircle } from "react-icons/fa";
import HeroBannerImage from '@/assets/Slider-1-Img.png';
import { IoCalculatorOutline } from 'react-icons/io5';
import { LuCalendarRange } from 'react-icons/lu';

const SlideBanner1 = () => {
    const tutors = [
        {
            id: 1,
            image: "https://www.pngitem.com/pimgs/m/581-5813504_avatar-dummy-png-transparent-png.png",
            name: "John Doe",
        },
        {
            id: 2,
            image: "https://cdn-icons-png.flaticon.com/256/149/149071.png",
            name: "Kate Wilson",
        },
        {
            id: 3,
            image: "https://www.pngitem.com/pimgs/m/581-5813504_avatar-dummy-png-transparent-png.png",
            name: "Emily Chen",
        },
        {
            id: 4,
            image: "https://cdn-icons-png.flaticon.com/256/149/149071.png",
            name: "Michael Brown",
        },
        {
            id: 5,
            image: "https://www.pngitem.com/pimgs/m/581-5813504_avatar-dummy-png-transparent-png.png",
            name: "Olivia Davis",
        },
    ];
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
                <div className="lg:mb-0 relative">
                    <div className="aspect-[3/2] w-[300px] lg:w-[500px] max-w-[500px] relative mx-auto lg:">
                        <Image src={HeroBannerImage} alt="Hero Banner Image" fill className="object-contain" />
                    </div>
                    <div className="static md:absolute md:-top-10 lg:-top-10 md:-left-20 lg:right-0 lg:w-fit flex flex-col items-center md:items-start bg-[var(--surface)] shadow-lg p-4 rounded-md mx-4 lg: space-y-1">
                        <div className="md:-ml-4 w-fit flex items-center gap-4 justify-center lg:justify-start rounded-lg px-4">
                            <div className='space-y-1'>
                                <h3 className="text-sm font-bold flex items-center gap-2"> <IoCalculatorOutline size={25} />  Mathmatics</h3>
                                <p className='text-xs text-[var(--muted)]'>120+ Tutors</p>
                            </div>
                        </div>
                        <div className="flex -space-x-2">
                            {tutors.slice(0, 3).map((tutor) => (
                                <Avatar key={tutor.id} className="ring-2 ring-background">
                                    <Avatar.Image alt={tutor.name} src={tutor.image} />
                                    <Avatar.Fallback>
                                        {tutor.name
                                            .split(" ")
                                            .map((n) => n[0])
                                            .join("")}
                                    </Avatar.Fallback>
                                </Avatar>
                            ))}
                            <Avatar className="ring-2 ring-background">
                                <Avatar.Fallback className="text-xs">+{tutors.length - 3}</Avatar.Fallback>
                            </Avatar>
                        </div>
                    </div>
                    <div className="static md:absolute md:-bottom-5 lg:-bottom-5 md:-right-10 lg:-right-10 md:w-fit flex flex-col items-center md:items-start bg-[var(--surface)] shadow-lg md:p-2 lg:p-4 rounded-md mx-2 lg:mx-2 space-y-0.5 mt-2 md:mt-0 mb-8 md:mb-0">
                        <h3 className='font-bold text-xs flex items-center gap-2'> <FaCircle className='text-green-500' size={10} /> Next Available</h3>
                        <div className="md:-ml-4 w-fit flex items-center gap-4 justify-center lg:justify-start rounded-lg md:p-2 lg:p-4 ">
                            <div className="text-[var(--secondary)] p-2"><LuCalendarRange size={24} /></div>
                            <div>
                                <h3 className="text-sm font-bold text[var(--secondary)]"> Today, 7:30 PM</h3>
                                <hr className='text-[var(--muted)] my-1' />
                                <p className='text-xs text-[var(--muted)]'>Online - 1 hr</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SlideBanner1;