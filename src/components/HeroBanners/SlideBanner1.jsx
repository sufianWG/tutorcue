"use client"

import { Avatar, Button } from '@heroui/react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { FaPlay, FaArrowRight, FaRegCalendarAlt, FaUser, FaCircle } from "react-icons/fa";
import HeroBannerImage from '@/assets/Slider-1-Img.png';
import { IoCalculatorOutline } from 'react-icons/io5';
import { LuCalendarRange } from 'react-icons/lu';
import { tutorsWsP } from '@/lib/api';
import { useRouter } from 'next/navigation';

const SlideBanner1 = () => {
    const [tutors, setTutors] = useState([])
    const [pagination, setPagination] = useState({})
    // console.log("tutors", tutors);
    const router = useRouter()
    useEffect(() => {
        const fetchTutors = async () => {
            try {
                const res = await fetch("https://tutorcue-server.vercel.app/tutors");
                const data = await res.json();
                // console.log("tutorsDataFromFunction", data.tutors);
                if (!res.ok) {
                    throw new Error("Failed to fetch tutor data")
                }
                setTutors(data.tutors)
            } catch (error) {
                console.error("Error fetching tutors:", error);
            }
        }
        fetchTutors()
    }, [])
    useEffect(() => {
        const fetchPagiData = async () => {
            try {
                const res = await fetch("https://tutorcue-server.vercel.app/tutors");
                const data = await res.json();
                // console.log("paginatinoDataFromFunction", data.pagination);
                if (!res.ok) {
                    throw new Error("Failed to fetch pagination data")
                }
                setPagination(data.pagination)
            } catch (error) {
                console.error("Error fetching pagination:", error);
            }
        }
        fetchPagiData()
    }, [])

    const handleExploreBtn = () => {
        router.push("/tutors")
    }
    const handleHitWorkBtn = () => {
        router.push("/")
    }
    return (
        <div className='bg-tc-surface-alt'>
            <div className='max-w-6xl mx-auto pt-15 px-8 md:px-12 lg:px-14 lg:min-h-screen flex flex-col md:flex-row items-center justify-start lg:justify-between gap-10'>
                <div className="w-full lg:w-1/2 space-y-4">
                    <h3 className="text-tc-primary text-xs font-bold uppercase bg-tc-muted/10 px-4 py-2 rounded-full w-fit flex items-center gap-2"> <FaRegCalendarAlt size={15} /> LEARN AT THE RIGHT TIME</h3>
                    <h1 className='text-tc-secondary text-3xl sm:text-4xl lg:text-5xl font-bold'>Find the right tutor <br /> for the way <span className='text-tc-primary'>you learn.</span></h1>
                    <p className="text-tc-muted text-base">Browse expert tutors by subject, availability,
                        location and teaching mode. Book sessions
                        that fit your goals and your schedule.</p>
                    <div className="flex gap-4">
                        <Button className={"rounded-md bg-tc-primary text-tc-surface hover:bg-tc-primary-hover px-2 py-1"} onClick={handleExploreBtn}>Explore Tutors <FaArrowRight /> </Button>
                        <Button className={"rounded-md bg-tc-transparent text-tc-secondary hover:bg-tc-primary hover:text-tc-surface px-2 py-1 border-tc-secondary hover:border-tc-primary border-2"} onClick={handleHitWorkBtn}>How it works <FaPlay /></Button>
                    </div>
                </div>
                <div className="lg:mb-0 relative">
                    <div className="aspect-[3/2] w-[300px] lg:w-[500px] max-w-[500px] relative mx-auto lg:mx-0">
                        <Image src={HeroBannerImage} alt="Hero Banner Image" fill className="object-contain" />
                    </div>
                    <div className="static md:absolute md:-top-10 lg:-top-10 md:-left-20 lg:right-0 lg:w-fit flex flex-col items-center md:items-start bg-tc-surface shadow-lg p-4 rounded-md mx-4 lg:mx-0 space-y-1">
                        <div className="md:-ml-4 w-fit flex items-center gap-4 justify-center lg:justify-start rounded-lg px-4">
                            <div className='space-y-1'>
                                <h3 className="text-sm font-bold flex items-center gap-2"> <IoCalculatorOutline size={25} />  Mathmatics</h3>
                                <p className='text-xs text-tc-muted'><span>{pagination.totalTutors}</span>+ Tutors</p>
                            </div>
                        </div>
                        <div className="flex -space-x-2">
                            {tutors.slice(0, 3).map((tutor) => (
                                <Avatar key={tutor._id} className="ring-2 ring-background">
                                    <Avatar.Image alt={tutor.tutorName} src={tutor.photo} />
                                    <Avatar.Fallback>
                                        {tutor.tutorName
                                            .split(" ")
                                            .map((n) => n[0])
                                            .join("")}
                                    </Avatar.Fallback>
                                </Avatar>
                            ))}
                            <Avatar className="ring-2 ring-background">
                                <Avatar.Fallback className="text-xs">+{pagination.totalTutors - 3}</Avatar.Fallback>
                            </Avatar>
                        </div>
                    </div>
                    <div className="static md:absolute md:-bottom-5 lg:-bottom-5 md:-right-10 lg:-right-10 md:w-fit flex flex-col items-center md:items-start bg-tc-surface shadow-lg md:p-2 lg:p-4 rounded-md mx-2 lg:mx-2 space-y-0.5 mt-2 md:mt-0 mb-8 md:mb-0">
                        <h3 className='font-bold text-xs flex items-center gap-2'> <FaCircle className='text-green-500' size={10} /> Next Available</h3>
                        <div className="md:-ml-4 w-fit flex items-center gap-4 justify-center lg:justify-start rounded-lg md:p-2 lg:p-4 ">
                            <div className="text-tc-secondary p-2"><LuCalendarRange size={24} /></div>
                            <div>
                                <h3 className="text-sm font-bold text-tc-secondary"> Today, 7:30 PM</h3>
                                <hr className='text-tc-muted my-1' />
                                <p className='text-xs text-tc-muted'>Online - 1 hr</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SlideBanner1;