'use client'
import { BlobProvider, PDFDownloadLink } from '@react-pdf/renderer';
import EstimateInvoice from '@/utils/EstimateInvoice';
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
    removeLoginAddtocart,
    removeProductAddtocart,
    login_qtyIncrement_Decrement,
    removeAllLoginCart,
    addLoginCart,
    qtyIncrementDecrement
} from "@/store/reducers/ProductSlice";
import { Add_To_cart_Login, CartList, CartLoginDelete, EstimateOrders } from "@/api/services/apiServices";
import { useRouter } from "next/navigation";

import { toast } from "react-toastify";
import Link from 'next/link';
import { useEffect, useMemo } from 'react';
export default function Cart() {
    const router = useRouter();
    const dispatch = useDispatch();
    const user = useMemo(() => {
        if (typeof window !== 'undefined') {
            return JSON.parse(localStorage.getItem('USER'));
        }
        return null;
    }, []);
    console.log(user)

    // const user = JSON.parse(localStorage.getItem("USER"));
    const { addto_cart, login_cart } = useSelector((state) => ({ ...state.products }));
    const countTotal = (items) => items.reduce((acc, curr) => acc + curr.qty * curr.price, 0);

    const handleCheckout = () => {
        router.push('/checkout');
    };
    useEffect(() => {
        if (!login_cart || login_cart.length === 0) {  // ✅ Fetch only if empty
            CartList().then((res) => {
                if (res.success) {
                    dispatch(addLoginCart(res?.data));
                }
            }).catch(error => console.error("Error fetching cart:", error));
        }
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
        console.log(id, "id")
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
    // const calculateTotal = () => {
    //     return cartItems.reduce((total, item) => {
    //         const finalPrice = item?.discount || item?.price;
    //         return total + finalPrice * item?.quantity;
    //     }, 0).toFixed(2);
    // };
    const createEstimate = (e) => {
        // e.preventDefault(); // Prevent the default navigation

        if (!user?.success) {
            router.push('/login'); // Redirect to login if user is not logged in
            return;
        } else {
            EstimateOrders().then((res) => {
                if (res.success) {
                    toast.success(res.message);
                } else {
                    console.log("sdfasdfafds")
                    // router.push('/my-estimates');
                    router.push('/cart');
                }
            });
        }
    }

    return (
        <div className="cart_area">
            <div className="container py-5">
                <div className="table-responsive">
                    {
                        addto_cart?.length > 0 || login_cart?.length > 0 ?
                            (<>
                                <table className="table align-middle text-center">
                                    <thead className="table-light">
                                        <tr>
                                            <th scope="col">PRODUCT</th>
                                            <th scope="col">PRICE</th>
                                            <th scope="col">QUANTITY</th>
                                            <th scope="col">TOTAL</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {user?.success !== true ? (
                                            <>
                                                {addto_cart?.map((item, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td className="text-start d-flex align-items-center gap-3" >
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
                                                                    <div className="fw-semibold">{item?.name}</div>
                                                                    <small className="text-muted">{item?.description}</small>
                                                                </div>
                                                            </td>

                                                            <td>
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
                                                            <td>
                                                                <div className="quantity__box justify-content-center">
                                                                    <button className="quantity__value decrease"
                                                                        onClick={() => handleDec(
                                                                            item?.product_id,
                                                                            item?.qty - 1,
                                                                            item?.price
                                                                        )}
                                                                    >-</button>
                                                                    <h5 className="ms-3 me-3 mt-2">{item?.qty}</h5>
                                                                    <button className="quantity__value increase"
                                                                        onClick={() => handleInc(
                                                                            item?.product_id,
                                                                            item?.qty + 1,
                                                                            item?.price
                                                                        )}>+</button>
                                                                </div>
                                                            </td>

                                                            <td>
                                                                <span className="fw-bold text-success">
                                                                    ₹ {(item?.discount || item?.price) * item?.qty}
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    )

                                                })}
                                            </>
                                        ) : (
                                            <>
                                                {login_cart?.map((item, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            {/* Product Name + ImaFge + Remove */}
                                                            <td className="text-start d-flex align-items-center gap-3" >
                                                                <button
                                                                    className="wishlist_remove"
                                                                    onClick={() => removeLoginElement(item?.id)}

                                                                >
                                                                    <AiOutlineClose size={18} />
                                                                </button>
                                                                <img
                                                                    src={item?.product?.image}
                                                                    alt="product"
                                                                    width={70}
                                                                    height={70}
                                                                    style={{ width: "90px", height: "auto", borderRadius: "5px" }}
                                                                />
                                                                <div>
                                                                    <div className="fw-semibold">{item?.product?.name}</div>
                                                                    <small className="text-muted">{item?.product?.Description}</small>
                                                                </div>
                                                            </td>

                                                            {/* Price */}
                                                            <td>
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

                                                            {/* Quantity Controls */}
                                                            <td>
                                                                <div className="quantity__box justify-content-center">
                                                                    <button className="quantity__value decrease"
                                                                        onClick={() => handleLoginDec(
                                                                            item?.product_id,
                                                                            item?.qty - 1,
                                                                            item?.price
                                                                        )}
                                                                    // disabled={item?.qty == 1 ? true : false}
                                                                    >-</button>
                                                                    <h5 className="ms-3 me-3 mt-2">{item?.qty}</h5>
                                                                    <button className="quantity__value increase"
                                                                        onClick={() => handleLoginInc(
                                                                            item?.product_id,
                                                                            item?.qty + 1,
                                                                            item?.price
                                                                        )}>+</button>
                                                                </div>
                                                            </td>

                                                            {/* Action Button */}
                                                            <td>
                                                                <span className="fw-bold text-success">
                                                                    ₹ {(item?.discount || item?.price) * item?.qty}
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    )
                                                })}
                                            </>
                                        )}
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
                                                        <td className="text-center">
                                                            <p>₹ {countTotal(addto_cart).toLocaleString("en-IN")}/-</p>
                                                            <p>Free</p>
                                                            <p>₹ {(countTotal(addto_cart)).toLocaleString("en-IN")}/-</p>
                                                        </td>
                                                    </tr>
                                                </>
                                                :
                                                <tr>
                                                    <td colSpan={3} style={{ fontWeight: "600", textAlign: "left" }}>
                                                        <p>SubTotal:</p>
                                                        <p>Estimated delivery costs:</p>
                                                        <p>Total:</p>
                                                    </td>
                                                    <td className="text-center">
                                                        <p>₹ {countTotal(login_cart).toLocaleString("en-IN")}/-</p>
                                                        <p>Free</p>
                                                        <p>₹ {(countTotal(login_cart)).toLocaleString("en-IN")}/-</p>
                                                    </td>
                                                </tr>
                                        }
                                    </tfoot>
                                </table>
                                <div className="d-flex justify-content-between">
                                    {/* <BlobProvider document={login_cart ? <EstimateInvoice order={login_cart} total={countTotal(login_cart)} /> : <></>}>
                                        {({ blob, url, loading, error }) => (
                                            <a
                                                href={url}
                                                target="_blank"
                                                style={{
                                                    backgroundColor: "var(--primary-color)",
                                                    color: "white",
                                                    border: "0",
                                                    borderRadius: "5px",
                                                    width: "200px",
                                                    textAlign: "center",
                                                    padding: "3px 20px"
                                                }}
                                                onClick={(e) => login_cart && createEstimate(e, url)}
                                            >
                                                View Estimates
                                            </a>
                                        )}
                                    </BlobProvider> */}

                                    <button className="btn__cart" onClick={handleCheckout}>Proceed to Checkout</button>
                                </div>
                            </>) :
                            (<>
                                <img
                                    style={{
                                        marginLeft: "auto",
                                        marginRight: "auto",
                                        display: "block",
                                    }}
                                    src="https://nmkonline.com/images/pages/tumbleweed.gif"
                                    alt=""
                                />
                            </>)
                    }

                </div>
            </div>
        </div >
    );
}
