"use client"
import { Button } from "@heroui/react";
import Link from "next/link";

const AvatarMenu = ({ user, handleSignIn, handleSignOut }) => {
    // console.log("user", user);

    return (
        <div className="absolute right-0 top-full z-[100] w-52  pt-2">
            <div className="overflow-hidden rounded-lg border border-tc-border bg-tc-surface p-2 shadow-lg">
                <Link href="/profile" className="block rounded-md px-4 py-2 text-sm text-tc-secondary hover:bg-tc-surface-alt hover:text-tc-primary">
                    My Profile
                </Link>
                <Link href="/my-tutors" className=" block rounded-md px-4 py-2 text-sm text-tc-secondary hover:bg-tc-surface-alt hover:text-tc-primary">
                    My Tutors
                </Link>
                <Link href="/my-booked-sessions" className="block rounded-md px-4 py-2 text-sm text-tc-secondary hover:bg-tc-surface-alt hover:text-tc-primary">
                    My Sessions
                </Link>
                <div className="my-1 border-t border-tc-border"></div>
                {user ?
                    <Button onClick={handleSignOut} className="w-full rounded-md px-4 py-2 text-left text-sm bg-tc-warning text-tc-surface hover:bg-tc-error">
                        Sign Out
                    </Button>
                    :
                    <Button onClick={handleSignIn} className="w-full rounded-md px-4 py-2 text-left text-sm bg-tc-primary text-tc-surface hover:bg-tc-secondary">
                        Sign In
                    </Button>
                }
            </div>
        </div>
    );
};

export default AvatarMenu;