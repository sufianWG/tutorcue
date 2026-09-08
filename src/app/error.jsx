"use client";

import MainError from "@/components/ErrorPages/MainError";

const errorPage = ({ error, reset }) => {
    return (
        <div>
            <MainError error={error} reset={reset}></MainError>
        </div>
    );
};

export default errorPage;
