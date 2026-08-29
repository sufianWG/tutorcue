"use client"
import { Chip } from '@heroui/react';
import React from 'react';
import { BiSolidGraduation } from 'react-icons/bi';
import { FaRegUser } from 'react-icons/fa';
import { GiOpenBook } from 'react-icons/gi';
import { LuCalendarDays } from 'react-icons/lu';

const TutorDetails = ({ tutor }) => {
    const { tutorName, aboutTutor, teachingExpertise, subjectCovered, availableDays, availableTimeSlot } = tutor;
    return (
        <div className='space-y-4 rounded-xl shadow p-2 md:p-3 bg-tc-surface'>
            <div className='aboutTutor space-y-3'>
                <h2 className='flex items-center gap-2 text-xl font-bold text-tc-secondary'><FaRegUser /> About {tutorName}</h2>
                <p className='text-tc-muted text-base'>{aboutTutor}</p>
            </div>
            <div className='teachingExpertise space-y-3'>
                <h2 className='flex items-center gap-2 text-xl font-bold text-tc-secondary'><BiSolidGraduation /> Teaching Expertise</h2>
                <div className='flex gap-1 md:gap-2 items-center flex-wrap md:flex-nowrap'>
                    {
                        teachingExpertise.map((expertItem, ind) => {
                            return <Chip key={ind} className='p-1 rounded-md bg-tc-surface-alt/50 text-xs'>{expertItem}</Chip>
                        })
                    }
                </div>
            </div>
            <div className='subjectsCovered space-y-3'>
                <h2 className='flex items-center gap-2 text-xl font-bold text-tc-secondary'><GiOpenBook /> Subjects Covered</h2>
                <div className='flex gap-1 md:gap-2 items-center flex-wrap md:flex-nowrap'>
                    {
                        subjectCovered.map((expertItem, ind) => {
                            return <Chip key={ind} className='p-1 rounded-md bg-tc-surface-alt/50 text-xs'>{expertItem}</Chip>
                        })
                    }
                </div>
            </div>
        </div>
    );
};

export default TutorDetails;