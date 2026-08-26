"use client"

import { BiSearchAlt } from "react-icons/bi";
import { IoTicketOutline } from "react-icons/io5";
import { LuCalendarCheck, LuCalendarDays } from "react-icons/lu";
import HeadingTopBorder from "../shared/HeadingTopBorder";
import SessionTokenCard from "./SessionTokenCard";

const SessionJourny = () => {
    const steps = [
        {
            id: 1,
            title: "Discover a tutor",
            description:
                "Search and filter tutors by subject, mode, location and availability.",
            icon: <BiSearchAlt size={30} />,
        },
        {
            id: 2,
            title: "Check availability",
            description:
                "View real-time availability and choose a time that works for you.",
            icon: <LuCalendarDays size={30} />,
        },
        {
            id: 3,
            title: "Book your session",
            description:
                "Confirm your booking securely and get instant confirmation.",
            icon: <LuCalendarCheck size={30} />,
        },
        {
            id: 4,
            title: "Receive your token",
            description:
                "Get your session token and join your session seamlessly.",
            icon: <IoTicketOutline size={30} className="text-[var(--secondary)]" />,
        },
    ];
    return (
        <div className="bg-[var(--surface-alt)]">
            <div className="container mx-auto block md:flex px-3 sm:px-4 md:px-0 md:gap-3 items-center py-5">
                <div className="leftSide flex-2.5 space-y-4 py-4">
                    <HeadingTopBorder></HeadingTopBorder>
                    <h2 className='text-3xl text-[var(--heading)] font-bold text-center md:text-left'>Your Session Journey</h2>
                    <h4 className='text-base text-[var(--muted)] text-center md:text-left'>From discovery to your personalized learning session</h4>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-3">
                        {
                            steps.map((step, ind) => {
                                const Icon = step.icon
                                return <div key={step.id} className="relative">
                                    <div className="relative">
                                        <div className="relative flex items-center justify-center md:justify-start">
                                            <div className="relative z-10 flex h-[72px] w-[72px] items-center justify-center rounded-full bg-[var(--primary)]/20">
                                                {Icon}
                                            </div>
                                            {
                                                ind !== steps.length - 1 && (
                                                    <div className="hidden md:block absolute left-22 right-4 top-1/2 -translate-y-1/2 border-t-2 border-dashed border-[var(--muted)]"></div>
                                                )
                                            }
                                        </div>
                                        <div className="mt-6 max-w-55 space-y-2 mx-auto md:mx-0 text-center md:text-left">
                                            <h3 className="font-semibold text-lg text-[var(--heading)]">{step.id}. {step.title}</h3>
                                            <p className="text-[var(--muted)] leading-6 mt-3 text-sm">{step.description}</p>
                                        </div>
                                    </div>
                                </div>
                            })
                        }
                    </div>
                </div>
                <div className="rightSide flex-2.5"></div>
                    <SessionTokenCard></SessionTokenCard>
            </div>
        </div>
    );
};

export default SessionJourny;