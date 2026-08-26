"use client"
import { Card, CardContent, CardFooter, CardHeader, Chip } from '@heroui/react';
import Image from 'next/image';

const TutorCard = ({tutor}) => {
    console.log(tutor);
    const {tutorName, photo, subject, hourlyFee, availableDays, availableTimeSlot, totalSlot, sessionStartDate, institution, experience, location, teachingMode, bio, createdBy, createdAt, updatedAt} = tutor
    return (
        <Card className='p-3 md:p-4 lg:p-5 rounded-xl shadow'>
            <CardHeader className='flex gap-2 md:gap-3'>
                <div className='relative'>
                    <Image src={photo} width={75} height={37.5} className='object-cover rounded-lg' alt={tutorName}>
                    </Image>
                </div>
                <div>
                    <div className='flex gap-2 md:gap-3 lg:gap-5'>
                        <Chip className={`rounded-md ${
                            teachingMode == "Online" ? 'bg-tc-success/40' : teachingMode == "Offline" ? 'bg-tc-accent/40' : 'bg-tc-secondary/40'
                        }`}>{teachingMode}</Chip>
                        <Chip className={`rounded-md bg-tc-primary/40`}>{subject}</Chip>
                    </div>
                    <div>
                        <h3>{tutorName}</h3>
                        <h4>{location}</h4>
                        <p>Experience: <span>{experience}</span>+ years </p>
                    </div>
                </div>
            </CardHeader>
            <CardContent>

            </CardContent>
            <CardFooter>

            </CardFooter>
        </Card>
    );
};

export default TutorCard;