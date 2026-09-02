"use client";

import Link from "next/link";
import { Button } from "@heroui/react";
import { FaArrowLeft } from "react-icons/fa6";
import { HiOutlineBookOpen } from "react-icons/hi2";

const MainNotFound = () => {
    return (
        <section className="min-h-[calc(100vh-140px)] flex items-center justify-center bg-tc-background px-5 py-12">
            <div className="w-full max-w-xl bg-tc-surface border border-tc-border rounded-2xl shadow-md p-8 md:p-12 text-center">

                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-tc-primary/10 flex items-center justify-center">
                    <HiOutlineBookOpen size={48} className="text-tc-primary" />
                </div>

                <h1 className="text-7xl md:text-8xl font-extrabold text-tc-primary">404</h1>

                <h2 className="mt-4 text-2xl md:text-3xl font-bold text-tc-heading">
                    Oops! Page Not Found
                </h2>

                <p className="mt-3 text-tc-muted leading-7">
                    The page you are looking for doesn not exist or may have been moved.
                    Let's go back and continue learning with TutorCue.
                </p>

                <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                    <Link href={"/"}>
                        <Button className="bg-tc-primary hover:bg-tc-primary-hover text-white rounded-md font-semibold px-6">
                            <FaArrowLeft size={15} />
                            Back to Home
                        </Button> </Link>

                   <Link href={"/tutors"}> <Button variant="bordered" className="border-tc-border text-tc-heading rounded-md font-semibold">
                        Browse Tutors
                    </Button></Link>
                </div>

                <div className="mt-10 pt-6 border-t border-tc-border">
                    <p className="text-sm text-tc-muted">
                        Need a tutor? Explore our available tutors and book a session anytime.
                    </p>

                    <Link href="/tutors" className="inline-block mt-2 text-tc-primary font-semibold hover:underline">
                        Explore Tutors →
                    </Link>
                </div>

            </div>
        </section>
    );
};

export default MainNotFound;