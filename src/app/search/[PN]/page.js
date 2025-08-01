'use client'

import { SearchProduct } from "@/api/services/apiServices";
import Loader from "@/app/loading";
import PageBreadcrumb from "@/utils/PageBreadcrumbs";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Search() {
    const router = useRouter();
    const params = useParams();
    const pn = params.PN;

    const [searchpart, setSearchPart] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const modifiedString = pn;
        SearchProduct(modifiedString).then((res) => {
            setLoading(false);
            if (res?.success) {
                setSearchPart(res?.data);
            } else {
                setError(res?.message);
            }
        });
    }, [pn]);

    const handleClick = (id, part_no) => {
        router.push(`/productsdetail/${id}/${part_no}`);
    };

    return (
        <div className="margin_top_all">
            <div className="breadcrumb-section breadcrumb__bg">
                <div className="container">
                    <PageBreadcrumb />
                </div>
            </div>
            <div className="container">
                {loading ? (
                    <Loader />
                ) : (
                    <div className="row">
                        {searchpart?.map((e, index) => (
                            <div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-4 section--padding" key={index}>
                                <div className="product__card h-100">
                                    <a href={`/productsdetail/${e?.id}/${e?.PN}`} className="product__image--wrapper">
                                        {e?.image ? (
                                            <img src={e.image} alt={e.name} />
                                        ) : (
                                            <div className="search_img_fallback">
                                                <img
                                                    src="https://boltbust.store/static/media/mechx.3703ec29843e1f4519de.png"
                                                    alt="placeholder"
                                                />
                                            </div>
                                        )}
                                    </a>
                                    <div className="p-3 d-flex flex-column justify-content-between h-50">
                                        <h2 className="product__title">{e?.name}</h2>
                                        <p className="product__subtitle">Part Number: {e?.PN}</p>
                                        <div className="mt-auto d-flex flex-column gap-2">
                                            {/* {e?.price && (
                                                <h6 className="product__title mb-0" style={{ fontSize: '1rem' }}>
                                                    ₹{e?.price}
                                                </h6>
                                            )} */}
                                            <button className="product__btn" onClick={() => handleClick(e?.id, e?.PN)}>
                                                View Details
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {error && <p className="text-danger mt-4">{error}</p>}
                    </div>
                )}
            </div>
        </div>
    );
}
