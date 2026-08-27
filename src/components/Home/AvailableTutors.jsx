import Link from 'next/link';
import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import HeadingTopBorder from '../shared/HeadingTopBorder';
import TutorCard from '../TutorCard';
import { tutorsWsP } from '@/lib/api';

const AvailableTutors = async () => {
    const tutors = await tutorsWsP()
    // console.log("tutorsFromHomePage", tutors);
    return (
        <div className='bg-tc-surface'>
            <div className='container mx-auto py-10 space-y-3'>
                <div className='flex flex-col md:flex-row text-center md:text-left justify-center md:justify-between gap-2 md:gap-3 px-3 md:px-0 '>
                    <div className='space-y-2'> <HeadingTopBorder></HeadingTopBorder> <h2 className='mt-4 text-xl text-tc-secondary font-bold'>Available Tutors</h2>
                        <p className='text-tc-muted text-base'>Connect with experienced tutors ready to help you learn.</p>
                    </div>
                    <div className='mx-auto md:mx-0'><Link href={"/tutors"} className='text-tc-primary text-base flex items-center gap-1 md:gap-2'>View all tutors <FaArrowRight /> </Link></div>
                </div>
                <div>
                    {tutors.length === 0 ? <div className="text-center">
                        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-tc-heading">No tutor found</h1>
                        <h3 className="text-tc-muted text-sm md:text-lg">Please try again..</h3>
                    </div> :
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-2 lg:gap-3">
                            {
                                tutors.slice(0, 6).map(tutor => {
                                    return <TutorCard key={tutor._id} tutor={tutor}></TutorCard>
                                })
                            }
                        </div>}
                </div>
            </div>
        </div>
    );
};

export default AvailableTutors;