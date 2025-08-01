'use client';
import { WishListLogin, WishListLoginDelete } from "@/api/services/apiServices";
import { addToWishlist, removeAllItemWishlist, removeProductWishlist } from "@/store/reducers/ProductSlice";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from 'framer-motion';
import PageBreadcrumb from "@/utils/PageBreadcrumbs";
import WishlistSkeleton from "@/utils/Loading/SubPageSkeleton";

export default function WishList() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    const { add_wish } = useSelector((state) => ({ ...state.products }));
    useEffect(() => {
        setLoading(true); // start loading
        WishListLogin().then((res) => {

            console.log(res, "res of wishlist of login")
            if (res.success) {
                dispatch(removeAllItemWishlist())
                dispatch(addToWishlist(res?.data))
            }
            setLoading(false); // end loading

        })
    }, [])
    const removeElement = (id) => {
        dispatch(removeProductWishlist(id));
        WishListLoginDelete({ product_id: id }).then((res) => {
            toast.success(res.message);
        });
    }
    console.log(add_wish, "add_wish");


    return (
        <div className="margin_top_all">
            <div className="breadcrumb-section breadcrumb__bg">
                <div className="container">
                    <PageBreadcrumb />
                </div>
            </div>
            <div className="wishlist_area">
                <div className="container">
                    {
                        loading ? (
                            <WishlistSkeleton />
                        ) :
                            add_wish?.length > 0 ? (<>
                                <div className="table-responsive overflow-hidden">
                                    <table className="table align-middle text-center">
                                        <thead className="table-light h2">
                                            <tr className="my-2">
                                                <th scope="col">Product Name</th>
                                                <th scope="col">Price</th>
                                                <th scope="col">Stock Status</th>
                                                <th scope="col">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <AnimatePresence>
                                                {add_wish?.map((e, index) => (
                                                    <motion.tr
                                                        key={index}
                                                        initial={{ opacity: 0, y: 20 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{
                                                            opacity: 0, x: -100
                                                        }}
                                                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                                        layout
                                                    >
                                                        {/* Product Name + Image + Remove */}
                                                        <td className="text-start d-flex align-items-center gap-3">
                                                            <button
                                                                className="wishlist_remove"
                                                                onClick={() => removeElement(e?.product?.id)}
                                                            >
                                                                <AiOutlineClose size={18} />
                                                            </button>
                                                            <img
                                                                src={e?.product?.image}
                                                                alt="product"
                                                                style={{ width: "90px", height: "auto", borderRadius: "5px" }}
                                                            />
                                                            <div>
                                                                <div className="h3" style={{ fontWeight: "500" }}>
                                                                    <Link href={`/productsdetail/${e?.product?.id}/${e?.product?.PN}`} className="text-black">
                                                                        {e?.product?.name}
                                                                    </Link>
                                                                </div>
                                                                {/* <small className="p">{e?.product?.Description}</small> */}
                                                            </div>
                                                        </td>

                                                        {/* Price */}
                                                        <td>
                                                            {e?.product?.discount_price ? (
                                                                <>
                                                                    <span className="text-decoration-line-through text-muted me-2">
                                                                        ₹{e?.product?.price}
                                                                    </span>
                                                                    <span className="fw-bold text-success">
                                                                        ₹{e?.product?.discount_price}
                                                                    </span>
                                                                </>
                                                            ) : (
                                                                <span className="fw-bold">₹{e?.product?.temp_price}</span>
                                                            )}
                                                        </td>

                                                        {/* Stock */}
                                                        <td>
                                                            <span className="badge bg-success">In Stock</span>
                                                        </td>

                                                        {/* Actions */}
                                                        <td>
                                                            <Link href={`/productsdetail/${e?.product?.id}/${e?.product?.PN}`} className="text-black">
                                                                <button className="btn__wishlist">View Details</button>
                                                            </Link>
                                                        </td>
                                                    </motion.tr>
                                                ))}
                                            </AnimatePresence>
                                        </tbody>
                                    </table>
                                </div>
                            </>)
                                :
                                (
                                    // <img
                                    //     style={{
                                    //         marginLeft: "auto",
                                    //         marginRight: "auto",
                                    //         display: "block",
                                    //     }}
                                    //     src="https://nmkonline.com/images/pages/tumbleweed.gif"
                                    //     alt=""
                                    // />
                                    <img
                                        style={{
                                            marginLeft: "auto",
                                            marginRight: "auto",
                                            display: "block",
                                            maxWidth: "100%",
                                            width: "350px", // or remove this for full responsive scaling
                                            height: "auto",
                                        }}
                                        src="https://nmkonline.com/images/pages/tumbleweed.gif"
                                        alt="Empty Wishlist"
                                    />
                                )

                    }

                </div>
            </div>
        </div>
    );
}
