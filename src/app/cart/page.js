'use client'

import { useDispatch, useSelector } from "react-redux";
import { AiOutlineClose } from "react-icons/ai";
import {
    removeLoginAddtocart,
    removeProductAddtocart,
    login_qtyIncrement_Decrement,
    removeAllLoginCart,
    addLoginCart,
    qtyIncrementDecrement
} from "@/store/reducers/ProductSlice";
import React, { useEffect, useState, useTransition } from 'react';
import { Add_To_cart_Login, CartList, CartLoginDelete, EstimateOrders } from "@/api/services/apiServices";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import InvoiceWrapper from "@/components/pdf/InvoiceWrapper";

import { motion, AnimatePresence } from 'framer-motion';
import PageBreadcrumb from "@/utils/PageBreadcrumbs";
import WishlistSkeleton from "@/utils/Loading/SubPageSkeleton";


export default function Cart() {
    const router = useRouter();
    const dispatch = useDispatch();
    // const user = JSON.parse(localStorage.getItem("USER"));
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isPending, startTransition] = useTransition();

    const { addto_cart, login_cart } = useSelector((state) => ({ ...state.products }));


    const countTotal = (items) =>
        items.reduce((acc, curr) => acc + curr.qty * parseFloat(curr.price || 0), 0);

    // const countTotal = (items) => items.reduce((acc, curr) => acc + curr.qty * curr.price, 0);



    const handleCheckout = () => {
        startTransition(() => {
            router.push('/checkout');
        });
    };
    useEffect(() => {
        const localUser = JSON.parse(localStorage.getItem("USER"));
        setUser(localUser);
    }, []);

    useEffect(() => {

        // if (!login_cart || login_cart.length === 0) {  // ✅ Fetch only if empty
        setLoading(true); // start loading
        CartList().then((res) => {
            console.log(res, "res of cart list-------------------------------");
            if (res.success) {
                dispatch(addLoginCart(res?.data));
            }
            setLoading(false); // end loading
        }).catch(error => console.error("Error fetching cart:", error));
        // }
    }, []);



    const handleInc = (id) => {
        dispatch(qtyIncrementDecrement({ id, plusMinus: + 1 }))
        toast.success("Quantity updated successfully.")
    }

    const handleDec = (id) => {
        dispatch(qtyIncrementDecrement({ id, plusMinus: - 1 }))
        toast.success("Quantity updated successfully.")
    }
    const removeElement = (id) => {
        dispatch(removeProductAddtocart(id))
        toast.success('Products Remove From Cart.');
    };
    const removeLoginElement = (id) => {
        CartLoginDelete(id).then((res) => {
            console.log(res, "res of remove login element");
            if (res?.success) {
                toast.success('Products Remove From Cart.');
            }

        })
        dispatch(removeLoginAddtocart(id))
    };
    const handleLoginInc = (id, qty, price) => {
        dispatch(login_qtyIncrement_Decrement({ id, plusMinus: +1 }));
        let data = {
            product_id: id,
            price,
            qty,
        };
        Add_To_cart_Login(data).then((res) => {
            if (res.success) {
                toast.success(res.message);
            }
        });
    };
    const handleLoginDec = (id, qty, price) => {
        dispatch(login_qtyIncrement_Decrement({ id, plusMinus: -1 }));
        let data = {
            product_id: id,
            price,
            qty,
        };
        console.log(data, "handleLoginDec")
        Add_To_cart_Login(data).then((res) => {
            console.log(res, "res")
            if (res.success) {
                toast.success(res.message);
            }
        });
    }
    const calculateTotal = () => {
        return cartItems.reduce((total, item) => {
            const finalPrice = item?.discount || item?.price;
            return total + finalPrice * item?.quantity;
        }, 0).toFixed(2);
    };
    const createEstimate = (e) => {
        e.preventDefault(); // Prevent the default navigation

        if (!user?.success) {
            router.push('/login'); // Redirect to login if user is not logged in
            return;
        } else {
            EstimateOrders().then((res) => {
                if (res.success) {
                    toast.success(res.message);
                } else {
                    // router.push('/my-estimates');
                    router.push('/cart');
                }
            });
        }
    }
    console.log(login_cart, "login_cart")

    console.log(addto_cart, "addto_cart")
    return (
        <div className="margin_top_all">
            <div className="breadcrumb-section breadcrumb__bg">
                <div className="container">
                    <PageBreadcrumb />
                </div>
            </div>

            <div className="cart_area">
                <div className="container">
                    <div className="table-responsive">
                        {
                            loading ? (
                                <WishlistSkeleton />
                            ) :
                                addto_cart?.length > 0 || login_cart?.length > 0 ?
                                    (<>
                                        <table className="table align-middle text-center">
                                            <thead className="table-light h2">
                                                <tr className="my-2">
                                                    <th scope="col">Product</th>
                                                    <th scope="col">Price</th>
                                                    <th scope="col">Quantity</th>
                                                    <th scope="col">Total</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {user?.success !== true ? (
                                                    <>
                                                        <AnimatePresence >

                                                            {addto_cart?.map((item, index) => {
                                                                return (
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
                                                                        <td data-label="Product" className="text-start d-flex align-items-center gap-3" >
                                                                            <button
                                                                                className="wishlist_remove"
                                                                                onClick={() => removeElement(item?.proId)}

                                                                            >
                                                                                <AiOutlineClose size={18} />
                                                                            </button>

                                                                            <img
                                                                                src={item?.product?.image || "asdlfjs;dl"}
                                                                                alt="product"
                                                                                width={70}
                                                                                height={70}
                                                                                style={{ width: "90px", height: "auto", borderRadius: "5px" }}
                                                                            />
                                                                            <div>
                                                                                <div>
                                                                                    <div className="h3 ">
                                                                                        {item?.product?.name}
                                                                                        {/* {item?.name || item?.product?.name || "hello world"} */}
                                                                                    </div>
                                                                                    <small className="p">{item?.Description}</small>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td data-label="Price">
                                                                            {item?.discount ? (
                                                                                <>
                                                                                    <span className="text-decoration-line-through text-muted me-2">
                                                                                        ₹{item?.price.toFixed(2)}
                                                                                    </span>
                                                                                    <span className="fw-bold text-success">
                                                                                        ₹{item?.discount.toFixed(2)}
                                                                                    </span>
                                                                                </>
                                                                            ) : (
                                                                                <span className="fw-bold">₹{item?.price}</span>
                                                                            )}
                                                                        </td>
                                                                        <td data-label="Quantity">
                                                                            <div className="quantity__box justify-content-center">
                                                                                {/* <button className="quantity__value decrease"
                                                                            onClick={() => handleDec(
                                                                                item?.product_id,
                                                                                item?.qty - 1,
                                                                                item?.price
                                                                            )}
                                                                        >-</button>
                                                                        <h5
                                                                            className="ms-3 me-3 mt-2">{item?.qty}
                                                                        </h5>
                                                                        <button className="quantity__value increase"
                                                                            onClick={() => handleInc(
                                                                                item?.product_id,
                                                                                item?.qty + 1,
                                                                                item?.price
                                                                            )}>+</button> */}
                                                                                <button
                                                                                    onClick={() => handleDec(item?.proId)}
                                                                                    disabled={item?.qty == 1 ? true : false}
                                                                                    className="quantity__value quickview__value--quantity decrease"
                                                                                >
                                                                                    -
                                                                                </button>
                                                                                <h3 className="ms-3 me-3 mt-2">{item?.qty}</h3>
                                                                                <button
                                                                                    onClick={() => handleInc(item?.proId)}
                                                                                    className="quantity__value quickview__value--quantity increase"
                                                                                >
                                                                                    +
                                                                                </button>
                                                                            </div>
                                                                        </td>

                                                                        <td data-label="Total">
                                                                            <span className="fw-bold text-success">
                                                                                ₹ {parseFloat(item?.discount || item?.price) * item?.qty}

                                                                            </span>
                                                                        </td>
                                                                    </motion.tr>
                                                                )

                                                            })}
                                                        </AnimatePresence>

                                                    </>
                                                ) : (
                                                    <>
                                                        <AnimatePresence >

                                                            {login_cart?.map((item, index) => {
                                                                return (
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
                                                                        <td data-label="Product" className="text-start d-flex align-items-center gap-3" >
                                                                            <motion.button
                                                                                className="wishlist_remove"
                                                                                onClick={() => removeLoginElement(item?.id)}

                                                                            >
                                                                                <AiOutlineClose size={18} />
                                                                            </motion.button>
                                                                            <img
                                                                                src={item?.product?.image || "asdlfjs;dl"}
                                                                                // src={item?.image || "asdlfjs;dl"}
                                                                                alt="product"
                                                                                width={70}
                                                                                height={70}
                                                                                style={{ width: "90px", height: "auto", borderRadius: "5px" }}
                                                                            />
                                                                            <div>
                                                                                <div className="h3" style={{ fontWeight: "500" }}>
                                                                                    {item?.name}
                                                                                    {item?.name || item?.product?.name || "hello world"}

                                                                                </div>
                                                                                <small className="p">{item?.Description}</small>
                                                                            </div>
                                                                        </td>

                                                                        <td data-label="Price">
                                                                            {item?.discount ? (
                                                                                <>
                                                                                    <span className="text-decoration-line-through text-muted me-2">
                                                                                        ₹{item?.price.toFixed(2)}
                                                                                    </span>
                                                                                    <span className="fw-bold text-success">
                                                                                        ₹{item?.discount.toFixed(2)}
                                                                                    </span>
                                                                                </>
                                                                            ) : (
                                                                                <span className="fw-bold">₹{item?.price}</span>
                                                                            )}
                                                                        </td>
                                                                        <td data-label="Quantity">
                                                                            <div className="quantity__box justify-content-center">
                                                                                <button className="quantity__value decrease"
                                                                                    onClick={() => handleLoginDec(
                                                                                        item?.product_id,
                                                                                        item?.qty - 1,
                                                                                        item?.price
                                                                                    )}
                                                                                    disabled={item?.qty == 1 ? true : false}
                                                                                >-</button>
                                                                                <h5
                                                                                    className="ms-3 me-3 mt-2">
                                                                                    {item?.qty}
                                                                                </h5>
                                                                                <button className="quantity__value increase"
                                                                                    onClick={() => handleLoginInc(
                                                                                        item?.product_id,
                                                                                        item?.qty + 1,
                                                                                        item?.price
                                                                                    )}>+</button>
                                                                            </div>
                                                                        </td>

                                                                        {/* Action Button */}
                                                                        <td data-label="Total">
                                                                            <span className="fw-bold text-success">
                                                                                {/* ₹ {(item?.discount || item?.price) * item?.qty} */}
                                                                                ₹ {parseFloat(item?.discount || item?.price) * item?.qty}

                                                                            </span>
                                                                        </td>
                                                                    </motion.tr>
                                                                )
                                                            })}
                                                        </AnimatePresence>

                                                    </>
                                                )
                                                }
                                            </tbody>
                                            <tfoot>
                                                {
                                                    user?.success !== true ?
                                                        <>
                                                            <tr>
                                                                <td colSpan={3} style={{ fontWeight: "600", textAlign: "left" }}>
                                                                    <p>SubTotal:</p>
                                                                    <p>Estimated delivery costs:</p>
                                                                    <p>Total:</p>
                                                                </td>
                                                                <td colSpan={3} className="">
                                                                    <p>₹ {countTotal(addto_cart).toLocaleString("en-IN")}/-</p>
                                                                    <p>Free</p>
                                                                    <p>₹ {(countTotal(addto_cart)).toLocaleString("en-IN")}/-</p>
                                                                </td>
                                                            </tr>
                                                        </>
                                                        :
                                                        <>
                                                            <tr>
                                                                <td colSpan={3} style={{ fontWeight: "600", textAlign: "left" }}>
                                                                    <p>SubTotal:</p>
                                                                    <p>Estimated delivery costs:</p>
                                                                    <p>Total:</p>
                                                                </td>
                                                                <td colSpan={3} className=" fw-bold">
                                                                    <p>₹{countTotal(login_cart).toLocaleString("en-IN")}/-</p>
                                                                    <p>Free</p>
                                                                    <p>₹{(countTotal(login_cart)).toLocaleString("en-IN")}/-</p>
                                                                </td>
                                                            </tr>
                                                        </>
                                                }
                                            </tfoot>
                                        </table>
                                        <div className="d-flex justify-content-between">
                                            {/* <BlobProvider document={login_cart ? <EstimateInvoice order={login_cart} total={countTotal(login_cart)} /> : <></>}>
                                            {({ blob, url, loading, error }) => (
                                                <a
                                                    href={url}
                                                    target="_blank"
                                                    className='btn__view_estimate'
                                                    onClick={(e) => login_cart && createEstimate(e, url)}
                                                >
                                                    View Estimates
                                                </a>
                                            )}
                                        </BlobProvider> */}
                                            {/* {Array.isArray(login_cart) && login_cart.length > 0 ? (
                                            <BlobProvider
                                                document={
                                                    <EstimateInvoice
                                                        order={login_cart}
                                                        total={countTotal(login_cart)}
                                                    />
                                                }
                                            >
                                                {({ url, loading }) =>
                                                    !loading && (
                                                        <a href={url} target="_blank" rel="noopener noreferrer" className='btn__view_estimate'>
                                                            Download Estimate
                                                        </a>
                                                    )
                                                }
                                            </BlobProvider>
                                        ) : (
                                            <p>No estimate available</p>
                                        )} */}
                                            {/* <InvoiceWrapper order={login_cart} total={countTotal(login_cart)} /> */}
                                            {
                                                user?.success !== true ? (
                                                    <a href="/login">
                                                        <button className="btn__view_estimate">
                                                            Download Estimate
                                                        </button>
                                                    </a>
                                                ) : (
                                                    <form
                                                        method="POST"
                                                        action="/api/estimate"
                                                        target="_blank"
                                                        onSubmit={(e) => {
                                                            e.preventDefault();
                                                            const form = e.target;

                                                            fetch('/api/estimate', {
                                                                method: 'POST',
                                                                headers: { 'Content-Type': 'application/json' },
                                                                body: JSON.stringify({ order: login_cart, total: countTotal(login_cart) }),
                                                            })
                                                                .then((res) => res.blob())
                                                                .then((blob) => {
                                                                    const url = window.URL.createObjectURL(blob);
                                                                    window.open(url, '_blank');
                                                                });
                                                        }}
                                                    >
                                                        <button type="submit" className="btn__view_estimate">
                                                            View Estimate
                                                        </button>
                                                    </form>
                                                )
                                            }




                                            <button className="btn__cart" onClick={handleCheckout}>Proceed to Checkout</button>
                                        </div>
                                    </>
                                    ) :
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
            </div >
        </div >
    );
}
