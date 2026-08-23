"use client";

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { ThemeSwitcher } from './ThemeSwitcher';
import Logo from '@/assets/tutorCue.png';
import LightLogo from '@/assets/tutorCue-light.png';
import { useTheme } from 'next-themes';
import NavLink from './NavLink';
import { FaBars, FaXmark } from 'react-icons/fa6';
import { Avatar } from '@heroui/react';
import { RxAvatar } from 'react-icons/rx';

const NavBar = () => {
    const navItems = [
        { label: 'Home', path: '/' },
        { label: 'Tutors', path: '/tutors' },
        { label: 'Add Tutor', path: '/add-tutor' },
        { label: 'My Tutors', path: '/my-tutors' },
        { label: 'My Booked Sessions', path: '/my-booked-sessions' }
    ]

    const [open, setOpen] = useState(false);

    const [mounted, setMounted] = useState(false);
    const { resolvedTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const isDark = resolvedTheme == "dark"

    return (
        <div className="w-full bg-[var(--surface)] text-[var(--secondary)] shadow-md">
            <nav className="container mx-auto py-4 px-6 flex items-center justify-between gap-3">
                <div className="logo">
                    <Image src={isDark ? LightLogo : Logo} alt="Logo" width={100} height={50}></Image>
                </div>
                <div className={`navitems flex flex-col lg:flex-row gap-3 md:gap-6 items-center bg-[var(--surface)] lg: absolute lg:static ${open ? "justify-start items-start top-19 right-0 lg: p-3 lg: h-full lg: transition-all duration-300 ease-in-out" : "right-[-500px]"} md:block`}>
                    {navItems.map((navItem, ind) => (
                        <NavLink key={ind} href={navItem.path} className=" lg:mx-4 text-[var(--secondary)] hover:text-[var(--primary)]" setOpen={setOpen}>
                            {navItem.label}
                        </NavLink>
                    ))}
                </div>
                <div className='rightitems flex gap-3 md:gap-6 items-center'>
                    <ThemeSwitcher></ThemeSwitcher>
                    <Avatar size="(max-width: 768px) sm, md">
                        <Avatar.Image
                            // src={user?.image}
                            // alt={user?.name}

                            referrerPolicy="no-referrer"
                        />
                        {/* <Avatar.Fallback>{user?.name.charAt(0)}</Avatar.Fallback> */}
                        <RxAvatar size={30} />
                    </Avatar>
                </div>
                <div className="md:hidden">
                    <button className="md:hidden" onClick={() => setOpen(!open)}>
                        {open ? (
                            <FaXmark size={24} />
                        ) : (
                            <FaBars size={24} />
                        )}
                    </button>
                </div>

            </nav>
        </div>
    );
};

export default NavBar;