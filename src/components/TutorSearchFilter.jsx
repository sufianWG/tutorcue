"use client"
import { Label, ListBox, SearchField, Select } from '@heroui/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

const TutorSearchFilter = () => {
    const [searchValue, setSearchValue] = useState("")
    const router = useRouter();
    // console.log(subjectValue);
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const updateQuery = (queryName, value) => {
        const params = new URLSearchParams(searchParams.toString());
        // console.log(params);
        if(queryName){
            params.set(queryName, value)
        }else{
            params.delete(queryName)
        }
        router.push(`${pathname}?${params.toString()}`)
    }

    const handleSearch = (value) => {
        setSearchValue(value)
        updateQuery("search", value)
    }
    const handleSubject = (value) => {
        updateQuery("subject", value)
    }
    const handleTeachingMode = (value) => {
        updateQuery("teachingMode", value)
    }
    const handleLocation = (value) => {
        updateQuery("location", value)
    }
    const handleSorting = (value) => {
        updateQuery("sort", value)
    }
    return (
        <div className='rounded-md shadow p-2 md:p-3 lg:p-4 bg-tc-background/50 space-y-2'>
            <div className="block md:flex gap-2 md:gap-3 justify-between items-start">
                <div>
                    <SearchField name="search" className={"w-[280px]"} value={searchValue} onChange={handleSearch}>
                        <Label className='text-base text-tc-secondary'>Search</Label>
                        <SearchField.Group className={"rounded-md"}>
                            <SearchField.SearchIcon />
                            <SearchField.Input className="" placeholder="Search by tutor name, subject, teachingMode, location, institution" />
                            <SearchField.ClearButton />
                        </SearchField.Group>
                    </SearchField>
                </div>
                <div>
                    <Select className="w-full max-w-[256px]" placeholder="Select one" onChange={handleSubject}>
                        <Label className='text-base text-tc-secondary'>Subject</Label>
                        <Select.Trigger className={"rounded-md"}>
                            <Select.Value />
                            <Select.Indicator />
                        </Select.Trigger>
                        <Select.Popover className={"rounded-md"}>
                            <ListBox>
                                <ListBox.Item id="economics" textValue="Economics">
                                    Economics
                                    <ListBox.ItemIndicator />
                                </ListBox.Item>
                                <ListBox.Item id="english" textValue="English">
                                    English
                                    <ListBox.ItemIndicator />
                                </ListBox.Item>
                                <ListBox.Item id="chemistry" textValue="Chemistry">
                                    Chemistry
                                    <ListBox.ItemIndicator />
                                </ListBox.Item>
                                <ListBox.Item id="ict" textValue="ICT">
                                    ICT
                                    <ListBox.ItemIndicator />
                                </ListBox.Item>
                                <ListBox.Item id="mathematics" textValue="Mathematics">
                                    Mathematics
                                    <ListBox.ItemIndicator />
                                </ListBox.Item>
                                <ListBox.Item id="bangla" textValue="Bangla">
                                    Bangla
                                    <ListBox.ItemIndicator />
                                </ListBox.Item>
                                <ListBox.Item id="higher-mathematics" textValue="Higher Mathematics">
                                    Higher Mathematics
                                    <ListBox.ItemIndicator />
                                </ListBox.Item>
                                <ListBox.Item id="physics" textValue="Physics">
                                    Physics
                                    <ListBox.ItemIndicator />
                                </ListBox.Item>
                                <ListBox.Item id="computer-science" textValue="Computer Science">
                                    Computer Science
                                    <ListBox.ItemIndicator />
                                </ListBox.Item>
                                <ListBox.Item id="biology" textValue="Biology">
                                    Biology
                                    <ListBox.ItemIndicator />
                                </ListBox.Item>
                                <ListBox.Item id="accounting" textValue="Accounting">
                                    Accounting
                                    <ListBox.ItemIndicator />
                                </ListBox.Item>
                                <ListBox.Item id="statistics" textValue="Statistics">
                                    Statistics
                                    <ListBox.ItemIndicator />
                                </ListBox.Item>
                                <ListBox.Item id="programming" textValue="Programming">
                                    Programming
                                    <ListBox.ItemIndicator />
                                </ListBox.Item>
                                <ListBox.Item id="general-science" textValue="General Science">
                                    General Science
                                    <ListBox.ItemIndicator />
                                </ListBox.Item>
                                <ListBox.Item id="business-studies" textValue="Business Studies">
                                    Business Studies
                                    <ListBox.ItemIndicator />
                                </ListBox.Item>
                            </ListBox>
                        </Select.Popover>
                    </Select>
                </div>
                <div>
                    <Select className="w-full max-w-[256px]" placeholder="Select one" onChange={handleTeachingMode}>
                        <Label className='text-base text-tc-secondary'>Teaching Mode</Label>
                        <Select.Trigger className={"rounded-md"}>
                            <Select.Value />
                            <Select.Indicator />
                        </Select.Trigger>
                        <Select.Popover className={"rounded-md"}>
                            <ListBox>
                                <ListBox.Item key={"online"} id="online" textValue="Online">
                                    Online
                                    <ListBox.ItemIndicator />
                                </ListBox.Item>
                                <ListBox.Item key={"offline"} id="offline" textValue="Offline">
                                    Offline
                                    <ListBox.ItemIndicator />
                                </ListBox.Item>
                                <ListBox.Item key={"both"} id="both" textValue="Both">
                                    Both
                                    <ListBox.ItemIndicator />
                                </ListBox.Item>
                            </ListBox>
                        </Select.Popover>
                    </Select>
                </div>
            </div>
            <div className="block md:flex gap-2 md:gap-3 justify-between items-start">
                <div>
                    <Select className="w-[256px]" placeholder="Select one" onChange={handleLocation}>
                        <Label className='text-base text-tc-secondary'>Location</Label>
                        <Select.Trigger className={"rounded-md"}>
                            <Select.Value />
                            <Select.Indicator />
                        </Select.Trigger>
                        <Select.Popover className={"rounded-md"}>
                            <ListBox>
                                <ListBox.Item key={"all-location"} id="" textValue="All Locations">
                                    All Locations
                                    <ListBox.ItemIndicator />
                                </ListBox.Item>
                                <ListBox.Item id="chattogram" textValue="Chattogram">
                                    Chattogram
                                    <ListBox.ItemIndicator />
                                </ListBox.Item>
                                <ListBox.Item id="dhaka" textValue="Dhaka">
                                    Dhaka
                                    <ListBox.ItemIndicator />
                                </ListBox.Item>
                                <ListBox.Item id="sylhet" textValue="Sylhet">
                                    Sylhet
                                    <ListBox.ItemIndicator />
                                </ListBox.Item>
                                <ListBox.Item id="rajshahi" textValue="Rajshahi">
                                    Rajshahi
                                    <ListBox.ItemIndicator />
                                </ListBox.Item>
                                <ListBox.Item id="khulna" textValue="Khulna">
                                    Khulna
                                    <ListBox.ItemIndicator />
                                </ListBox.Item>
                            </ListBox>
                        </Select.Popover>
                    </Select>
                </div>
                <div>
                    <Select className="w-[256px]" placeholder="Select one" onChange={handleSorting}>
                        <Label className='text-base text-tc-secondary'>Sort By</Label>
                        <Select.Trigger className={"rounded-md"}>
                            <Select.Value />
                            <Select.Indicator />
                        </Select.Trigger>
                        <Select.Popover className={"rounded-md"}>
                            <ListBox>
                                <ListBox.Item id="newest" textValue="Newest First">
                                    Newest First
                                    <ListBox.ItemIndicator />
                                </ListBox.Item>
                                <ListBox.Item id="oldest" textValue="Newest First">
                                    Oldest First
                                    <ListBox.ItemIndicator />
                                </ListBox.Item>
                            </ListBox>
                        </Select.Popover>
                    </Select>
                </div>
            </div>
        </div>

    );
};

export default TutorSearchFilter;