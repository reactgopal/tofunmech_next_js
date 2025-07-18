'use client';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function ProtectedLayout({ children }) {
    const router = useRouter();
    const pathname = usePathname();
    const [loading, setLoading] = useState(true);

    // Only protect these routes
    const protectedRoutes = ['/wishlist', '/checkout', '/review', '/my-orders','/my-address','/my-estimates'];

    useEffect(() => {
        const token = localStorage.getItem('USER');

        if (protectedRoutes.some((route) => pathname.startsWith(route)) && !token) {
            router.replace('/login');
        } else {
            setLoading(false);
        }
    }, [pathname]);

    if (loading) return <div>Loading...</div>;

    return <>{children}</>;
}
