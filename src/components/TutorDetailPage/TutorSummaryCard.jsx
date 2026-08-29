"use client"
import { Button, Card, CardContent, CardFooter, CardHeader, Chip } from "@heroui/react";
import Image from "next/image";
import { FaUniversity } from "react-icons/fa";
import { IoLocationOutline, IoStar } from "react-icons/io5";
import { PiClockCountdown, PiSuitcaseSimpleLight } from "react-icons/pi";
import { RiVerifiedBadgeFill } from "react-icons/ri";

const blurUrl = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAMCAYAAABFohwTAAAAE0lEQVR42mPkL8vbxIAEGIeuAABOfBPJjMHdaAAAAABJRU5ErkJggg==";

const TutorSummaryCard = ({ tutor }) => {
    const { tutorName, teachingMode, subject, experience, availableTimeSlot, totalSlot, photo, location, availableDays, hourlyFee, institution, bio, rating, reviews } = tutor;
    const handleBookNow = () => {
        console.log("booking button triggered");
    }
    return (
        <div>
            <Card className='p-0 rounded-lg shadow h-full flex flex-col justify-between bg-tc-surface/50'>
                <CardHeader>
                    <div className='flex gap-5 md:gap-10 items-center'>
                        <div className=' relative h-full w-full max-w-300 aspect-2/3'>
                            <Image src={photo} fill className='object-cover rounded-l-lg' alt={tutorName} placeholder="blur" blurDataURL={blurUrl}>
                            </Image>
                            <div className="absolute left-0 bottom-0 bg-tc-primary/50 rounded-tr-lg rounded-bl-lg">
                                <div className="flex gap-2 items-center p-1">
                                    <IoStar size={20} className="text-tc-accent" />
                                    <span className="text-tc-surface">{rating}</span>
                                    <span className="text-tc-surface">({reviews} reviews)</span>
                                </div>
                            </div>
                        </div>
                        <div className='px-3 md:px-4 py-3 md:py-0 space-y-2'>
                            <div className='flex gap-1 md:gap-2 lg:gap-3'>
                                <Chip className={`rounded-md ${teachingMode == "Online" ? 'bg-tc-success/40' : teachingMode == "Offline" ? 'bg-tc-accent/40' : 'bg-tc-secondary/40'
                                    }`}>{teachingMode}</Chip>
                                <Chip className={`rounded-md bg-tc-primary/40`}>{subject}</Chip>
                            </div>
                            <div className='space-y-2'>
                                <h3 className='text-tc-heading text-lg font-bold flex items-center gap-1'>{tutorName} <RiVerifiedBadgeFill size={20} className="text-tc-primary" /> </h3>
                                <h4 className='text-base text-tc-secondary flex items-center gap-2'><IoLocationOutline size={25} /> {location}</h4>
                                <div className="border-b-1 border-t-1 border-tc-border/40"></div>
                                <p className='text-base text-tc-secondary flex items-center gap-2'> <PiSuitcaseSimpleLight size={25} /> Experience: <span>{experience}+</span> years </p>
                                <p className='text-base text-tc-secondary flex items-center gap-2'> <FaUniversity size={25} /> Institution: <span>{institution}</span> </p>
                                <p className='text-base text-tc-secondary flex items-center gap-2'> <PiClockCountdown size={25} /> Hourly Rate: <span>৳{hourlyFee}</span> </p>
                                <p className="text-base text-tc-secondary">{bio}</p>
                            </div>
                        </div>
                    </div>
                </CardHeader>
            </Card>
        </div>
    );
};

export default TutorSummaryCard;