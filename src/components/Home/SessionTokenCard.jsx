"use client"

import { Card, CardContent, CardFooter, CardHeader } from '@heroui/react';
import Image from 'next/image';
import Logo from '@/assets/tutorCue.png';
import LightLogo from '@/assets/tutorCue-light.png';
import { MdOutlineTopic } from 'react-icons/md';
import { useTheme } from 'next-themes';
import { FaRegClock, FaUserTie } from 'react-icons/fa';
import { LuCalendarDays } from 'react-icons/lu';
import { RiComputerLine } from 'react-icons/ri';


const SessionTokenCard = () => {
    const tutorSession = {
        subject: "Mathmetics",
        tutor: "Hayder Ali",
        date: "September 20, 2026",
        startTime: "7: 00 PM",
        EndTime: "8: 00 PM",
        Mode: "Online (Google Meet)"
    }
    const { resolvedTheme } = useTheme();

    if (!resolvedTheme) {
        return null;
    }
    const isDark = resolvedTheme == "dark"
    return (
        <div>
            <Card className='relative w-full md:min-w-80 lg:min-w-90 rounded-xl shadow p-0 bg-[var(--surface)] space-y-2 overflow-visible'>
                <CardHeader className='bg-[var(--primary)] rounded-tl-xl rounded-tr-xl border-2 border-[var(--secondary)]/40'>
                    <div className='flex justify-between items-center p-4'>
                        <Image src={isDark ? Logo : LightLogo} alt="Logo" width={120} height={60}></Image>
                        <h3 className='text-xl text-[var(--surface)]'>SESSION PASS</h3>
                    </div>
                </CardHeader>
                <div className='absolute bg-[var(--surface-alt)] w-5 h-5 rounded-full left-0 top-16 -translate-x-1/2 border-r-2 border-r-[var(--secondary)]'></div>
                <div className='absolute bg-[var(--surface-alt)] w-5 h-5 rounded-full right-0 top-16 translate-x-1/2 border-l-2 border-l-[var(--secondary)]'></div>
                <CardContent className='p-2 md:py-1 px-4 md:px-8 space-y-1'>
                    <div className='flex items-center gap-5 md:gap-8'>
                        <div>
                            <MdOutlineTopic className='text-[(--heading)]' size={35} />
                        </div>
                        <div>
                            <h4 className='text-sm text-[(--muted)]'>Subject</h4>
                            <h3 className='text-base font-bold text-[var(--heading)]'>{tutorSession.subject}</h3>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 md:gap-8'>
                        <div>
                            <FaUserTie className='text-[(--heading)]' size={35} />
                        </div>
                        <div>
                            <h4 className='text-sm text-[(--muted)]'>Tutor</h4>
                            <h3 className='text-base font-bold text-[var(--heading)]'>{tutorSession.tutor}</h3>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 md:gap-8'>
                        <div>
                            <LuCalendarDays className='text-[(--heading)]' size={35} />
                        </div>
                        <div>
                            <h4 className='text-sm text-[(--muted)]'>Date</h4>
                            <h3 className='text-base font-bold text-[var(--heading)]'>{tutorSession.date}</h3>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 md:gap-8'>
                        <div>
                            <FaRegClock className='text-[(--heading)]' size={35} />
                        </div>
                        <div>
                            <h4 className='text-sm text-[(--muted)]'>Time</h4>
                            <h3 className='text-base font-bold text-[var(--heading)]'>{tutorSession.startTime}-{tutorSession.EndTime}</h3>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 md:gap-8'>
                        <div>
                            <RiComputerLine className='text-[(--heading)]' size={35} />
                        </div>
                        <div>
                            <h4 className='text-sm text-[(--muted)]'>Mode</h4>
                            <h3 className='text-base font-bold text-[var(--heading)]'>{tutorSession.Mode}</h3>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className='px-4 md:px-8'>
                    <div className='p-1 md:p-4'>
                        <h4 className='text-lg text-[var(--heading)]'>Session Token</h4>
                        <h1 className='uppercase font-bold text-[var(--primary)] text-3xl'>tc-m8k42p</h1>
                    </div>
                </CardFooter>
                <div className='absolute border-t-2 border-dashed border-[var(--muted)]/60 w-4/5 bottom-20 md:bottom-24 mx-8'></div>
                <div className='absolute bg-[var(--surface-alt)] w-5 h-5 rounded-full left-0 bottom-18 md:bottom-22 -translate-x-1/2 border-r-2 border-r-[var(--muted)]/20 '></div>
                <div className='absolute bg-[var(--surface-alt)] w-5 h-5 rounded-full right-0 bottom-20 md:bottom-24 translate-x-1/2 border-l-2 border-l-[var(--muted)]/20'></div>
            </Card>
        </div>
    );
};

export default SessionTokenCard;