"use client"
import { Button } from '@heroui/react';
import Image from 'next/image';
import React from 'react';
import { FaPlay, FaArrowRight, FaRegCalendarAlt } from "react-icons/fa";
import HeroBannerImage3 from '@/assets/slider-img-3.png';
import { FaUser } from 'react-icons/fa6';
import { MdOutlineSecurity } from 'react-icons/md';
import { IoVideocam } from 'react-icons/io5';
const SlideBanner3 = () => {
    return (
        <div className='bg-[var(--surface-alt)]'>
            <div className='max-w-6xl mx-auto py-10 lg:py-15 px-6 lg: min-h-screen flex flex-col lg:flex-row items-center justify-between gap-10'>
                <div className="space-y-4">
                    <h3 className="text-[var(--primary)] text-xs font-bold uppercase bg-[var(--muted)]/10 px-4 py-2 rounded-full w-fit flex items-center gap-2"> <FaRegCalendarAlt size={15} /> Flexible. Convenient. Online.</h3>
                    <h1 className='text-[var(--secondary)] text-5xl font-bold'>Learn Anytime, <br /> <span className='text-[var(--primary)]'>Anywhere</span></h1>
                    <p className="text-[var(--muted)] text-base">Book sessions that fit your schedule. Learn from the
                        comfort of your home through our seamless platform.</p>
                    <div className="mt-6 flex flex-col md:flex-row gap-4 md:gap-8 text-[var(--secondary)] text-sm font-bold">
                        <div className="flex items-center gap-2"> <span className="bg-[var(--primary)]/30 text-[var(--secondary)] p-2 rounded-full"> <FaRegCalendarAlt size={18} /> </span>  Flexible Scheduling </div>
                        <div className="flex items-center gap-2"> <span className="bg-[var(--primary)]/30 text-[var(--secondary)] p-2 rounded-full"> <IoVideocam size={18} /> </span> Personalized Learning </div>
                        <div className="flex items-center gap-2"> <span className="bg-[var(--primary)]/30 text-[var(--secondary)] p-2 rounded-full"> <MdOutlineSecurity size={18} /> </span> Safe & Secure </div>
                    </div>
                    <div className="flex gap-4">
                        <Button className={"rounded-md bg-[var(--primary)] text-[var(--surface)] hover:bg-[var(--primary-hover)] px-2 py-1"}>Book a Session <FaArrowRight /> </Button>
                        <Button className={"rounded-md bg-[var(--transparent)] text-[var(--secondary)] hover:bg-[var(--primary)] hover:text-[var(--surface)] px-2 py-1 border-[var(--secondary)] hover:border-[var(--primary)] border-2"}>How it Works <FaPlay /></Button>
                    </div>
                </div>
                <div className="lg:mb-0 relative">
                    <div className="aspect-[3/2] w-[300px] lg:w-[500px] max-w-[500px] relative mx-auto lg:">
                        <Image src={HeroBannerImage3} alt="Hero Banner Image" fill className="object-contain" />
                    </div>

                    <div className="relative static lg:absolute -top-20 lg:right-0 flex flex-col items-center lg:items-start bg-[var(--surface)] shadow-lg p-4 rounded-md mx-4 lg:">
                        <h3 className='font-bold text-xs'>Upcoming Session</h3>
                        <div className="md:-ml-4 w-fit flex items-center gap-4 justify-center lg:justify-start rounded-lg p-4 ">
                            <div className="bg-[var(--primary)]/30 text-[var(--secondary)] p-2 rounded-full"><FaUser size={24} /></div>
                            <div>
                                <h3 className="text-sm font-bold"> Math Session</h3>
                                <p className='text-xs font-bold'>Today, 7:00 PM</p>
                            </div>
                        </div>
                        <Button className="flex items-center gap-2 w-full text-sm rounded-md"> <span className="text-[var(--surface)] p-2 rounded-md">Join Now</span> </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SlideBanner3;