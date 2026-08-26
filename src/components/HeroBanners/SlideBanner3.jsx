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
        <div className='bg-tc-surface-alt'>
            <div className='max-w-6xl mx-auto py-10 lg:py-15 px-8 md:px-12 lg:px-14 lg:min-h-screen flex flex-col md:flex-row items-center justify-start md:justify-between gap-10'>
                <div className="space-y-4">
                    <h3 className="text-tc-primary text-xs font-bold uppercase bg-tc-muted/10 px-4 py-2 rounded-full w-fit flex items-center gap-2"> <FaRegCalendarAlt size={15} /> Flexible. Convenient. Online.</h3>
                    <h1 className='text-tc-secondary text-3xl sm:text-4xl lg:text-5xl font-bold'>Learn Anytime, <br /> <span className='text-tc-primary'>Anywhere</span></h1>
                    <p className="text-tc-muted text-base">Book sessions that fit your schedule. Learn from the
                        comfort of your home through our seamless platform.</p>
                    <div className="mt-6 flex flex-col md:flex-row gap-4 md:gap-8 text-tc-secondary text-sm font-bold">
                        <div className="flex items-center gap-2"> <span className="bg-tc-primary/30 text-tc-secondary p-2 rounded-full"> <FaRegCalendarAlt size={18} /> </span>  Flexible Scheduling </div>
                        <div className="flex items-center gap-2"> <span className="bg-tc-primary/30 text-tc-secondary p-2 rounded-full"> <IoVideocam size={18} /> </span> Personalized Learning </div>
                        <div className="flex items-center gap-2"> <span className="bg-tc-primary/30 text-tc-secondary p-2 rounded-full"> <MdOutlineSecurity size={18} /> </span> Safe & Secure </div>
                    </div>
                    <div className="flex gap-4">
                        <Button className={"rounded-md bg-tc-primary text-tc-surface hover:bg-tc-primary-hover px-2 py-1"}>Book a Session <FaArrowRight /> </Button>
                        <Button className={"rounded-md bg-tc-transparent text-tc-secondary hover:bg-tc-primary hover:text-tc-surface px-2 py-1 border-tc-secondary hover:border-tc-primary border-2"}>How it Works <FaPlay /></Button>
                    </div>
                </div>
                <div className="lg:mb-0 relative">
                    <div className="aspect-[3/2] w-[300px] lg:w-[500px] max-w-[500px] relative mx-auto lg:">
                        <Image src={HeroBannerImage3} alt="Hero Banner Image" fill className="object-contain" />
                    </div>

                    <div className="static md:absolute md:-top-20 lg:-top-20 md:-left-30 lg:right-0 lg:w-fit flex flex-col items-center md:items-start bg-tc-surface shadow-lg p-4 rounded-md mx-4 lg:">
                        <h3 className='font-bold text-xs'>Upcoming Session</h3>
                        <div className="md:-ml-4 w-fit flex items-center gap-4 justify-center lg:justify-start rounded-lg p-4 ">
                            <div className="bg-tc-primary/30 text-tc-secondary p-2 rounded-full"><FaUser size={24} /></div>
                            <div>
                                <h3 className="text-sm font-bold"> Math Session</h3>
                                <p className='text-xs font-bold'>Today, 7:00 PM</p>
                            </div>
                        </div>
                        <Button className="flex items-center gap-2 w-full text-sm rounded-md"> <span className="text-tc-surface p-2 rounded-md">Join Now</span> </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SlideBanner3;