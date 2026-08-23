"use client";
import Image from "next/image";
import Logo from '@/assets/tutorCue.png';
import LightLogo from '@/assets/tutorCue-light.png';
import { useTheme } from "next-themes";
import Link from "next/link";
import { FaEnvelope, FaFacebook, FaHeart, FaInstagram, FaLinkedin, FaPhone, FaXTwitter, FaYoutube } from "react-icons/fa6";
import { FaMapMarker } from "react-icons/fa";

const Footer = () => {
    const { resolvedTheme } = useTheme();

    if (!resolvedTheme) {
        return null;
    }
    const isDark = resolvedTheme == "dark"
    return (
        <div className="bg-[var(--surface)] text-[var(--secondary)] shadow-md">
            <footer className="container mx-auto py-8 px-6 flex flex-col items-center justify-between gap-3">
                <div className="footerContent text-[var(--secondary)]/70 flex flex-col lg:grid lg:grid-cols-7 gap-6 md:gap-12 lg:gap-24">
                    <div className="logo lg:col-span-2">
                        <Image src={isDark ? LightLogo : Logo} alt="Logo" width={150} height={75}></Image>
                        <p className="text-wrap">TutorCue connects learners with
                            trusted tutors for personalized
                            sessions and effective learning
                            experience.</p>
                        <div className="socialIcons flex gap-3 mt-2">
                            <Link href="https://x.com/" target="_blank" className="text-[var(--secondary)] hover:text-[var(--primary)] w-10 h-10 bg-[var(--surface)] border-2 border-[var(--border)] flex items-center justify-center rounded-full p-2"> 
                                <FaXTwitter />
                            </Link>
                            <Link href="https://www.facebook.com/" target="_blank" className="text-[var(--secondary)] hover:text-[var(--primary)] w-10 h-10 bg-[var(--surface)] border-2 border-[var(--border)] flex items-center justify-center rounded-full p-2">
                                <FaFacebook />
                            </Link>
                            <Link href="https://www.linkedin.com/" target="_blank" className="text-[var(--secondary)] hover:text-[var(--primary)] w-10 h-10 bg-[var(--surface)] border-2 border-[var(--border)] flex items-center justify-center rounded-full p-2">
                                <FaLinkedin />
                            </Link>
                            <Link href="https://www.instagram.com/" target="_blank" className="text-[var(--secondary)] hover:text-[var(--primary)] w-10 h-10 bg-[var(--surface)] border-2 border-[var(--border)] flex items-center justify-center rounded-full p-2">
                                <FaInstagram />
                            </Link>
                            <Link href="https://www.youtube.com/" target="_blank" className="text-[var(--secondary)] hover:text-[var(--primary)] w-10 h-10 bg-[var(--surface)] border-2 border-[var(--border)] flex items-center justify-center rounded-full p-2">
                                <FaYoutube />
                            </Link>
                        </div>
                    </div>
                    <div className="lg:col-span-1 space-y-2">
                        <h3 className="text-[var(--secondary)] font-bold">Platform</h3>
                        <ul className="space-y-1">
                            <Link href="/" className="text-base"> <li>Home</li> </Link>
                            <Link href="/tutors" className="text-base"> <li>Tutors</li> </Link>
                            <Link href="/add-tutor" className="text-base"> <li>Add Tutor</li> </Link>
                            <Link href="/my-tutors" className="text-base"> <li>My Tutors</li> </Link>
                            <Link href="/my-booked-sessions" className="text-base"> <li>My Sessions</li> </Link>
                        </ul>
                    </div>
                    <div className="lg:col-span-1 space-y-2">
                        <h3 className="text-[var(--secondary)] font-bold">Learning</h3>
                        <ul className="space-y-1">
                            <Link href="/" className="text-base"> <li>All Subjects</li> </Link>
                            <Link href="/" className="text-base"> <li>Online Tutors</li> </Link>
                            <Link href="/" className="text-base"> <li>Offline Tutors</li> </Link>
                            <Link href="/" className="text-base"> <li>How It Works</li> </Link>
                            <Link href="/" className="text-base"> <li>Become a Tutor</li> </Link>
                        </ul>
                    </div>
                    <div className="lg:col-span-1 space-y-2">
                        <h3 className="text-[var(--secondary)] font-bold">Support</h3>
                        <ul className="space-y-1">
                            <Link href="/" className="text-base"> <li>Help Center</li> </Link>
                            <Link href="/" className="text-base"> <li>Safety & Trust</li> </Link>
                            <Link href="/" className="text-base"> <li>Cancellation Policy</li> </Link>
                            <Link href="/" className="text-base"> <li>Terms of Service</li> </Link>
                            <Link href="/" className="text-base"> <li>Privacy Policy</li> </Link>
                        </ul>
                    </div>
                    <div className="lg:col-span-2 space-y-2">
                        <h3 className="text-[var(--secondary)] font-bold">Contact</h3>
                        <p className="flex items-center gap-2"><FaEnvelope /> support@tutorcue.com</p>
                        <p className="flex items-center gap-2"><FaPhone /> +91 98765 43210</p>
                        <p className="flex items-center gap-2"><FaMapMarker /> 42, Church St, Richson <br /> Karnataka, Kolkata, <br /> Karnataka</p>
                    </div>
                </div>
                <div className="footerCopyRight text-[var(--secondary)]/60 w-full flex flex-col lg:flex-row justify-between items-center gap-3 mt-4 border-t border-[var(--secondary)]/15 pt-4 ">
                    <p>&copy; 2026 TutorCue. All rights reserved.</p>
                    <p className="flex items-center gap-2">Made with <span className="text-red-500"><FaHeart /></span> in Bangladesh</p>
                </div>
            </footer>
        </div>
    );
};

export default Footer;