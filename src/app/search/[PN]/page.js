'use client'

import { SearchProduct } from "@/api/services/apiServices";
import Loader from "@/utils/Loader";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Search() {
    const routes = useRouter();
    const params = useParams();
    const pn = params.PN;
    const [searchpart, setSearchPart] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    console.log(pn, "daj;fajdflkasj;fjdsakfjas;lk");
    console.log(searchpart, "searchpart");

    // useEffect(() => {
    //     const
    // })
    useEffect(() => {
        setLoading(true)
        // const modifiedString = pn.replace(/[\s-]/g, '');
        const modifiedString = pn;
        SearchProduct(modifiedString).then((res) => {
            setLoading(false)
            if (res?.success) {
                setSearchPart(res?.data)
            } else {
                setError(res?.message)
            }
        })
    }, [])
    const handleClick = (id, part_no) => {
        navigate(`/productsdetail/${id}/${part_no}`)
    }

    return (
        <div className="">
            <div className="container">
                {
                    loading ? (
                        <>
                            <Loader />
                        </>
                    ) : (
                        <>
                            <div className='mt-4 mb-4'>
                                <div className="row card_hover" >
                                    {
                                        searchpart && searchpart?.map((e, index) => {
                                            return (
                                                <a href={`/productsdetail/${e?.id}/${e?.PN}`} className="col-lg-3 col-md-4 col-sm-6 col-12 mt-4 px-2" key={index}>
                                                    <div className="pro_card ">
                                                        {
                                                            e?.image ?
                                                                <img src={e?.image} alt="" />
                                                                :
                                                                <div className='search_img_new'>
                                                                    <img src="https://boltbust.store/static/media/mechx.3703ec29843e1f4519de.png" alt="" />
                                                                </div>
                                                        }
                                                        <hr />
                                                        <h2 className="ps-3 categories__content--title text-black" >
                                                            {e?.name}
                                                        </h2>
                                                        <p className="ps-3 categories__content--subtitle">
                                                            Part Number:- {e?.PN}
                                                        </p>
                                                        <button onClick={() => handleClick(e?.id, e?.PN)}>
                                                            View Details
                                                        </button>
                                                    </div>
                                                </a>
                                            );
                                        })
                                    }
                                </div>
                                <p>{error}</p>
                            </div>
                        </>
                    )
                }
            </div>
        </div>
    );
}
