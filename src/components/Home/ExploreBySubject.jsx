"use client"

import Link from 'next/link';
import React from 'react';
import { FaArrowRight, FaReact } from 'react-icons/fa';
import HeadingTopBorder from '../shared/HeadingTopBorder';
import { IoCalculatorOutline } from 'react-icons/io5';
import { FaArrowRightLong } from 'react-icons/fa6';
import { GiOpenBook } from 'react-icons/gi';
import { GrPersonalComputer } from 'react-icons/gr';
import { SlChemistry } from 'react-icons/sl';
import { BiLeaf } from 'react-icons/bi';

const ExploreBySubject = () => {
    const subjects = [
        { id: 1, name: "Mathematics", total: 240, sublink: "/", icon: <IoCalculatorOutline size={25} /> },
        { id: 2, name: "Physics", total: 180, sublink: "/", icon: <FaReact size={25} /> },
        { id: 3, name: "English", total: 210, sublink: "/", icon: <GiOpenBook size={25} /> },
        { id: 4, name: "Computer Science", total: 190, sublink: "/", icon: <GrPersonalComputer size={25} /> },
        { id: 5, name: "Chemistry", total: 160, sublink: "/", icon: <SlChemistry size={25} /> },
        { id: 6, name: "Biology", total: 150, sublink: "/", icon: <BiLeaf size={25} /> },
    ]
    return (
        <div className='bg-[var(--surface)]'>
            <div className='container mx-auto px-4 py-8 flex flex-col md:flex-row md:gap-5 gap-3 md:gap-10 lg:gap-15 md:justify-between items-center'>
                <div className='leftSide space-y-6 md:flex-1'>
                    <HeadingTopBorder></HeadingTopBorder>
                    <h2 className='text-3xl text-[var(--heading)] font-bold'>Explore by Subject</h2>
                    <p className='text-base text-[var(--muted)]'>Find the perfect tutor for your subject.
                        Quality guidance for every learner.</p>
                    <Link href={"/tutors"} className='text-base text-[var(--success)] flex items-center gap-2 font-bold'>Browse all subjects <FaArrowRight size={15}></FaArrowRight> </Link>
                </div>
                <div className='rightSide md:flex-2'>
                    <div className='border-2 border-[var(--border)]/70 rounded-md'>
                        {
                            subjects.map((sub) => {
                                return <div key={sub.id}>
                                    <div className='flex gap-3 items-center justify-between p-4 border-b-2 border-[var(--border)]/70'>
                                        <div className='text-[var(--secondary)] flex items-center gap-5'> {sub.icon}  <span className='text-lg font-bold'>{sub.name}</span></div>
                                        <div className='text-[var(--muted)] flex items-center gap-2'>
                                            <Link href={sub.sublink} className='flex items-center gap-5'><span>{sub.total}+ Tutors</span> <FaArrowRightLong /></Link>
                                        </div>
                                    </div>
                                </div>
                            })
                        }


                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExploreBySubject;