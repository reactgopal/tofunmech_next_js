'use client'

import { useParams } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Prio from '../../../../public/assets/img/others/Prio.gif';

export default function ThankYou() {
    const { paymentID } = useParams();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    const copyText = () => {
        const textToCopy = paymentID;
        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                console.log('Text copied to clipboard:', textToCopy);
            })
            .catch((error) => {
                console.error('Error copying text:', error);
            });
    };

    return (
        <div>
            <div
                className="thank_you shadow-lg p-3 mb-5 bg-white rounded"
                style={{ maxWidth: "100%", marginTop: "100px" }}
            >
                <div>
                    {/* <img src="assets/img/others/Prio.gif" alt="payment" className="mb-4" /> */}
                    <Image src={Prio} alt="payment" width={400} className="mb-4" />

                    <h3 className="txt--gradient-green">Thank you for Ordering!</h3>
                    <p style={{ opacity: "0.5" }}>
                        Payment id:-
                        <span title="Copy" className="">
                            <b onClick={copyText}>{paymentID}</b>
                        </span>
                        <button className='btn btn-primary rounded-pill px-2 ms-3 text-sm' onClick={copyText}>
                            Copy
                        </button>
                        <p>Success! Your payment has been received. Enjoy your purchase!</p>
                    </p>
                </div>
                <div className="thank_btn">
                    <Link href={"/"}>
                        <button className="mt-5 ">Continue To Home</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

