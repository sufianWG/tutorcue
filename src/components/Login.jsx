"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button, Checkbox, FieldError, Form, Input, Label, Separator, TextField } from "@heroui/react";
import authDesk from "@/assets/tutorcue-auth-desk.png";
import { FiEye, FiEyeOff, FiLock, FiLogIn, FiUser, FiUserPlus } from "react-icons/fi";
import { LuCalendarDays, LuMessageSquare, LuShieldCheck, LuUsers } from "react-icons/lu";
import { MdOutlineEmail } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { HiOutlineMail } from "react-icons/hi";
import { CiLock } from "react-icons/ci";
import HeadingTopBorder from "./shared/HeadingTopBorder";
import { FaEye } from "react-icons/fa";
import { IoMdEyeOff } from "react-icons/io";
import { authClient } from "@/lib/auth-client";

const Login = () => {
    const [isVisible, setIsVisible] = useState(false);

    const features = [
        {
            icon: <LuUsers size={22} />,
            title: "Connect with Expert Tutors",
            text: "Find and connect with verified tutors across a wide range of subjects."
        },
        {
            icon: <LuCalendarDays size={22} />,
            title: "Flexible Learning",
            text: "Book sessions at times that fit your schedule and learning goals."
        },
        {
            icon: <LuMessageSquare size={22} />,
            title: "Track Your Progress",
            text: "Manage your sessions and track your learning journey in one place."
        },
        {
            icon: <LuShieldCheck size={22} />,
            title: "Secure & Trusted",
            text: "Your data is safe with us. We use standard security practices."
        }
    ];
    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const userData = Object.fromEntries(formData.entries());
        const { email, password } = userData;

        console.log("email:", email, "password:", password);
        const { data, error } = await authClient.signIn.email({
            email, 
            password,
            callbackURL: "/",
            rememberMe: false
        })
        if (error) {
            console.error("Login failed:", error);
        } else {
            console.log("Login successful:", data);
        }
    };

    return (
        <main className="bg-tc-background">
            <div className="container mx-auto grid lg:min-h-[calc(100vh-72px)] lg:grid-cols-2">
                <section className="relative hidden overflow-hidden border-r border-tc-border px-2 lg:px-4 pt-16 lg:pb-[260px] xl:pb-[250px] lg:block xl:px-14 xl:py-20">
                    <div className="relative z-20 max-w-[470px]">
                        <p className="text-sm font-bold uppercase text-tc-primary mb-4">
                            Login to TutorCue
                        </p>
                        <HeadingTopBorder></HeadingTopBorder>
                        <h1 className="mt-4 text-5xl font-bold leading-[1.15] text-tc-heading xl:text-[58px]">
                            Login to your
                            <br />
                            TutorCue
                            <br />
                            <span className="text-tc-primary">
                                account.
                            </span>
                        </h1>
                        <p className="mt-7 max-w-[420px] text-base leading-7 text-tc-text">
                            Login TutorCue today and connect with expert
                            tutors, schedule sessions, and learn in a way
                            that works best for you.
                        </p>
                        <div className="mt-10 space-y-7">
                            {
                                features.map((feature, ind) => (
                                    <div
                                        key={ind}
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
                    <div className="absolute bottom-0 left-0 h-auto w-[85%] max-w-[560px]">
                        <Image
                            src={authDesk}
                            alt="TutorCue study desk"
                            className="h-[270px] w-full object-cover object-bottom"
                            priority
                        />
                    </div>
                </section>
                <section className="flex items-center justify-center my-10 lg:my-0 px-4 lg:py-10 sm:px-6 md:px-10 lg:px-12 xl:px-16">
                    <div className="space-y-4 max-w-[570px] rounded-xl border border-tc-border bg-tc-surface p-5 shadow-[0_10px_35px_rgba(15,23,42,0.08)] sm:p-8 md:p-10">
                        <div>
                            <p className="mb-2 text-xs font-bold uppercase text-tc-primary lg:hidden">
                                Welcome to back to TutorCue
                            </p>
                            <h2 className="text-2xl font-bold text-tc-heading sm:text-3xl">
                                Sign in to your account
                            </h2>
                        </div>
                        <Form
                            className="flex w-full flex-col gap-4"
                            render={(props) => <form {...props} data-custom="foo" />}
                            onSubmit={onSubmit}
                        >
                            <TextField
                                isRequired
                                name="email"
                                type="email"
                                validate={(value) => {
                                    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                                        return "Please enter a valid email address";
                                    }
                                    return null;
                                }}
                            >
                                <Label>Email</Label>
                                <div className="relative">
                                    <HiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-tc-muted pointer-events-none" />
                                    <Input placeholder="Enter  your Email Address" className={"rounded-md border border-tc-muted/40 pl-11 py-2 w-full"} />
                                </div>
                                <FieldError />
                            </TextField>
                            <TextField
                                isRequired
                                minLength={8}
                                name="password"
                                type={isVisible ? "text" : "password"}
                                validate={(value) => {
                                    if (value.length < 8) {
                                        return "Password must be at least 8 characters";
                                    }
                                    if (!/[A-Z]/.test(value)) {
                                        return "Password must contain at least one uppercase letter";
                                    }
                                    if (!/[0-9]/.test(value)) {
                                        return "Password must contain at least one number";
                                    }
                                    return null;
                                }}
                            >
                                <Label>Password</Label>
                                <div className="relative">
                                    <CiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-tc-muted pointer-events-none" />
                                    <Input placeholder="Create a password" className={"rounded-md border border-tc-muted/40 pl-11 py-2 w-full"} />
                                    <Button
                                        isIconOnly
                                        aria-label={isVisible ? "Hide password" : "Show password"}
                                        size="sm"
                                        variant="ghost"
                                        onPress={() => setIsVisible(!isVisible)}
                                        className={'absolute right-2 -translate-y-1/2 top-1/2 '}
                                    >
                                        {isVisible ? <FaEye className="size-4" /> : <IoMdEyeOff className="size-4" />}
                                    </Button>
                                </div>
                                <FieldError />
                            </TextField>
                            <div className="flex gap-2">
                                <Button className={"w-full bg-tc-primary text-tc-surface font-bold text-base rounded-md hover:bg-tc-primary-hover"} type="submit">
                                    <FiLogIn size={24} /> Sign In
                                </Button>
                            </div>
                            <div className="my-3 flex items-center font-bold justify-center text-center">
                                <Separator className="w-full max-w-[50px] md:max-w-[100px]"></Separator>
                                <span className="px-2 text-xs text-tc-muted">or continue with</span>
                                <Separator className="w-full max-w-[50px] md:max-w-[100px]"></Separator>
                            </div>
                            <div>
                                <Button className={"text-tc-secondary bg-transparent border-2 border-tc-muted/40 rounded-md py-2 px-3 flex justify-center items-center w-full font-bold hover:bg-tc-primary-hover hover:text-tc-surface"}>
                                    <FcGoogle size={30} /> Continue with Google
                                </Button>
                            </div>
                            <div className="text-base text-center">
                                <span className="text-tc-secondary font-semibold"> Do not you have an Account?</span> <Link href={"/signup"} className="text-tc-secondary font-semibold">Sign Up</Link>
                            </div>
                        </Form>
                    </div>
                </section>
            </div>
        </main>
    );
};

export default Login;