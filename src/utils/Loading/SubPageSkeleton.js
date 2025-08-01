'use client';

export default function SubPageSkeleton() {
    return (
        <div className="container">
            <div className="p-5">
                <div className="animate-pulse space-y-4">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="flex items-center gap-4">
                            <div className="bg-gray-300 w-[90px] h-[90px] rounded" />
                            <div className="flex-1 space-y-2">
                                <div className="bg-gray-300 h-4 w-3/4 rounded" />
                                <div className="bg-gray-300 h-4 w-1/2 rounded" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
