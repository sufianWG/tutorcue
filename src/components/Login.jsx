"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {Button, Checkbox, Input} from "@heroui/react";
import authDesk from "@/assets/tutorcue-auth-desk.png";
import {FiEye, FiEyeOff, FiLock, FiLogIn, FiUser} from "react-icons/fi";
import { LuCalendarDays, LuMessageSquare, LuShieldCheck} from "react-icons/lu";
import { MdOutlineEmail } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);

    const features = [
        {
            icon: <FiUser size={22} />,
            title: "Pick Up Where You Left Off",
            text: "Resume your sessions and keep your progress on track."
        },
        {
            icon: <LuCalendarDays size={22} />,
            title: "Manage Your Sessions",
            text: "View upcoming classes, past sessions, and upcoming schedules."
        },
        {
            icon: <LuMessageSquare size={22} />,
            title: "Stay Connected",
            text: "Stay connected with your tutors and never miss an update."
        },
        {
            icon: <LuShieldCheck size={22} />,
            title: "Secure & Trusted",
            text: "Your data is safe with us. We use standard security practices."
        }
    ];

    return (
        <main className="bg-tc-background">
            <div className="mx-auto grid min-h-[calc(100vh-72px)] max-w-[1280px] lg:grid-cols-2">

                
                <section className="relative hidden overflow-hidden border-r border-tc-border px-8 py-14 lg:block xl:px-14 xl:py-20">

                    <div className="relative z-10 max-w-[470px]">

                        <p className="text-sm font-bold uppercase text-tc-primary">
                            Welcome Back
                        </p>

                        <div className="mt-4 h-1 w-10 rounded-full bg-tc-accent"></div>

                        <h1 className="mt-10 text-5xl font-bold leading-[1.15] text-tc-heading xl:text-[58px]">
                            Welcome back
                            <br />
                            to{" "}
                            <span className="text-tc-primary">
                                TutorCue.
                            </span>
                        </h1>

                        <p className="mt-7 max-w-[420px] text-base leading-7 text-tc-text">
                            Continue your learning journey, manage your
                            sessions, and stay connected with expert tutors
                            who help you grow.
                        </p>

                        <div className="mt-10 space-y-7">
                            {
                                features.map((feature, index) => (
                                    <div
                                        key={index}
                                        className="flex items-start gap-4"
                                    >
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-tc-border bg-tc-surface-alt text-tc-primary shadow-sm">
                                            {feature.icon}
                                        </div>

                                        <div>
                                            <h3 className="font-bold text-tc-secondary">
                                                {feature.title}
                                            </h3>

                                            <p className="mt-1 max-w-[310px] text-sm leading-6 text-tc-muted">
                                                {feature.text}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    <div className="absolute bottom-0 left-0 w-full">
                        <Image
                            src={authDesk}
                            alt="TutorCue study desk"
                            className="h-[220px] w-full object-cover object-bottom"
                            priority
                        />
                    </div>
                </section>


                
                <section className="flex items-center justify-center px-4 py-12 sm:px-6 md:px-10 lg:px-12 xl:px-16">

                    <div className="w-full max-w-[570px] rounded-2xl border border-tc-border bg-tc-surface p-5 shadow-[0_10px_35px_rgba(15,23,42,0.08)] sm:p-8 md:p-10">

                        <div>
                            <p className="mb-2 text-xs font-bold uppercase text-tc-primary lg:hidden">
                                Welcome Back
                            </p>

                            <h2 className="text-2xl font-bold text-tc-heading sm:text-3xl">
                                Sign in to your account
                            </h2>

                            <p className="mt-2 text-sm text-tc-muted sm:text-base">
                                Enter your details to continue.
                            </p>
                        </div>

                        <form className="mt-9 space-y-7">

                            <Input
                                type="email"
                                label="Email"
                                labelPlacement="outside"
                                placeholder="Enter your email address"
                                variant="bordered"
                                startContent={
                                    <MdOutlineEmail
                                        size={21}
                                        className="text-tc-muted"
                                    />
                                }
                                classNames={{
                                    label: "font-semibold text-tc-secondary",
                                    input: "text-tc-text",
                                    inputWrapper:
                                        "h-13 border-tc-border bg-tc-surface shadow-none hover:border-tc-primary focus-within:border-tc-primary"
                                }}
                            />

                            <Input
                                type={showPassword ? "text" : "password"}
                                label="Password"
                                labelPlacement="outside"
                                placeholder="Enter your password"
                                variant="bordered"
                                startContent={
                                    <FiLock
                                        size={20}
                                        className="text-tc-muted"
                                    />
                                }
                                endContent={
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                        className="text-tc-muted"
                                    >
                                        {
                                            showPassword
                                                ? <FiEyeOff size={20} />
                                                : <FiEye size={20} />
                                        }
                                    </button>
                                }
                                classNames={{
                                    label: "font-semibold text-tc-secondary",
                                    input: "text-tc-text",
                                    inputWrapper:
                                        "h-13 border-tc-border bg-tc-surface shadow-none hover:border-tc-primary focus-within:border-tc-primary"
                                }}
                            />

                            <div className="flex items-center justify-between gap-3">

                                <Checkbox
                                    size="sm"
                                    classNames={{
                                        label: "text-sm text-tc-text"
                                    }}
                                >
                                    Remember me
                                </Checkbox>

                                <Link
                                    href="/forgot-password"
                                    className="text-sm font-medium text-tc-primary hover:underline"
                                >
                                    Forgot password?
                                </Link>
                            </div>

                            <Button
                                type="submit"
                                className="h-12 w-full bg-tc-primary text-base font-semibold text-white hover:bg-tc-primary-hover"
                                startContent={<FiLogIn size={20} />}
                            >
                                Sign In
                            </Button>

                            <div className="flex items-center gap-4">
                                <div className="h-px flex-1 bg-tc-border"></div>

                                <span className="whitespace-nowrap text-xs text-tc-muted sm:text-sm">
                                    or continue with
                                </span>

                                <div className="h-px flex-1 bg-tc-border"></div>
                            </div>

                            <Button
                                type="button"
                                variant="bordered"
                                className="h-12 w-full border-tc-border bg-tc-surface font-semibold text-tc-secondary"
                                startContent={<FcGoogle size={22} />}
                            >
                                Continue with Google
                            </Button>

                            <p className="text-center text-sm text-tc-text">
                                Don&apos;t have an account?{" "}
                                <Link
                                    href="/signup"
                                    className="font-semibold text-tc-primary hover:underline"
                                >
                                    Register
                                </Link>
                            </p>

                        </form>
                    </div>
                </section>
            </div>
        </main>
    );
};

export default Login;