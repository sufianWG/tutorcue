"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NavLink = ({href, children, className, setOpen}) => {
    const currentPath = usePathname()

    const isActive = currentPath === href;
    
    return (
        <Link href={href} className={`${isActive ? "text-base font-bold text-[var(--secondary)] border-b-3 border-[var(--secondary)] transition-colors duration-500 ease-in-out": className}` } onClick={()=> setOpen(false)}>
         {children}
        </Link>
    );
};

export default NavLink;