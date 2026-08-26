"use client";

import Image from 'next/image';
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
    const { resolvedTheme } = useTheme();

    if (!resolvedTheme){
        return null;
    }

    const isDark = resolvedTheme == "dark"

    return (
        <div className="relative w-full bg-[var(--surface)] text-[var(--secondary)] shadow-md z-50 sticky top-0 backdrop-blur-md">
            <nav className="relative container mx-auto py-4 px-6 flex items-center justify-between gap-3">
                <div className="logo">
                    <Image src={isDark ? LightLogo : Logo} alt="Logo" width={100} height={50}></Image>
                </div>
                <div className={`z-[60] navitems absolute left-1/2 top-full w-screen -translate-x-1/2 flex flex-col items-start gap-3 bg-[var(--surface)] px-6 py-4 shadow-lg transition-all duration-300 ease-in-out lg:static lg:w-auto lg:translate-x-0 lg:flex-row lg:items-center lg:gap-6 lg:bg-transparent lg:p-0 lg:shadow-none ${open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0 lg:visible lg:translate-y-0 lg:opacity-100"}`}>
                    {navItems.map((navItem, ind) => (
                        <NavLink key={ind} href={navItem.path} className=" lg:mx-4 text-[var(--secondary)] hover:text-[var(--primary)]" setOpen={setOpen}>
                            {navItem.label}
                        </NavLink>
                    ))}
                </div>
                <div className='rightitems flex gap-3 text-lg:gap-6 items-center'>
                    <div className='hidden md:block lg:hidden min-w-100'></div>
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
                <div className="lg:hidden">
                    <button className="lg:hidden" onClick={() => setOpen(!open)}>
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