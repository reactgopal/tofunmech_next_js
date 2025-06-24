"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

import Topbar from "@/components/layout/topbar";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Slider from "@/components/layout/slider";

import styles from "../app/page.module.css"; // Add styles for .homeBackground if needed

export default function ClientLayout({ children }) {
    const pathname = usePathname();
    const isHomePage = pathname === "/";


    // useEffect(() => {
    //     console.log("Mounted - pathname:", pathname);
    // }, [pathname]);

    return (
        <>
            {isHomePage ? (
                <div className={styles.layoutContainer}>
                    <Topbar />
                    <Header />
                    <Slider />
                </div>
            ) : (
                <div >
                    <Topbar />
                    <Header />
                </div>
            )}


            {/* page content */}
            <main>{children}</main>

            {/* footer */}
            <Footer />
        </>
    );
}
