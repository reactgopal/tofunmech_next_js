'use client';
import React from "react";

export default function ProductDetailSkeleton() {
    return (
        <div className="container my-5 animate-pulse">
            <div className="row">
                {/* Left Image */}
                <div className="col-lg-6 mb-4">
                    <div className="w-full h-[400px] bg-gray-300 rounded-lg"></div>
                </div>

                {/* Right Details */}
                <div className="col-lg-6 ps-lg-4">
                    <div className="space-y-4">

                        {/* Rating + Stock */}
                        <div className="flex flex-wrap items-center gap-4 mb-2">
                            <div className="w-32 h-5 bg-gray-300 rounded" />
                            <div className="w-20 h-5 bg-gray-300 rounded" />
                        </div>

                        {/* Title */}
                        <div className="h-6 w-3/4 bg-gray-300 rounded" />

                        {/* Price */}
                        <div className="space-y-2">
                            <div className="h-6 w-32 bg-gray-300 rounded" />
                            <div className="h-4 w-40 bg-gray-200 rounded" />
                        </div>

                        {/* Categories */}
                        <ul className="space-y-2 mt-4">
                            {[...Array(3)].map((_, i) => (
                                <li key={i} className="h-4 w-48 bg-gray-200 rounded" />
                            ))}
                        </ul>

                        {/* Buttons */}
                        <div className="mt-6 space-y-4">
                            <div className="h-10 w-40 bg-gray-300 rounded" />
                            <div className="h-10 w-36 bg-gray-200 rounded" />
                        </div>

                        {/* Wishlist Button */}
                        <div className="h-6 w-40 bg-gray-200 rounded" />

                        {/* Description */}
                        <div className="mt-6 space-y-2">
                            <div className="h-4 w-32 bg-gray-300 rounded" />
                            <div className="h-4 w-full bg-gray-200 rounded" />
                            <div className="h-4 w-5/6 bg-gray-200 rounded" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
