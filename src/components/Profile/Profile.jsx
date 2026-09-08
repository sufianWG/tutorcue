"use client";

import { Avatar, Button, Chip, Separator } from "@heroui/react";
import { useEffect, useState } from "react";
import { HiOutlineCalendarDays, HiOutlineEnvelope } from "react-icons/hi2";
import { MdOutlineVerified } from "react-icons/md";
import { RxAvatar } from "react-icons/rx";
import { useRouter } from "next/navigation";
import Loader from "@/components/shared/Loader";
import { authClient } from "@/lib/auth-client";

const Profile = () => {
    const [mounted, setMounted] = useState(false);
    const { data: session, isPending: isSessionPending } = authClient.useSession();
    const user = session?.user;
    const router = useRouter();

    useEffect(() => {
        setMounted(true);
    }, []);

    // navbar er handleSignOut er moto e, session shesh kore login page e pathiye dibe
    const handleSignOut = async () => {
        const { error } = await authClient.signOut();
        if (!error) {
            router.push('/login');
        }
    }

    if (!mounted || isSessionPending) {
        return (
            <div className="bg-tc-background py-16">
                <Loader text="Loading your profile..." />
            </div>
        );
    }

    return (
        <section className="bg-tc-background py-10 md:py-14">
            <div className="container mx-auto px-5">
                <div className="max-w-lg mx-auto bg-tc-surface border border-tc-border rounded-xl shadow-md p-6 md:p-8 space-y-6">
                    <div className="flex flex-col items-center text-center space-y-3">
                        <Avatar size="lg" className="w-24 h-24 ring-2 ring-tc-primary/40">
                            <Avatar.Image src={user?.image} alt={user?.name} referrerPolicy="no-referrer" />
                            {user && <Avatar.Fallback className="text-3xl">{user?.name?.charAt(0)}</Avatar.Fallback>}
                            {!user && <RxAvatar size={50} />}
                        </Avatar>
                        <div>
                            <h1 className="text-2xl font-bold text-tc-heading">{user?.name}</h1>
                            <p className="text-tc-muted flex items-center justify-center gap-2 mt-1"><HiOutlineEnvelope size={18} /> {user?.email}</p>
                        </div>
                        {
                            user?.emailVerified &&
                            <Chip className="rounded-md bg-tc-success/40 flex items-center gap-1"><MdOutlineVerified size={16} /> Verified Account</Chip>
                        }
                    </div>

                    <Separator className="my-1" />

                    <div className="space-y-3">
                        <h3 className="text-base font-semibold text-tc-secondary">Account Information</h3>
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-tc-muted flex items-center gap-2"><HiOutlineCalendarDays size={18} /> Member Since</span>
                            <span className="font-semibold text-tc-heading">{user?.createdAt ? new Date(user.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : "N/A"}</span>
                        </div>
                    </div>

                    <Separator className="my-1" />

                    <Button onClick={handleSignOut} className="w-full rounded-md bg-tc-warning text-tc-surface font-semibold py-2 hover:bg-tc-error">
                        Sign Out
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default Profile;
