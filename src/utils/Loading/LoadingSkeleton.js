// components/LoadingSkeleton.jsx
export default function LoadingSkeleton() {
    return (
        <>
            <div className="container">

                {/* Banner Skeleton */}
                <div className="relative w-full h-[350px] bg-gray-300 rounded-lg animate-pulse overflow-hidden mb-10">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center space-y-4">
                        <div className="h-6 w-64 bg-gray-200 rounded mx-auto" />
                        <div className="h-10 w-80 bg-gray-200 rounded mx-auto" />
                    </div>
                </div>

                {/* Section */}
                <section className="shop-list-box-section">
                    <div className="container">
                        <div className="box-content-main shop-list-section--padding d-flex gap-4">

                            {/* Sidebar Skeleton */}
                            <div className="content-left d-none d-lg-block" style={{ width: "25%" }}>
                                <div className="space-y-4 p-3 bg-white rounded animate-pulse">
                                    {[...Array(5)].map((_, i) => (
                                        <div key={i} className="space-y-2">
                                            <div className="h-4 w-3/4 bg-gray-300 rounded" />
                                            {[...Array(5)].map((_, j) => (
                                                <div key={j} className="h-3 w-2/3 ml-4 bg-gray-200 rounded" />
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Category Grid Skeleton */}
                            <div className="content-right flex-grow-1">
                                <div className="row">
                                    {[...Array(8)].map((_, i) => (
                                        <div key={i} className="col-lg-3 col-md-6 mb-4">
                                            <div className="w-full p-4 border rounded-lg shadow-sm animate-pulse bg-white">

                                                {/* Image Placeholder (Square style) */}
                                                <div className="w-full aspect-square bg-gray-200 rounded-lg mb-4" />

                                                {/* Title/Text Placeholder */}
                                                <div className="h-4 w-3/4 mx-auto bg-gray-200 rounded" />

                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
