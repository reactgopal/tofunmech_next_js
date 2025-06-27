'use client'

import { Add_To_cart_Login, SingleProductDetails, WishListLoginDelete } from "@/api/services/apiServices";
import { addLoginCart, addProductDetails, addToCart, addToWishlist, removeProductWishlist } from "@/store/reducers/ProductSlice";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { HiShoppingCart } from "react-icons/hi";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { toast } from "react-toastify";
import Breadcrumbs from "@/utils/Breadcrumbs";

export default function ShopDetails() {

    const user = JSON.parse(localStorage.getItem("USER"));
    console.log(user?.success, "user success");

    const router = useRouter();
    const params = useParams();
    const dispatch = useDispatch();
    const { add_Details, login_cart, addto_cart, add_wish } = useSelector((state) => ({ ...state.products }));
    const id = params.id;
    const PN = params.PN;
    console.log(user, "user is not login");
    useEffect(() => {
        SingleProductDetails(id, PN).then((res) => {
            if (res.success) {
                dispatch(addProductDetails(res?.data));
            }
        })
    }, [])
    // wishlist
    var wishListIdsArray = [];
    add_wish.forEach(function (obj) {
        console.log(obj, "obj")
        wishListIdsArray.push(obj.product_id);
    });
    const handleWish = (id) => {
        dispatch(addToWishlist({ product_id: id }));
        WishListLoginDelete({ product_id: id }).then((res) => {
            if (res.success) {
                console.log(res, "res of wishlist of login delete")
                // dispatch(addToWishlist(res.data))
            }
        });
    };
    const removeElement = (id) => {
        dispatch(removeProductWishlist(id));
        WishListLoginDelete({ product_id: id }).then((res) => {
            // console.log(res);
        });
    };

    // add to cart
    var productIdsArray = [];
    addto_cart.forEach(function (obj) {
        productIdsArray.push(obj.part_no);
    });

    var productLoginIdsArray = [];

    // login_cart.forEach(function (obj) {
    //     productLoginIdsArray.push(obj?.product?.pn);
    // });
    console.log(login_cart, "login_cart")
    Object.values(login_cart).forEach(function (obj) {
        productLoginIdsArray.push(obj?.product?.pn);
    });

    const handleAddToCart = () => {
        // console.log(user.success, "user");
        // if (user?.success !== true) {
        if (user === null) {
            const productExists = addto_cart.some((item) => item.proId === add_Details?.id);

            if (productExists) {
                toast.error('Product is already in the cart');
            } else {
                let data = {
                    proId: add_Details?.id,
                    price: add_Details?.temp_price,
                    qty: 1,
                    name: add_Details?.name,
                    // image: add_Details?.images[0].image,
                    part_no: add_Details?.PN
                }

                // Check if the product already exists in the cart
                dispatch(addToCart(data));
                toast.success('not login Product added to cart successfully!');
            }
        } else {
            console.log(add_Details?.is_cart, "add_Details?.is_cart");
            if (add_Details?.is_cart == 1) {
                toast.error('Product is already in the cart');
                return;
            }
            // data object pass product name 

            let data = {
                product_id: add_Details?.id,
                price: add_Details?.temp_price,
                // name: add_Details?.name,
                // image: add_details?.images[0].image,
                // image: add_Details?.image,
                part_no: add_Details?.PN,
                qty: 1,
            }
            console.log(data)

            Add_To_cart_Login(data).then((res) => {
                console.log(res, "res");
                if (res.success && res.data) {
                    toast.success(res.message, "res.success");
                    console.log(res.data, "res.success");
                    // dispatch(addLoginCart([{ ...res.data, image: add_Details?.image, name: add_Details?.name }]));
                    // dispatch(addLoginCart([{ ...res.data }]));
                    dispatch(addLoginCart([{ ...res.data }]))
                    // dispatch(addLoginCart([{ ...res.data, product: add_Details }]))

                }
                // toast.success("Added to cart");
            })
        }
    }
    console.log(add_Details, "add_Details");
    return (
        <div className="shop-details">
            <div className="container">
                <section className="shop-details__main_area ">
                    <div className="container">
                        <div className="row">
                            <span className="text-black">
                                <Breadcrumbs />
                            </span>
                            <div className="col-lg-6">
                                <div className="container-banner-activities">
                                    <div className=" border rounded-3 overflow-hidden">
                                        <div className="" style={{ height: "480px" }}>
                                            {
                                                add_Details?.image ?
                                                    (
                                                        <div className="slick-slider banner-activities-detail slick-initialized" dir="ltr">
                                                            <img src={add_Details?.image} alt="Carento" />
                                                        </div>
                                                    ) :
                                                    (
                                                        <div className="slick-slider banner-activities-detail slick-initialized" dir="ltr">
                                                            <img src="https://m.media-amazon.com/images/I/71E7NY7SPTL._SX522_.jpg" alt="Carento" />
                                                        </div>
                                                    )
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 ps-lg-4">
                                <div className="shop-details-header">
                                    <div className="d-flex flex-wrap align-items-center gap-4 mb-3">
                                        <div className="shop-details-rate mb-0">
                                            <div className="rate-element">
                                                <span className="rating">4.96
                                                    <span className="reviews"> (672 reviews)</span>
                                                </span>
                                            </div>
                                        </div>
                                        {/* <a className="text-md-medium neutral-500" href="#">SKU
                                            <span className="text-md-bold neutral-1000 ms-1 text-decoration-underline">LVA-4125</span>
                                        </a> */}
                                        <a href="#">
                                            <img src="/assets/img/shop-list/stock.png" alt="Carento" />
                                        </a>
                                    </div>
                                    <div className="shop-details-title-main">
                                        {
                                            add_Details?.name ?
                                                (
                                                    <h5 className="text-xxl-bold neutral-1000">{add_Details?.name}</h5>
                                                ) :
                                                (
                                                    <h5 className="text-xxl-bold neutral-1000">Mobil Delvac 1300 Super Heavy Duty Synthetic Blend</h5>
                                                )
                                        }
                                    </div>
                                    <div className="shop-details-price">
                                        <h4 className="neutral-1000"> ₹{add_Details?.temp_price}/-</h4>
                                        <span className="text-decoration-line-through">MRP {(add_Details?.temp_price * 1.2).toFixed(2)}/-</span>
                                    </div>
                                    <ul className="shop-details-list">
                                        <li className="text-md-medium neutral-1000">{add_Details?.cate1}</li>
                                        <li className="text-md-medium neutral-1000">{add_Details?.cate2}</li>
                                        <li className="text-md-medium neutral-1000">{add_Details?.cate3}</li>
                                    </ul>
                                    <div className="shop-details-metas mt-4 border-top pt-4">
                                        <div className="shop-details-meta-left mb-0">
                                            {/* <div className="add-to-cart me-3">
                                                <div className="detail-qty">
                                                    <a className="qty-down ps-2" href="#">
                                                        <svg className="invert" xmlns="http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 22 22" fill="none">
                                                            <path d="M15.125 12.375H6.875C6.51033 12.375 6.16059 12.2301 5.90273 11.9723C5.64487 11.7144 5.5 11.3647 5.5 11C5.5 10.6353 5.64487 10.2856 5.90273 10.0277C6.16059 9.76987 6.51033 9.625 6.875 9.625H15.125C15.4897 9.625 15.8394 9.76987 16.0973 10.0277C16.3551 10.2856 16.5 10.6353 16.5 11C16.5 11.3647 16.3551 11.7144 16.0973 11.9723C15.8394 12.2301 15.4897 12.375 15.125 12.375Z" fill="#101010" />
                                                        </svg>
                                                    </a>
                                                    <input className="qty-val w-100px pl-45" type="text" name="quantity" />
                                                    <a className="qty-up pe-2" href="#">
                                                        <svg className="invert" xmlns="http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 22 22" fill="none">
                                                            <path d="M15.5833 10.0833H11.9167V6.41667C11.9167 6.17355 11.8201 5.94039 11.6482 5.76849C11.4763 5.59658 11.2431 5.5 11 5.5C10.7569 5.5 10.5237 5.59658 10.3518 5.76849C10.1799 5.94039 10.0833 6.17355 10.0833 6.41667V10.0833H6.41667C6.17355 10.0833 5.94039 10.1799 5.76849 10.3518C5.59658 10.5237 5.5 10.7569 5.5 11C5.5 11.2431 5.59658 11.4763 5.76849 11.6482C5.94039 11.8201 6.17355 11.9167 6.41667 11.9167H10.0833V15.5833C10.0833 15.8264 10.1799 16.0596 10.3518 16.2315C10.5237 16.4034 10.7569 16.5 11 16.5C11.2431 16.5 11.4763 16.4034 11.6482 16.2315C11.8201 16.0596 11.9167 15.8264 11.9167 15.5833V11.9167H15.5833C15.8264 11.9167 16.0596 11.8201 16.2315 11.6482C16.4034 11.4763 16.5 11.2431 16.5 11C16.5 10.7569 16.4034 10.5237 16.2315 10.3518C16.0596 10.1799 15.8264 10.0833 15.5833 10.0833Z" fill="#101010" />
                                                        </svg>
                                                    </a>
                                                </div>
                                            </div> */}
                                            {user?.success !== true ? (
                                                <>
                                                    {productIdsArray.includes(id) ? (
                                                        console.log(productIdsArray, "productIdsArray if condition"),
                                                        <Link to={"/cart"}>
                                                            <button className="addto_cart_btn">
                                                                View Cart
                                                            </button>
                                                        </Link>
                                                    ) : (
                                                        <button className="shop-details__add_to_cart" onClick={handleAddToCart}>
                                                            <span className="shop-details__add_to_cart_icon"></span>
                                                            Add to cart
                                                        </button>
                                                    )}
                                                </>
                                            ) : (
                                                <>
                                                    {productLoginIdsArray.includes(id) ? (
                                                        console.log(productLoginIdsArray, "productLoginIdsArray else condition"),
                                                        <Link to={"/cart"}>
                                                            <button className="addto_cart_btn">
                                                                View Cart
                                                            </button>
                                                        </Link>
                                                    ) : (
                                                        <button className="shop-details__add_to_cart" onClick={handleAddToCart}>
                                                            <span className="shop-details__add_to_cart_icon"></span>
                                                            Add to cart
                                                        </button>
                                                    )}
                                                </>
                                            )}
                                            {/* <button className="shop-details__add_to_cart" onClick={handleAddToCart}>
                                                <span className="shop-details__add_to_cart_icon"></span>
                                                Add to cart
                                            </button> */}
                                            <button className="shop-details__buy_now" >
                                                <span className="shop-details__buy_now_icon"></span>
                                                Buy Now
                                            </button>
                                        </div>
                                        <div className="shop-details-meta-right">
                                            {
                                                user?.success === true ? (
                                                    wishListIdsArray.includes(add_Details?.id) ? (
                                                        <button className="shop-details__add_to_wishlist" onClick={() => removeElement(add_Details?.id)}
                                                        >
                                                            <BsHeartFill />
                                                            <span className="ms-2">Added to wishlist</span>
                                                        </button>
                                                    ) : (
                                                        <button className="shop-details__add_to_wishlist" onClick={() => handleWish(add_Details?.id)}>
                                                            <BsHeart />
                                                            <span className="ms-2">Add to wishlist</span>
                                                        </button>
                                                    )
                                                ) : (
                                                    <button className="shop-details__add_to_wishlist">
                                                        <BsHeart />
                                                        <span className="ms-2">Add to wishlist</span>
                                                    </button>
                                                )
                                            }
                                            {/* <BsHeart />
                                            <span className="ms-2">Add to wishlist</span> */}
                                        </div>
                                    </div>
                                    <div className="shop-details__description">
                                        <span className="fw-bold">Description :</span>
                                        <span className="text-black">{add_Details?.Description}</span>
                                    </div>
                                </div>
                            </div>
                        </div >
                    </div>
                </section>
            </div>
        </div>
    );
}
