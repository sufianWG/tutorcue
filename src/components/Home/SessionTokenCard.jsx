"use client"

import { Card, CardContent, CardFooter, CardHeader } from '@heroui/react';
import Image from 'next/image';
import Logo from '@/assets/tutorCue.png';
import LightLogo from '@/assets/tutorCue-light.png';
import { MdOutlineTopic } from 'react-icons/md';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { FaRegClock, FaUserTie } from 'react-icons/fa';
import { LuCalendarDays } from 'react-icons/lu';
import { RiComputerLine } from 'react-icons/ri';


const SessionTokenCard = ({ subject, tutor, date, startTime, endTime, mode, token, circleBg = "bg-tc-surface-alt" }) => {
    const [mounted, setMounted] = useState(false);
    const tutorSession = {
        subject,
        tutor,
        date,
        startTime,
        EndTime: endTime,
        Mode: mode
    }
    const { resolvedTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }
    const isDark = resolvedTheme == "dark"
    return (
        <div>
            <Card className='relative w-full md:min-w-80 lg:min-w-90 rounded-xl shadow p-0 bg-tc-surface space-y-2 overflow-visible'>
                <CardHeader className='bg-tc-primary rounded-tl-xl rounded-tr-xl border-2 border-tc-secondary/40'>
                    <div className='flex justify-between items-center p-4'>
                        <Image src={isDark ? Logo : LightLogo} alt="Logo" width={120} height={60}></Image>
                        <h3 className='text-xl text-tc-surface'>SESSION PASS</h3>
                    </div>
                </CardHeader>
                <div className={`absolute ${circleBg} w-5 h-5 rounded-full left-0 top-16 -translate-x-1/2 border-r-2 border-r-tc-secondary`}></div>
                <div className={`absolute ${circleBg} w-5 h-5 rounded-full right-0 top-16 translate-x-1/2 border-l-2 border-l-tc-secondary`}></div>
                <CardContent className='p-2 md:py-1 px-4 md:px-8 space-y-1'>
                    <div className='flex items-center gap-5 md:gap-8'>
                        <div>
                            <MdOutlineTopic className='text-tc-heading' size={35} />
                        </div>
                        <div>
                            <h4 className='text-sm text-tc-muted'>Subject</h4>
                            <h3 className='text-base font-bold text-tc-heading'>{tutorSession.subject}</h3>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 md:gap-8'>
                        <div>
                            <FaUserTie className='text-tc-heading' size={35} />
                        </div>
                        <div>
                            <h4 className='text-sm text-tc-muted'>Tutor</h4>
                            <h3 className='text-base font-bold text-tc-heading'>{tutorSession.tutor}</h3>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 md:gap-8'>
                        <div>
                            <LuCalendarDays className='text-tc-heading' size={35} />
                        </div>
                        <div>
                            <h4 className='text-sm text-tc-muted'>Date</h4>
                            <h3 className='text-base font-bold text-tc-heading'>{tutorSession.date || "N/A"}</h3>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 md:gap-8'>
                        <div>
                            <FaRegClock className='text-tc-heading' size={35} />
                        </div>
                        <div>
                            <h4 className='text-sm text-tc-muted'>Time</h4>
                            <h3 className='text-base font-bold text-tc-heading'>{tutorSession.startTime && tutorSession.EndTime ? `${tutorSession.startTime}-${tutorSession.EndTime}` : "N/A"}</h3>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 md:gap-8'>
                        <div>
                            <RiComputerLine className='text-tc-heading' size={35} />
                        </div>
                        <div>
                            <h4 className='text-sm text-tc-muted'>Mode</h4>
                            <h3 className='text-base font-bold text-tc-heading'>{tutorSession.Mode || "N/A"}</h3>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className='px-4 md:px-8'>
                    <div className='p-1 md:p-4'>
                        <h4 className='text-lg text-tc-heading'>Session Token</h4>
                        {
                            token
                                ? <h1 className='uppercase font-bold text-tc-primary text-3xl'>{token}</h1>
                                : <h1 className='font-semibold text-tc-muted text-lg'>Will be generated after booking</h1>
                        }
                    </div>
                </CardFooter>
                <div className='absolute border-t-2 border-dashed border-tc-muted/60 w-4/5 bottom-20 md:bottom-24 mx-8'></div>
                <div className={`absolute ${circleBg} w-5 h-5 rounded-full left-0 bottom-18 md:bottom-22 -translate-x-1/2 border-r-2 border-r-tc-muted/20`}></div>
                <div className={`absolute ${circleBg} w-5 h-5 rounded-full right-0 bottom-20 md:bottom-24 translate-x-1/2 border-l-2 border-l-tc-muted/20`}></div>
            </Card>
        </div>
    );
};

export default SessionTokenCard;