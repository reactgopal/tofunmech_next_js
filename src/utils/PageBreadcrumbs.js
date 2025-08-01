'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IoMdHome } from 'react-icons/io';

export default function PageBreadcrumb() {
    const pathname = usePathname(); // e.g., /my-orders
    const pathSegments = pathname.split('/').filter(Boolean);

    const createPath = (index) => '/' + pathSegments.slice(0, index + 1).join('/');

    return (
        <div className="row">
            <div className="col">
                <nav className="breadcrumb__content">
                    <ul className="breadcrumb__content--menu">
                        <li className="breadcrumb__content--menu__items">
                            <IoMdHome
                                color="#363062"
                                style={{ fontSize: "24px", marginRight: "6px" }}
                            />
                            <Link href="/" className="text-black">Home</Link>
                        </li>


                        {pathSegments.map((segment, i) => (
                            <li key={i} className="breadcrumb__content--menu__items">
                                <span className="breadcrumb__item--link breadcrumb__item--last">
                                    {decodeURIComponent(segment).replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
                                </span>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </div>
    );
}
