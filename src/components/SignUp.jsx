"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button, Checkbox, Description, FieldError, Form, Input, Label, Separator, TextField } from "@heroui/react";
import authDesk from "@/assets/tutorcue-auth-desk.png";
import { FiEye, FiEyeOff, FiLink2, FiLock, FiUser, FiUserPlus } from "react-icons/fi";
import { LuCalendarDays, LuMessageSquare, LuShieldCheck, LuUsers } from "react-icons/lu";
import { MdOutlineEmail } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import HeadingTopBorder from "./shared/HeadingTopBorder";
import { FaRegUser, FaUserPlus } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { IoIosLink } from "react-icons/io";
import { CiLock } from "react-icons/ci";

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
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
    const onSubmit = () => {

    }
    return (
        <main className="bg-tc-background">
            <div className="container mx-auto grid lg:min-h-[calc(100vh-72px)] lg:grid-cols-2">
                <section className="relative hidden overflow-hidden border-r border-tc-border px-2 lg:px-4 pt-16 lg:pb-[260px] xl:pb-[250px] lg:block xl:px-14 xl:py-20">
                    <div className="relative z-20 max-w-[470px]">
                        <p className="text-sm font-bold uppercase text-tc-primary mb-4">
                            Join TutorCue
                        </p>
                        <HeadingTopBorder></HeadingTopBorder>
                        <h1 className="mt-4 text-5xl font-bold leading-[1.15] text-tc-heading xl:text-[58px]">
                            Create your
                            <br />
                            TutorCue
                            <br />
                            <span className="text-tc-primary">
                                account.
                            </span>
                        </h1>
                        <p className="mt-7 max-w-[420px] text-base leading-7 text-tc-text">
                            Join TutorCue today and connect with expert
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
                                Join TutorCue
                            </p>
                            <h2 className="text-2xl font-bold text-tc-heading sm:text-3xl">
                                Create your account
                            </h2>
                            <p className="mt-2 text-sm text-tc-muted sm:text-base">
                                Fill in the details below to get started.
                            </p>
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
                                <Label>Name</Label>
                                <div className="relative">
                                    <FaRegUser className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-tc-muted pointer-events-none" />
                                    <Input placeholder="Enter  your full name" className={"rounded-md border border-tc-muted/40 pl-11 py-2 w-full"} />
                                </div>
                                <FieldError />
                            </TextField>
                            <TextField
                                name="email"
                                type="email"
                                validate={(value) => {
                                    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                                        return "Please enter a valid email address";
                                    }
                                    return null;
                                }}
                            >
                                <Label>Photo URL</Label>
                                <div className="relative">
                                    <IoIosLink className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-tc-muted pointer-events-none" />
                                    <Input placeholder="https://example.com/your-photo.jpg" className={"rounded-md border border-tc-muted/40 pl-11 py-2 w-full"} />
                                </div>
                                <FieldError />
                            </TextField>
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
                                type="password"
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
                                </div>
                                <Description>Must be at least 8 characters with 1 uppercase and 1 number</Description>
                                <FieldError />
                            </TextField>
                            <TextField
                                isRequired
                                minLength={8}
                                name="password"
                                type="password"
                            >
                                <Label>Confirm Password</Label>
                                <div className="relative">
                                    <CiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-tc-muted pointer-events-none" />
                                    <Input placeholder="Confirm your password" className={"rounded-md border border-tc-muted/40 pl-11 py-2 w-full"} />
                                </div>
                                <FieldError />
                            </TextField>
                            <Checkbox isInvalid isRequired name="agreement">
                                <Checkbox.Content>
                                    <Checkbox.Control className="rounded-sm border border-tc-muted/40 text-tc-primary focus: text-tc-primary">
                                        <Checkbox.Indicator />
                                    </Checkbox.Control>
                                    <span>I agree to the <Link href={"/"}>Terms of Service</Link> & <Link href={"/"}>Privacy Policy</Link></span>
                                </Checkbox.Content>
                            </Checkbox>
                            <div className="flex gap-2">
                                <Button className={"w-full bg-tc-primary text-tc-surface font-bold text-base rounded-md hover:bg-tc-primary-hover"} type="submit">
                                    <FiUserPlus size={24} /> Create Account
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
                                <span className="text-tc-secondary font-semibold">Already have an Account?</span> <Link href={"/login"} className="text-tc-secondary font-semibold">Login</Link>
                            </div>
                        </Form>
                    </div>
                </section>
            </div>
        </main>
    );
};

export default SignUp;