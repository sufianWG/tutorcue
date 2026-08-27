"use client"

import { Button } from "@heroui/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";
import ReactPaginate from "react-paginate";



const Pagination = ({ pagiData }) => {
    // console.log(pagiData);
    const { currentPage, totalPages, nextPageStatus, previousPageStatus } = pagiData
    // console.log({
    //     currentPage, totalPages, nextPageStatus, previousPageStatus
    // });
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const prevIcon = <GrFormPreviousLink size={20} />
    const nextIcon = <GrFormNextLink size={20} />
    const pageChangeHandler = ({ selected }) => {
        const page = selected + 1
        const params = new URLSearchParams(searchParams.toString())
        params.set("page", page.toString())
        router.push(`${pathname}?${params.toString()}`), {scroll: false}

    }
    return (
        <div className="">
            <ReactPaginate
                pageCount={totalPages}
                forcePage={currentPage - 1}
                onPageChange={pageChangeHandler}
                previousLabel={prevIcon}
                nextLabel={nextIcon}
                breakLabel="..."
                pageRangeDisplayed={5}
                marginPagesDisplayed={1}
                containerClassName="flex justify-center items-center gap-2"
                pageLinkClassName="w-10 h-10 flex items-center justify-center rounded-md border-tc-border bg-tc-primary/50 text-sm font-semibold text-tc-secondary hover:border-tc-primary hover:bg-tc-secondary hover:text-tc-surface transition"
                activeClassName="bg-tc-primary border-tc-secondary text-tc-surface rounded-md"
                previousClassName="w-10 h-10 flex items-center justify-center rounded-md border border-tc-border text-tc-primary hover:bg-tc-primary hover:text-tc-surface transition"
                nextClassName="w-10 h-10 flex items-center justify-center rounded-md border border-tc-border text-tc-primary hover:bg-tc-primary hover:text-tc-surface transition"
                disabledLinkClassName="opacity-40 pointer-events-none"
                breakLinkClassName="w-10 h-10 flex items-center justify-center text-tc-muted"
            >

            </ReactPaginate>
        </div>
    );
};

export default Pagination;