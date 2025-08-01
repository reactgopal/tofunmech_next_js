'use client'

import { Add_To_cart_Login, CartList, SingleProductDetails, WishListLoginDelete } from "@/api/services/apiServices";
import { addLoginCart, addProductDetails, addToCart, addToWishlist, removeProductWishlist, updateCartCount } from "@/store/reducers/ProductSlice";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { HiShoppingCart } from "react-icons/hi";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { toast } from "react-toastify";
import Breadcrumbs from "@/utils/Breadcrumbs";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { MessageCircle, Star, ThumbsUp, TrendingUp, User } from "lucide-react";
import Link from "next/link";

export default function ShopDetails() {

    const user = JSON.parse(localStorage.getItem("USER"));
    console.log(user?.success, "user success");

    const router = useRouter();
    const params = useParams();
    const dispatch = useDispatch();
    const { add_Details, login_cart, addto_cart, add_wish } = useSelector((state) => ({ ...state.products }));
    const id = params.id;
    const PN = params.PN;

    // review
    const [reviewOpen, setReviewOpen] = useState(true);
    const [addOpen, setAddOpen] = useState(true);
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState("");
    const [helpfulClicks, setHelpfulClicks] = useState({});

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

    login_cart.forEach(function (obj) {
        productLoginIdsArray.push(obj?.product?.pn);
    });

    const handleAddToCart = () => {
        // console.log(user.success, "user");
        // if (user?.success !== true) {
        if (user === null) {
            // const productExists = addto_cart.some((item) => item.proId === add_Details?.id);
            const productExists = addto_cart.some(
                (item) => item.proId === add_Details?.id
            );
            if (productExists) {
                toast.error('Product is already in the cart');
            } else {
                let data = {
                    proId: add_Details?.id,
                    price: add_Details?.temp_price,
                    qty: 1,
                    product: add_Details  // 🔥 store full product as "product"

                    // name: add_Details?.name,
                    // image: add_Details?.image,
                    // part_no: add_Details?.PN
                }

                // Check if the product already exists in the cart
                dispatch(addToCart(data));
                toast.success("Product added to cart successfully!");

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
                qty: 1,
            }
            Add_To_cart_Login(data).then((res) => {
                if (res.success && res.data) {
                    console.log(res, "res add to cart login");
                    const isAlreadyInCart = login_cart.some(item => item.product_id === res.data.product_id);
                    if (isAlreadyInCart) {
                        toast.warning("Product is already in the cart"); // ✅ Show toast if already exists
                    } else {
                        console.log(res.data, "res.success______-----0-08-00");
                        toast.success("Product added to cart successfully!");

                        // Fetch latest cart items from server
                        CartList().then((res) => {
                            if (res.success) {
                                dispatch(addLoginCart(res?.data));
                                // dispatch(updateCartCount()); // ✅ update header count
                            }
                        });
                    }
                }
            })
        }
    }

    const handleBuyNow = () => {
        console.log("handleBuyNow");
        if (user?.success !== true) {
            const productExists = addto_cart.some((item) => item.proId === add_Details?.id);
            if (productExists) {
                router.push('/cart');
            } else {
                let data = {
                    proId: add_Details?.id,
                    price: add_Details?.temp_price,
                    // price: add_Details?.price,
                    qty: 1,
                    name: add_Details?.name,
                    // image: add_Details?.images[0].image,
                    part_no: add_Details?.PN
                }
                dispatch(addToCart(data));
            }
        } else {
            let data = {
                product_id: add_Details?.id,
                // price: add_Details?.price,
                price: add_Details?.temp_price,
                qty: 1,
                part_no: add_Details?.PN
            }
            Add_To_cart_Login(data).then((res) => {
                router.push('/checkout');
            })
        }
    }
    // review
    const handleReviewClick = () => {
        reviewOpen ? setAddOpen(false) : setReviewOpen(true);
    };

    const handleAddClick = () => {
        reviewOpen ? setReviewOpen(false) : setAddOpen(true);
    };
    const ratingDistribution = [1, 2, 3, 4, 5].map((star) => {
        const count = add_Details?.reviews?.filter((r) => r.rating === star).length || 0;
        const percentage = add_Details?.reviews?.length
            ? (count / add_Details.reviews.length) * 100
            : 0;
        return { star, count, percentage };
    });
    const renderStars = (rating = 0) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                i <= rating ? (
                    <AiFillStar key={i} className="text-yellow-400" />
                ) : (
                    <AiOutlineStar key={i} className="text-yellow-400" />
                )
            );
        }
        return <div className="flex gap-1">{stars}</div>;
    };
    const toggleHelpful = (reviewId) => {
        setHelpfulClicks((prev) => ({
            ...prev,
            [reviewId]: !prev[reviewId],
        }));
    };

    console.log(login_cart, "login cart");
    console.log(addto_cart, "addto_cart");
    console.log(add_Details, "add_Details");
    return (
        <div className="margin_top_all">
            <div className="breadcrumb-section" style={{ padding: "1rem 0rem" }}>
                <div className="container">

                    <Breadcrumbs />
                </div>
            </div>
            <div className="">
                <div className="container">
                    <section className="shop-details__main_area">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="container-banner-activities">
                                        {
                                            add_Details?.image ?
                                                (
                                                    <div className="main_img_single_new" dir="ltr" style={{ overflow: "visible", position: "relative", width: "100%", height: "auto" }}>
                                                        <img src={add_Details?.image} alt="Carento" />
                                                    </div>
                                                ) :
                                                (
                                                    <div className="main_img_single_new" dir="ltr" style={{ overflow: "visible", position: "relative", width: "100%", height: "auto" }}>
                                                        <img src="https://m.media-amazon.com/images/I/71E7NY7SPTL._SX522_.jpg" alt="Carento" />
                                                    </div>
                                                )
                                        }
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
                                                            <Link href="/cart">
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
                                                            <Link href="/cart">
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
                                                {/* {
                                                add_Details?.out_of_stock == 1 && (
                                                    <> */}
                                                {
                                                    user?.success !== true ? (
                                                        <>
                                                            {productIdsArray.includes(id) ? (
                                                                <Link href="/checkout">
                                                                    <button className="shop-details__buy_now" >
                                                                        <span className="shop-details__buy_now_icon"></span>
                                                                        Buy Now
                                                                    </button>
                                                                </Link>
                                                            ) : (
                                                                <button className="shop-details__buy_now" onClick={() => handleBuyNow()}>
                                                                    <span className="shop-details__buy_now_icon"></span>
                                                                    Buy Now
                                                                </button>
                                                            )}
                                                        </>
                                                    ) : (
                                                        <>
                                                            {
                                                                productLoginIdsArray.includes(id) ? (
                                                                    <Link href="/checkout">
                                                                        <button className="shop-details__buy_now" >
                                                                            <span className="shop-details__buy_now_icon"></span>
                                                                            Buy Now
                                                                        </button>
                                                                    </Link>
                                                                ) : (
                                                                    <button className="shop-details__buy_now" onClick={() => handleBuyNow()}>
                                                                        <span className="shop-details__buy_now_icon"></span>
                                                                        Buy Now
                                                                    </button>
                                                                )
                                                            }
                                                        </>
                                                    )
                                                }
                                                {/* <button className="shop-details__buy_now" >
                                                <span className="shop-details__buy_now_icon"></span>
                                                Buy Now
                                            </button> */}
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
                                                        <Link href="/login" className="text-black">
                                                            <button className="shop-details__add_to_wishlist">
                                                                <BsHeart />
                                                                <span className="ms-2">Add to wishlist</span>
                                                            </button>
                                                        </Link>
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
                            </div>
                        </div>
                    </section>

                    {/* Start product details tab Start section */}
                    <section className="product__details--tab__section section--padding">
                        <div className="container">
                            {/* <div className="row row-cols-1">
                            <div className="col">
                                <ul className="product__tab--one product__details--tab d-flex mb-30">
                                    <li
                                        className={`product__details--tab__list ${reviewOpen === true ? "active" : ""}`}
                                        onClick={handleReviewClick}
                                    >
                                        Product Reviews
                                    </li>
                                    <li
                                        className={`product__details--tab__list ${reviewOpen === true ? "" : "active"}`}
                                        onClick={handleAddClick}
                                    >
                                        Additional Info
                                    </li>
                                </ul>
                                <div className="product__details--tab__inner border-radius-10">
                                    <div className="tab_content">
                                        {
                                            reviewOpen ?
                                                <>
                                                    <div className="product__reviews">
                                                        <div className="product__reviews--header">
                                                            <h2 className="product__reviews--header__title h3 mb-20">
                                                                Customer Reviews
                                                            </h2>
                                                        </div>
                                                        <div className="reviews__comment--area">
                                                            {
                                                                add_Details?.reviews?.length === 0 ? (
                                                                    <div className="reviews__comment--list d-flex">
                                                                        <div className="reviews__comment--thumb">
                                                                            <img
                                                                                src="assets/img/other/comment-thumb1.webp"
                                                                                alt="comment-thumb"
                                                                            />
                                                                        </div>
                                                                        <div className="reviews__comment--content">
                                                                            <div className="reviews__comment--top d-flex justify-content-between">
                                                                                <div className="reviews__comment--top__left">
                                                                                    <h3 className="reviews__comment--content__title h4">
                                                                                        Rino Shah
                                                                                    </h3>
                                                                                    <ul className="rating d-flex">
                                                                                        <li className="rating__list">
                                                                                            <span className="rating__icon">
                                                                                                <AiFillStar />
                                                                                                <AiFillStar />
                                                                                                <AiFillStar />
                                                                                                <AiFillStar />
                                                                                                <AiFillStar />
                                                                                            </span>
                                                                                        </li>
                                                                                    </ul>
                                                                                </div>
                                                                                <span className="reviews__comment--content__date">
                                                                                    13/02/2023
                                                                                </span>
                                                                            </div>
                                                                            <p className="reviews__comment--content__desc">
                                                                                Good Products
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                ) :
                                                                    (add_Details?.reviews?.map((e, index) => {
                                                                        return (
                                                                            <div className="reviews__comment--list d-flex" key={index}>
                                                                                <div className="reviews__comment--thumb">
                                                                                    <img
                                                                                        src="assets/img/other/comment-thumb1.webp"
                                                                                        alt="comment-thumb"
                                                                                    />
                                                                                </div>
                                                                                <div className="reviews__comment--content">
                                                                                    <div className="reviews__comment--top d-flex justify-content-between">
                                                                                        <div className="reviews__comment--top__left">
                                                                                            <h3 className="reviews__comment--content__title h4">
                                                                                                {e?.user?.name ? e?.user?.name : 'Rino Shah'}
                                                                                            </h3>
                                                                                            <ul className="rating d-flex">
                                                                                                <li className="rating__list">
                                                                                                    <span className="rating__icon">
                                                                                                        {
                                                                                                            e?.rating === 0 &&
                                                                                                            <>
                                                                                                                <AiOutlineStar />
                                                                                                                <AiOutlineStar />
                                                                                                                <AiOutlineStar />
                                                                                                                <AiOutlineStar />
                                                                                                                <AiOutlineStar />
                                                                                                            </>
                                                                                                        }
                                                                                                        {
                                                                                                            e?.rating === 1 &&
                                                                                                            <>
                                                                                                                <AiFillStar />
                                                                                                                <AiOutlineStar />
                                                                                                                <AiOutlineStar />
                                                                                                                <AiOutlineStar />
                                                                                                                <AiOutlineStar />
                                                                                                            </>
                                                                                                        }
                                                                                                        {
                                                                                                            e?.rating === 2 &&
                                                                                                            <>
                                                                                                                <AiFillStar />
                                                                                                                <AiFillStar />
                                                                                                                <AiOutlineStar />
                                                                                                                <AiOutlineStar />
                                                                                                                <AiOutlineStar />
                                                                                                            </>
                                                                                                        }
                                                                                                        {
                                                                                                            e?.rating === 3 &&
                                                                                                            <>
                                                                                                                <AiFillStar />
                                                                                                                <AiFillStar />
                                                                                                                <AiFillStar />
                                                                                                                <AiOutlineStar />
                                                                                                                <AiOutlineStar />
                                                                                                            </>
                                                                                                        }
                                                                                                        {
                                                                                                            e?.rating === 4 &&
                                                                                                            <>
                                                                                                                <AiFillStar />
                                                                                                                <AiFillStar />
                                                                                                                <AiFillStar />
                                                                                                                <AiFillStar />
                                                                                                                <AiOutlineStar />
                                                                                                            </>
                                                                                                        }
                                                                                                        {
                                                                                                            e?.rating === 5 &&
                                                                                                            <>
                                                                                                                <AiFillStar />
                                                                                                                <AiFillStar />
                                                                                                                <AiFillStar />
                                                                                                                <AiFillStar />
                                                                                                                <AiFillStar />
                                                                                                            </>
                                                                                                        }
                                                                                                    </span>
                                                                                                </li>
                                                                                            </ul>
                                                                                        </div>
                                                                                        <span className="reviews__comment--content__date">
                                                                                            {new Date(e?.updated_at).toLocaleDateString()}
                                                                                        </span>
                                                                                    </div>
                                                                                    <p className="reviews__comment--content__desc">
                                                                                        {e?.text}
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    }))
                                                            }
                                                        </div>
                                                    </div>
                                                </> :
                                                <>
                                                    <div className="product__tab--content">
                                                        <div className="product__tab--content__step">
                                                            <ul className="additional__info_list">
                                                                <li className="additional__info_list--item">
                                                                    <span className="info__list--item-head">
                                                                        <strong>Part Number</strong>
                                                                    </span>
                                                                    <span className="info__list--item-content">
                                                                        {add_Details?.pn}
                                                                    </span>
                                                                </li>
                                                                <li className="additional__info_list--item">
                                                                    <span className="info__list--item-head">
                                                                        <strong>Manufacturer</strong>
                                                                    </span>
                                                                    <span className="info__list--item-content">{add_Details?.manufacturer}Honda</span>
                                                                </li>
                                                                <li className="additional__info_list--item">
                                                                    <span className="info__list--item-head">
                                                                        <strong>Guarantee</strong>
                                                                    </span>
                                                                    <span className="info__list--item-content">
                                                                        5 years
                                                                    </span>
                                                                </li>
                                                                <li className="additional__info_list--item">
                                                                    <span className="info__list--item-head">
                                                                        <strong>Battery</strong>
                                                                    </span>
                                                                    <span className="info__list--item-content">
                                                                        10000 mAh
                                                                    </span>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div> */}
                            <div className="row row-cols-1 product__tab_area">
                                <div className="col">
                                    <ul className="product__tab--one product__details--tab d-flex mb-30">
                                        <li
                                            className={`product__details--tab__list ${reviewOpen ? "active" : ""}`}
                                            onClick={handleReviewClick}
                                        >
                                            Product Reviews
                                        </li>
                                        <li
                                            className={`product__details--tab__list ${!reviewOpen ? "active" : ""}`}
                                            onClick={handleAddClick}
                                        >
                                            Additional Info
                                        </li>
                                    </ul>

                                    <div className="product__details--tab__inner border-radius-10">
                                        <div className="tab_content">
                                            {reviewOpen ? (
                                                <div className="review__section">
                                                    <div className="review__header">
                                                        <h2 className="review__title">What Our Customers Say</h2>
                                                        <p className="review__subtitle">Real feedback from verified buyers</p>
                                                    </div>

                                                    {/* Summary */}
                                                    <div className="review__summary grid md:grid-cols-3 gap-6">
                                                        <div className="review__card review__rating">
                                                            {/* <div className="review__score">{productRating.toFixed(1)}</div> */}
                                                            <div className="review__score">5.0</div>
                                                            {/* {renderStars(Math.floor(productRating), 'lg')} */}
                                                            {/* <p className="review__base">Based on {totalReviews} reviews</p> */}
                                                            <p className="review__base">Based on 50 reviews</p>
                                                            <div className="review__status">
                                                                <TrendingUp className="review__status--icon" />
                                                                <span>Excellent Rating</span>
                                                            </div>
                                                        </div>

                                                        {/* Rating Breakdown */}
                                                        <div className="review__card review__breakdown md:col-span-2">
                                                            <h4 className="review__breakdown--title">Rating Breakdown</h4>
                                                            {add_Details?.reviews?.map(({ star, count, percentage }) => (
                                                                <div key={star} className="review__bar">
                                                                    <div className="review__bar--label">
                                                                        {star} <Star className="review__bar--star" />
                                                                    </div>
                                                                    {/* <Progress value={percentage} className="review__bar--progress" /> */}
                                                                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                                                                        <div
                                                                            className="bg-yellow-500 h-2.5 rounded-full"
                                                                            style={{ width: `${percentage}%` }}
                                                                        ></div>
                                                                    </div>

                                                                    <div className="review__bar--count">{count}</div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    {/* Review Stats */}
                                                    <div className="review__stats grid grid-cols-2 md:grid-cols-4 gap-4">
                                                        <div className="review__stat review__stat--recommend border-green-200">
                                                            <div className="review__scrore_text">{Math.round((add_Details?.reviews?.filter(r => r.rating >= 1).length / add_Details?.reviews?.length) * 100)}%</div>
                                                            <p className="text-[14px] font-semibold text-gray-600 font-medium">Recommend this</p>
                                                        </div>
                                                        <div className="review__stat review__stat--verified border-blue-200">
                                                            {/* <div className="review__scrore_text">{add_Details?.reviews?.filter(r => r.verified).length}</div> */}
                                                            <div className="review__scrore_text">4</div>
                                                            <p className="text-[14px] font-semibold text-gray-600 font-medium">Verified buyers</p>
                                                        </div>
                                                        <div className="review__stat review__stat--helpful border-purple-200">
                                                            {/* <div className="review__scrore_text">{(add_Details?.reviews?.reduce((sum, r) => sum + r.helpful, 0) / add_Details?.reviews?.length).toFixed(1)}</div> */}
                                                            <div className="review__scrore_text">9.4</div>
                                                            <p className="text-[14px] font-semibold text-gray-600 font-medium">Avg. helpful votes</p>
                                                        </div>
                                                        <div className="review__stat review__stat--total border-orange-200">
                                                            <div className="review__scrore_text">{add_Details?.reviews?.length}</div>
                                                            <p className="text-[14px] font-semibold text-gray-600 font-medium">Total reviews</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mt-8 mb-4">
                                                        {/* Left: Icon + Title */}
                                                        <div className="flex items-center gap-2">
                                                            <MessageCircle className="w-[20px] h-[20px] text-gray-700" />
                                                            <h2 className="text-lg font-semibold text-gray-900">Customer Reviews</h2>
                                                        </div>

                                                        {/* Right: Filter Button */}
                                                        <div className="px-3 py-1 border border-blue-300 text-[12px] text-blue-600 font-semibold rounded-full bg-blue-50 w-fit">
                                                            Most Recent
                                                        </div>
                                                    </div>



                                                    {/* Review List */}
                                                    <div className="review__list">
                                                        {add_Details?.reviews?.map((review, i) => (
                                                            <div className="review__item" key={i}>
                                                                <div className="review__avatar">
                                                                    <User />
                                                                </div>
                                                                <div className="review__content">
                                                                    <div className="review__meta">
                                                                        <div className="d-flex align-items-center">
                                                                            <h3>{review.user?.name || 'Anonymous'}</h3>
                                                                            {/* {review.verified && <span className="review__verified">Verified Purchase</span>} */}
                                                                            <span className="review__verified   ">Verified Purchase</span>
                                                                        </div>

                                                                        <span className="review__date">{new Date(review.updated_at).toLocaleDateString()}</span>
                                                                    </div>
                                                                    <div className="review__rating ">
                                                                        {renderStars(review.rating)}
                                                                    </div>
                                                                    <p className="review__comment border border-gray-100">"{review.text}"</p>
                                                                    <div className="review__actions">
                                                                        {/* <button
                                                                        onClick={() => toggleHelpful(review.id)}
                                                                        className={`review__helpful ${helpfulClicks[review.id] ? 'active' : ''}`}
                                                                    >
                                                                        <ThumbsUp /> Helpful ({review.helpful + (helpfulClicks[review.id] ? 1 : 0)})
                                                                    </button> */}
                                                                        <button
                                                                            // onClick={() => toggleHelpful(review.id)}
                                                                            className="review__helpful"
                                                                        >
                                                                            <ThumbsUp className="w-[14px] h-[14px]" /> Helpful (12)
                                                                        </button>
                                                                        <button className="review__reply">Reply</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>

                                                    {/* Load More */}
                                                    {add_Details?.reviews?.length > 3 && (
                                                        <div className="review__loadmore">
                                                            <button onClick={() => setShowAllReviews(!showAllReviews)}>
                                                                {showAllReviews ? 'Show Less Reviews' : `Load More Reviews (${add_Details.reviews.length - 3} more)`}
                                                            </button>
                                                        </div>
                                                    )}

                                                    {/* CTA */}
                                                    <div className="review__cta">
                                                        <h4>Have you used this product?</h4>
                                                        <p>Share your experience to help other customers</p>
                                                        <button className="review__cta--button">Write a Review</button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="product__tab--content">
                                                    <div className="product__tab--content__step">
                                                        <ul className="additional__info_list">
                                                            <li className="additional__info_list--item">
                                                                <span className="info__list--item-head"><strong>Part Number</strong></span>
                                                                <span className="info__list--item-content">{add_Details?.PN}</span>
                                                            </li>
                                                            <li className="additional__info_list--item">
                                                                <span className="info__list--item-head"><strong>Remark</strong></span>
                                                                <span className="info__list--item-content">{add_Details?.Remark}</span>
                                                            </li>
                                                            <li className="additional__info_list--item">
                                                                <span className="info__list--item-head"><strong>Guarantee</strong></span>
                                                                <span className="info__list--item-content">5 years</span>
                                                            </li>
                                                            <li className="additional__info_list--item">
                                                                <span className="info__list--item-head"><strong>Battery</strong></span>
                                                                <span className="info__list--item-content">10000 mAh</span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* Start product details tab End section */}

                </div>
            </div>
        </div>
    );
}
