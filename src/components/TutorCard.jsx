"use client"
import { convertTo12Hour } from '@/lib/formatTime';
import { Button, Card, CardContent, CardFooter, CardHeader, Chip, Separator } from '@heroui/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { IoLocationOutline } from 'react-icons/io5';
import { PiSuitcaseSimpleLight } from 'react-icons/pi';

const blurUrl = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAMCAYAAABFohwTAAAAE0lEQVR42mPkL8vbxIAEGIeuAABOfBPJjMHdaAAAAABJRU5ErkJggg==";


const TutorCard = ({ tutor }) => {
    // console.log(tutor);
    const {_id, tutorName, photo, subject, hourlyFee, availableDays, availableTimeSlot, totalSlot, sessionStartDate, institution, experience, location, teachingMode, bio, createdBy, createdAt, updatedAt } = tutor
    const router = useRouter();
    const handleBookNow = () => {
        router.push(`/tutors/${_id}`)
    }
    return (
        <Card className='p-3 md:p-4 lg:p-5 rounded-md shadow h-full flex flex-col justify-between bg-tc-background/50'>
            <CardHeader>
                <div className='flex gap-1 md:gap-2'>
                    <div className='flex-1'>
                        <Image src={photo} width={75} height={37.5} className='object-cover rounded-md' alt={tutorName} placeholder="blur" blurDataURL={blurUrl}>
                        </Image>
                    </div>
                    <div className='flex-2'>
                        <div className='flex gap-1 md:gap-2 lg:gap-3'>
                            <Chip className={`rounded-md ${teachingMode == "Online" ? 'bg-tc-success/40' : teachingMode == "Offline" ? 'bg-tc-accent/40' : 'bg-tc-secondary/40'
                                }`}>{teachingMode}</Chip>
                            <Chip className={`rounded-md bg-tc-primary/40`}>{subject}</Chip>
                        </div>
                        <div className='space-y-2'>
                            <h3 className='text-tc-heading text-lg font-bold'>{tutorName}</h3>
                            <h4 className='text-base text-tc-muted flex items-center gap-2'><IoLocationOutline size={25} /> {location}</h4>
                            <p className='text-base text-tc-muted flex items-center gap-2'> <PiSuitcaseSimpleLight size={25} /> Experience: <span>{experience}+</span> years </p>
                        </div>
                    </div>
                </div>
            </CardHeader>
            <Separator className="my-1" />
            <CardContent>
                <div className='py-1'>
                    <h3 className='text-base text-tc-secondary'>Availability</h3>
                    <div className='flex gap-1 text-base font-bold text-tc-success flex-wrap'>
                        {
                            availableDays.map((avDay, ind) => <h4 key={ind} className='flex gap-1'>{avDay}, </h4>)
                        }
                    </div>
                    <h4>  { convertTo12Hour(availableTimeSlot.start)} - { convertTo12Hour(availableTimeSlot.end)}</h4>
                </div>
            </CardContent>
            <Separator className="my-1" />
            <CardFooter>
                <div className='w-full mx-auto'>
                    <div className='flex justify-between gap-3 items-center'>
                        <div><span className='text-tc-secondary font-bold'>৳{hourlyFee}</span>
                            <span className='text-tc-muted'> /hr</span>
                        </div>
                        <div className='text-tc-muted text-sm'>{totalSlot} slots left</div>
                        <Button className={'bg-tc-primary text-tc-surface rounded-md px-3 py-2'} onClick={handleBookNow}>Book Now</Button>
                    </div>
                </div>
            </CardFooter>
        </Card>
    );
};

export default TutorCard;