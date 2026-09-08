"use client";

import Link from "next/link";
import { Button } from "@heroui/react";
import { useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";

const MainError = ({ error, reset }) => {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <section className="min-h-[calc(100vh-140px)] flex items-center justify-center bg-tc-background px-5 py-12">
            <div className="w-full max-w-xl bg-tc-surface border border-tc-border rounded-2xl shadow-md p-8 md:p-12 text-center">

                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-tc-error-bg flex items-center justify-center">
                    <HiOutlineExclamationTriangle size={48} className="text-tc-error" />
                </div>

                <h1 className="mt-4 text-2xl md:text-3xl font-bold text-tc-heading">
                    Something Went Wrong
                </h1>

                <p className="mt-3 text-tc-muted leading-7">
                    An unexpected error occurred while loading this page. Please try again, or go back to the homepage.
                </p>

                <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                    <Button onClick={reset} className="bg-tc-primary hover:bg-tc-primary-hover text-white rounded-md font-semibold px-6">
                        Try Again
                    </Button>

                    <Link href={"/"}>
                        <Button variant="bordered" className="border-tc-border text-tc-heading rounded-md font-semibold">
                            <FaArrowLeft size={15} />
                            Back to Home
                        </Button>
                    </Link>
                </div>

            </div>
        </section>
    );
};

export default MainError;
