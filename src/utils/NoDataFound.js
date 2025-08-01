'use client'
import Image from 'next/image';
import React, { useEffect } from 'react'

export default function NoDataFound() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    return (
        <>
            <div style={{ position: "relative", width: "500px", height: "500px", margin: "0 auto" }}>
                <Image
                    src="/assets/img/others/no-data-found.gif"
                    alt="No Data Found"
                    fill
                    style={{ objectFit: "contain" }}
                />
            </div>

        </>
    );
}
