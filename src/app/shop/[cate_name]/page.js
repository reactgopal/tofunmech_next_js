'use client'
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import 'react-modern-drawer/dist/index.css'
import Drawer from 'react-modern-drawer'
//import styles 👇
import { CgMenuGridR } from "react-icons/cg";
import { TfiMenuAlt } from "react-icons/tfi";
import { RxCross2 } from "react-icons/rx";
import { IoMdHeartEmpty } from "react-icons/io";

import { useEffect, useRef, useState } from "react";
import { Product, WishListLoginDelete } from '@/api/services/apiServices';
import { useDispatch, useSelector } from 'react-redux';
import { addProducts, addToWishlist, emptyProducts, removeProductWishlist } from '@/store/reducers/ProductSlice';
import InfiniteScroll from 'react-infinite-scroll-component';
import Link from 'next/link';
import { BsHeart, BsHeartFill } from 'react-icons/bs';

export default function ShopList() {
    const dispatch = useDispatch();
    const router = useRouter();
    const params = useParams();
    const user = JSON.parse(localStorage.getItem("USER"));
    const searchParams = useSearchParams()
    // find cate name like cate1,cate2,cate3
    const cate = searchParams.get('cate');
    // find category name like bolt,brake,tyre
    const cate_name = decodeURIComponent(params.cate_name);
    const { add_wish } = useSelector((state) => ({ ...state.products }));

    const [currentItems, setCurrentItems] = useState([]);
    const itemPerPage = 20;
    const [offset, setOffset] = useState(0);
    const [hasmore, setHasmore] = useState(true)

    const [isOpen, setIsOpen] = useState(false);
    const [loader, setLoader] = useState(false);
    const [gridOpen, setGridOpen] = useState(true);
    const [trifOpen, setTrifOpen] = useState(true);

    useEffect(() => {
        setLoader(true);
        dispatch(emptyProducts());
        const lists = localStorage.getItem("list");
        const grids = localStorage.getItem("grid");

        const storedSelectedValues = JSON.parse(
            localStorage.getItem("selectedValues")
        );
        if (storedSelectedValues) {
            setSelectedValues(storedSelectedValues);
        }
        if (lists) {
            setGridOpen(false);
            setTrifOpen(true);
        }
        if (grids) {
            setGridOpen(true);
            setTrifOpen(false);
        }
    }, []);
    const handleGridClick = () => {
        console.log("gridOpen")
        gridOpen ? setTrifOpen(false) : setGridOpen(true);
        localStorage.setItem("grid", gridOpen);
        localStorage.removeItem("list", trifOpen);
    };

    var productwishIdsArray = [];
    add_wish.forEach(function (obj) {
        console.log(obj, "obj")
        productwishIdsArray.push(obj.product_id);
    });
    console.log(add_wish, "add_wish");
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

    const handleTfiClick = () => {
        console.log("trifOpen")
        gridOpen ? setGridOpen(false) : setTrifOpen(true);
        localStorage.setItem("list", trifOpen);
        localStorage.removeItem("grid", gridOpen);
    };

    useEffect(() => {
        fetchCategoriesList();
    }, []);
    const fetchCategoriesList = () => {
        const data = {
            [cate]: cate_name,
            offset: offset,
            limit: itemPerPage
        }
        console.log(data, "data of fetchCategoriesList");
        Product(data).then((res) => {
            console.log(res);
            if (res.success = true) {
                dispatch(addProducts(res?.data));
                setCurrentItems([...currentItems, ...res.data]);
                if (res.data.length === 0 || res.data.length < 20) {
                    setHasmore(false)
                } else {
                    // setOffset(offset + 20);
                    setOffset(offset + 1);
                }
            } else {
                router.push("*");
            }
        }).catch((e) => {
            console.log(e);
            alert(e);
        })
    }

    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState)
    }

    return (
        <div>
            <div className="shop-list-header">
                <div className="custom-container position-relative mx-auto">
                    <div className="bg-overlay rounded-4 overflow-hidden">
                        <img src="/assets/img/pageHeader/banner1.png" alt="Carento" />
                    </div>
                    <div className="container position-absolute z-1 top-50 start-50 pb-70 translate-middle text-center">
                        <span className="shop-list-header__subtitle text-sm-bold rounded-4">Find cars for sale and for rent near you</span>
                        <h2>
                            Find the Perfect Part at the
                            <br />
                            Best Price for Your Vehicle's Comfort
                        </h2>
                    </div>
                    <div className="shop-list__breadcrumb navigation-page">
                        <a className="neutral-700 text-md-medium" href="/">Home</a>
                        <span className="@@ds-prev-page">
                            <img src="/assets/img/icons/arrow-right.svg" alt="Carento" />
                        </span>
                        <a className="neutral-1000 text-md-bold" href="#">Shop</a>
                        <span>
                            <img src="/assets/img/icons/arrow-right.svg" alt="Carento" />
                        </span>
                        <a className="neutral-1000 text-md-bold text-nowrap" href="#">All items</a>
                    </div>
                </div>
            </div>
            <section className="shop-list-header__text">
                <div className="container">
                    <div className="row align-items-end">
                        <div className="col-md-9 mb-30 ">
                            <h4 className="shop-list-header__title">Latest Products</h4>
                            <p className="shop-list-header__subtitle">Experience The Best Car Services In Carento</p>
                        </div>
                    </div>
                </div>
            </section>
            {/* shop list section */}
            <section className="shop-list-box-section ">
                <div className="container">
                    <div className="box-content-main pt-4">
                        <div className="content-right">
                            <div className="shop-list-toolbar">
                                <div className="row align-items-center">
                                    <div className="shop-list-toolbar__left col-xl-4 col-md-4 mb-10 text-lg-start text-center">
                                        <div className="shop-list-toolbar__view-options">
                                            <button
                                                className={`shop-list-toolbar__view-icon ${gridOpen == true ? "active" : ""
                                                    } `}
                                                // className="shop-list-toolbar__view-icon"
                                                aria-label="grid btn"
                                                data-toggle="tab"
                                                data-target="#product_grid"
                                                onClick={handleGridClick}
                                                title="Grid"
                                            >
                                                <CgMenuGridR style={{ color: "black" }} />
                                            </button>
                                            <button
                                                className={`shop-list-toolbar__view-icon ${gridOpen == true ? "" : "active"
                                                    }`}
                                                // className="shop-list-toolbar__view-icon"
                                                aria-label="list btn"
                                                data-toggle="tab"
                                                data-target="#product_list"
                                                onClick={handleTfiClick}
                                                title="List"
                                            >
                                                <TfiMenuAlt style={{ color: "black" }} />
                                            </button>
                                            <span className="shop-list-toolbar__result-count">64 items found</span>
                                        </div>
                                    </div>
                                    <div className="shop-list-toolbar__right col-xl-8 col-md-8 mb-10 text-lg-end text-center">
                                        <div className="shop-list-toolbar__controls">
                                            <a className="shop-list-toolbar__sort-btn" href="#">
                                                <svg width={18} height={18} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M8.25 6L5.25 3M5.25 3L2.25 6M5.25 3L5.25 15" stroke="#101010" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M9.75 12L12.75 15M12.75 15L15.75 12M12.75 15L12.75 3" stroke="#101010" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </a>

                                            <div className="shop-list-toolbar__dropdown">
                                                <span className="shop-list-toolbar__label">Show</span>
                                                <div className="dropdown">
                                                    <button className="btn dropdown-toggle" id="dropdownShow" data-bs-toggle="dropdown" aria-expanded="false">
                                                        <span>20</span>
                                                    </button>
                                                    <ul className="dropdown-menu" aria-labelledby="dropdownShow">
                                                        <li><a className="dropdown-item active" href="#">20</a></li>
                                                        <li><a className="dropdown-item" href="#">30</a></li>
                                                        <li><a className="dropdown-item" href="#">50</a></li>
                                                    </ul>
                                                </div>
                                            </div>

                                            <div className="shop-list-toolbar__dropdown">
                                                <span className="shop-list-toolbar__label">Sort by:</span>
                                                <div className="dropdown ">
                                                    <button className="btn dropdown-toggle" id="dropdownSort" data-bs-toggle="dropdown" aria-expanded="false">
                                                        <span>Most Viewed</span>
                                                    </button>

                                                    <ul className="dropdown-menu" aria-labelledby="dropdownSort">
                                                        <li><a className="dropdown-item active" href="#">Most Viewed</a></li>
                                                        <li><a className="dropdown-item" href="#">Recently search</a></li>
                                                        <li><a className="dropdown-item" href="#">Most popular</a></li>
                                                        <li><a className="dropdown-item" href="#">Top rated</a></li>
                                                    </ul>
                                                </div>
                                                <button className="filter_btn d-block d-lg-none" onClick={toggleDrawer}>
                                                    Filter
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="shop-list-products">
                                <InfiniteScroll
                                    style={{ overflow: "hidden" }}
                                    dataLength={currentItems.length}
                                    next={fetchCategoriesList}
                                    hasMore={hasmore}
                                    endMessage={
                                        <p style={{ textAlign: "center", marginTop: "20px", fontWeight: "bold" }}>
                                            Yay! You have seen it all
                                        </p>
                                    }
                                    loader={
                                        <h4 style={{ textAlign: "center", marginTop: "20px", fontWeight: "bold" }}>
                                            Loading...
                                        </h4>
                                    }
                                >
                                    {
                                        gridOpen ? (
                                            <>
                                                <div className="row">
                                                    {currentItems && currentItems?.map((e, index) => {
                                                        return (
                                                            <div key={index} className="col-lg-4 col-md-6">
                                                                <div className="shop-list-products__card">
                                                                    <div className="shop-list-products__image">
                                                                        {
                                                                            user?.success === true ? (
                                                                                <>
                                                                                    {productwishIdsArray.includes(e?.id) ? (
                                                                                        <span className="shop-list-products__wishlist">
                                                                                            <BsHeartFill
                                                                                                style={{ cursor: "pointer", fontSize: "20px" }}
                                                                                                onClick={() => removeElement(e?.id)}
                                                                                            />
                                                                                        </span>
                                                                                    ) : (
                                                                                        <span className="shop-list-products__wishlist">
                                                                                            <IoMdHeartEmpty
                                                                                                style={{ cursor: "pointer", fontSize: "20px" }}
                                                                                                onClick={() => handleWish(e?.id)}
                                                                                            />
                                                                                        </span>
                                                                                    )}
                                                                                </>
                                                                            ) : (
                                                                                <>
                                                                                    <a href="/login" rel="noopener noreferrer">
                                                                                        <span className="shop-list-products__wishlist">
                                                                                            <IoMdHeartEmpty
                                                                                                // style={{ cursor: "pointer", fontSize: "20px" }}
                                                                                                className='text-black' style={{ color: "black" }}
                                                                                            />
                                                                                        </span>
                                                                                    </a>
                                                                                </>
                                                                            )
                                                                        }
                                                                        {/* <span className="shop-list-products__wishlist">
                                                                            <IoMdHeartEmpty className='text-black' style={{ color: "black" }} />
                                                                        </span> */}
                                                                        <img
                                                                            src={e?.image}
                                                                            alt="Carento"
                                                                        />
                                                                    </div>
                                                                    <Link href={`/productsdetail/${e?.id}/${e?.PN}`}>
                                                                        <div className="shop-list-products__info">
                                                                            {/* <div className="shop-list-products__rating">
                                                                            <span className="shop-list-products__rating-value">
                                                                                4.9 5 <span className="text-xs-medium neutral-500">(672 reviews)</span>
                                                                            </span>
                                                                        </div>   */}
                                                                            <div className="shop-list-products__title">
                                                                                <span href="/shop-details">
                                                                                    {/* {e.Description} */}
                                                                                    <br></br>
                                                                                    {e?.name}
                                                                                </span>
                                                                            </div>
                                                                            <div className="shop-list-products__old-price">
                                                                                <h6>45</h6>
                                                                                <span href="#"><img src="/assets/img/shop-list/stock.png" alt="Carento" /></span>
                                                                            </div>
                                                                            <div className="shop-list-products__bottom">
                                                                                <h6 className="shop-list-products__price">{e?.price}</h6>
                                                                                {/* <a className="" href={`/productsdetail/${e?.id}/${e?.PN}`}>View Details</a> */}
                                                                                <button>
                                                                                    View Details
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </Link>
                                                                </div>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div className="row">
                                                    {currentItems?.map((e, index) => (
                                                        <div key={index} className="col-xl-12 col-lg-12">
                                                            <div className="car-list-card d-flex align-items-center">
                                                                <div className="car-list-card__image">
                                                                    <img src={e?.image} alt={e?.name} />
                                                                </div>
                                                                <div className="car-list-card__content">
                                                                    {/* <div className="shop-list-products__rating">
                                                                        <span className="shop-list-products__rating-value d-flex justify-content-start">
                                                                            4.9 5 <span className="text-xs-medium neutral-500">(672 reviews)</span>
                                                                        </span>
                                                                    </div> */}
                                                                    <div className="car-list-card__top d-flex justify-content-between">
                                                                        <div>
                                                                            <h4 className='text-black'>{e?.name}</h4>
                                                                            <p className="location">📍 Manchester, England</p>
                                                                        </div>
                                                                    </div>
                                                                    <div className="features d-flex flex-wrap">
                                                                    </div>
                                                                    <div className="car-list-card__bottom d-flex justify-content-between align-items-center">
                                                                        {/* <h3 className="price">${e?.price} <span>/ night</span></h3> */}
                                                                        <h6 className="shop-list-products__price">{e?.price}/-</h6>

                                                                        <a className="btn btn-gray" href="/shop-details">View Details</a>

                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>

                                            </>
                                        )
                                    }
                                </InfiniteScroll>
                            </div>
                            {/* <nav className="shop-list-pagination" aria-label="Page navigation">
                                <ul className="shop-list-pagination__list">
                                    <li className="shop-list-pagination__item">
                                        <a className="shop-list-pagination__link" aria-label="Previous" href="#">
                                            <span aria-hidden="true">
                                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M6.00016 1.33325L1.3335 5.99992M1.3335 5.99992L6.00016 10.6666M1.3335 5.99992H10.6668"
                                                        stroke="#101010" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </span>
                                        </a>
                                    </li>
                                    {[1, 2, 3, 4, 5].map((page) => (
                                        <li key={page} className="shop-list-pagination__item">
                                            <a className={`shop-list-pagination__link${page === 2 ? ' active' : ''}`} href="#">
                                                {page}
                                            </a>
                                        </li>
                                    ))}
                                    <li className="shop-list-pagination__item">
                                        <a className="shop-list-pagination__link" href="#">...</a>
                                    </li>
                                    <li className="shop-list-pagination__item">
                                        <a className="shop-list-pagination__link" aria-label="Next" href="#">
                                            <span aria-hidden="true">
                                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M5.99967 10.6666L10.6663 5.99992L5.99968 1.33325M10.6663 5.99992L1.33301 5.99992"
                                                        stroke="#101010" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </span>
                                        </a>
                                    </li>
                                </ul>
                            </nav> */}

                        </div>
                        {/* filter area code  */}
                        <div className="content-left order-lg-first d-none d-lg-block">
                            <div className="shop-list-filter-price ">
                                <div className="shop-list-filter-price__wrapper">
                                    <div className="shop-list-filter-price__block">
                                        <h6 className="shop-list-filter-price__title">Filter Price</h6>
                                        <div className="shop-list-filter-price__collapse">
                                            <div className="shop-list-filter-price__padding">
                                                <div className="shop-list-filter-price__slider">
                                                    <div id="slider-range"></div>
                                                    <div className="shop-list-filter-price__value-range">
                                                        <span className="shop-list-filter-price__value">$0</span>
                                                        <span className="shop-list-filter-price__value">$500</span>
                                                    </div>
                                                    <input className="shop-list-filter-price__input" type="hidden" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="shop-list-filter-price__footer">
                                            <a className="shop-list-filter-price__clear" href="#">
                                                <div className="shop-list-filter-price__icon">
                                                    <RxCross2 />
                                                </div>
                                                <span className="shop-list-filter-price__clear-text">Clear</span>
                                            </a>
                                            <a className="shop-list-filter-price__apply" href="#">
                                                {/* <img src="/assets/imgs/template/icons/user.svg" alt="Carento" /> */}
                                                Apply
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="shop-list-filter-categories">
                                <div className="shop-list-filter-categories__wrapper">
                                    <div className="shop-list-filter-categories__block">
                                        <h6 className="shop-list-filter-categories__title">Categories</h6>
                                        <div className="shop-list-filter-categories__collapse">
                                            <ul className="shop-list-filter-categories__checkbox-list">
                                                <li>
                                                    <label className="shop-list-filter-categories__checkbox">
                                                        <input type="checkbox" />
                                                        <span className="shop-list-filter-categories__label">Accessories</span>
                                                        {/* <span className="shop-list-filter-categories__checkmark" /> */}
                                                    </label>
                                                    {/* <span className="shop-list-filter-categories__count">198</span> */}
                                                </li>
                                                <li>
                                                    <label className="shop-list-filter-categories__checkbox">
                                                        <input type="checkbox" />
                                                        <span className="shop-list-filter-categories__label">Automotive Rims</span>
                                                        {/* <span className="shop-list-filter-categories__checkmark" /> */}
                                                    </label>
                                                    {/* <span className="shop-list-filter-categories__count">32</span> */}
                                                </li>
                                                <li>
                                                    <label className="shop-list-filter-categories__checkbox">
                                                        <input type="checkbox" />
                                                        <span className="shop-list-filter-categories__label">Brakes</span>
                                                        {/* <span className="shop-list-filter-categories__checkmark" /> */}
                                                    </label>
                                                    {/* <span className="shop-list-filter-categories__count">13</span> */}
                                                </li>
                                                <li>
                                                    <label className="shop-list-filter-categories__checkbox">
                                                        <input type="checkbox" />
                                                        <span className="shop-list-filter-categories__label">Detailing</span>
                                                        {/* <span className="shop-list-filter-categories__checkmark" /> */}
                                                    </label>
                                                    {/* <span className="shop-list-filter-categories__count">23</span> */}
                                                </li>
                                                <li>
                                                    <label className="shop-list-filter-categories__checkbox">
                                                        <input type="checkbox" />
                                                        <span className="shop-list-filter-categories__label">Headlight</span>
                                                        {/* <span className="shop-list-filter-categories__checkmark" /> */}
                                                    </label>
                                                    {/* <span className="shop-list-filter-categories__count">35</span> */}
                                                </li>
                                                <li>
                                                    <label className="shop-list-filter-categories__checkbox">
                                                        <input type="checkbox" />
                                                        <span className="shop-list-filter-categories__label">Tires &amp; Wheels</span>
                                                        {/* <span className="shop-list-filter-categories__checkmark" /> */}
                                                    </label>
                                                    {/* <span className="shop-list-filter-categories__count">56</span> */}
                                                </li>
                                                <li>
                                                    <label className="shop-list-filter-categories__checkbox">
                                                        <input type="checkbox" />
                                                        <span className="shop-list-filter-categories__label">Auto Safety &amp; Security</span>
                                                        {/* <span className="shop-list-filter-categories__checkmark" /> */}
                                                    </label>
                                                    {/* <span className="shop-list-filter-categories__count">76</span> */}
                                                </li>
                                            </ul>

                                            <div className="shop-list-filter-categories__see-more">
                                                <a className="shop-list-filter-categories__see-more-link" href="#">
                                                    See more
                                                    <svg width={8} height={6} viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M7.89553 1.02367C7.75114 0.870518 7.50961 0.864815 7.35723 1.00881L3.9998 4.18946L0.642774 1.00883C0.490387 0.86444 0.249236 0.870534 0.104474 1.02369C-0.0402885 1.17645 -0.0338199 1.4176 0.118958 1.56236L3.73809 4.99102C3.81123 5.06036 3.90571 5.0954 3.9998 5.0954C4.0939 5.0954 4.18875 5.06036 4.26191 4.99102L7.88104 1.56236C8.03382 1.41758 8.04029 1.17645 7.89553 1.02367Z" fill="#101010" />
                                                    </svg>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="shop-list-filter-brands">
                                <div className="shop-list-filter-brands__wrapper">
                                    <div className="shop-list-filter-brands__block">
                                        <h6 className="shop-list-filter-brands__title">Brands</h6>
                                        <div className="shop-list-filter-brands__collapse">
                                            <ul className="shop-list-filter-brands__checkbox-list">
                                                {[
                                                    { label: 'All', count: 32 },
                                                    { label: 'Honda', count: 13 },
                                                    { label: 'Hyundai', count: 23 },
                                                    { label: 'Jaguar', count: 23 },
                                                    { label: 'Lexus', count: 35 },
                                                    { label: 'Lotus', count: 56 },
                                                    { label: 'Toyota', count: 76 },
                                                ].map((brand, index) => (
                                                    <li key={index}>
                                                        <label className="shop-list-filter-brands__checkbox">
                                                            <input type="checkbox" />
                                                            <span className="shop-list-filter-brands__label">{brand.label}</span>
                                                            {/* <span className="shop-list-filter-brands__checkmark" /> */}
                                                        </label>
                                                        {/* <span className="shop-list-filter-brands__count">{brand.count}</span> */}
                                                    </li>
                                                ))}
                                            </ul>

                                            <div className="shop-list-filter-brands__see-more">
                                                <a className="shop-list-filter-brands__see-more-link" href="#">
                                                    See more
                                                    <svg width={8} height={6} viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M7.89553 1.02367C7.75114 0.870518 7.50961 0.864815 7.35723 1.00881L3.9998 4.18946L0.642774 1.00883C0.490387 0.86444 0.249236 0.870534 0.104474 1.02369C-0.0402885 1.17645 -0.0338199 1.4176 0.118958 1.56236L3.73809 4.99102C3.81123 5.06036 3.90571 5.0954 3.9998 5.0954C4.0939 5.0954 4.18875 5.06036 4.26191 4.99102L7.88104 1.56236C8.03382 1.41758 8.04029 1.17645 7.89553 1.02367Z"
                                                            fill="#101010"
                                                        />
                                                    </svg>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="shop-list-filter-fuel">
                                <div className="shop-list-filter-fuel__wrapper">
                                    <div className="shop-list-filter-fuel__block">
                                        <h6 className="shop-list-filter-fuel__title">Fuel Type</h6>
                                        <div className="shop-list-filter-fuel__collapse">
                                            <ul className="shop-list-filter-fuel__checkbox-list">
                                                {[
                                                    { label: 'All', count: 32 },
                                                    { label: 'Plug-in Hybrid (PHEV)', count: 13 },
                                                    { label: 'Hybrid (HEV)', count: 23 },
                                                    { label: 'Electric Vehicle (EV)', count: 23 },
                                                    { label: 'Diesel', count: 35 },
                                                    { label: 'Gasoline/Petrol', count: 56 },
                                                    { label: 'Hydrogen', count: 76 },
                                                ].map((fuel, index) => (
                                                    <li key={index}>
                                                        <label className="shop-list-filter-fuel__checkbox">
                                                            <input type="checkbox" />
                                                            <span className="shop-list-filter-fuel__label">{fuel.label}</span>
                                                            {/* <span className="shop-list-filter-fuel__checkmark" /> */}
                                                        </label>
                                                        {/* <span className="shop-list-filter-fuel__count">{fuel.count}</span> */}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="shop-list-filter-review">
                                <div className="shop-list-filter-review__wrapper">
                                    <div className="shop-list-filter-review__block">
                                        <h6 className="shop-list-filter-review__title">Review Score</h6>
                                        <div className="shop-list-filter-review__collapse">
                                            <ul className="shop-list-filter-review__checkbox-list">
                                                {[
                                                    ['yellow', 'yellow', 'yellow', 'yellow', 'yellow'],
                                                    ['yellow', 'yellow', 'yellow', 'yellow', 'grey'],
                                                    ['yellow', 'yellow', 'yellow', 'grey', 'grey'],
                                                    ['yellow', 'yellow', 'grey', 'grey', 'grey'],
                                                    ['yellow', 'grey', 'grey', 'grey', 'grey'],
                                                ].map((stars, index) => (
                                                    <li key={index}>
                                                        <label className="shop-list-filter-review__checkbox">
                                                            <input type="checkbox" />
                                                            <span className="shop-list-filter-review__stars">
                                                                {stars.map((color, i) => (
                                                                    <img
                                                                        key={i}
                                                                        src={`/assets/img/icons/star-${color}.svg`}
                                                                        alt="Star"
                                                                    />
                                                                ))}
                                                            </span>
                                                            {/* <span className="shop-list-filter-review__checkmark" /> */}
                                                        </label>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

            <Drawer
                open={isOpen}
                onClose={toggleDrawer}
                direction='left'
                className='bla bla bla'
            >
                <div className="single__widget price__filter widget__bg ">
                    <div className="d-flex justify-content-between">
                        <h2>Filters</h2>
                        <a
                            // onClick={handleReset}
                            // onClick={() => handleResetFilter()}
                            className="ms-5 mt-1"
                            style={{ textDecoration: "underline", color: "red" }}
                        >
                            Reset
                        </a>
                    </div>
                    <form
                        //  onSubmit={handleFinalfilterClick} 
                        style={{ marginBottom: "100px" }}>
                        <div>
                            <h3 className="mt-4">Origin</h3>
                            <div className="d-flex align-items-center">
                                <input type='radio' name="oem" value={"aftermarket"}
                                // checked={origin === 'aftermarket'} onChange={() => setOrigin('aftermarket')}
                                />
                                &nbsp;&nbsp;
                                <p className="mt-1">Aftermarket</p>
                            </div>
                            <div className="d-flex align-items-center">
                                <input type='radio' name="oem" value="oem"
                                // checked={origin === 'oem'} onChange={() => setOrigin('oem')}
                                />
                                &nbsp;&nbsp;
                                <p className="mt-1">OEM </p>
                            </div>
                        </div>
                        <div className="mt-4">
                            {/* <div className="d-flex justify-content-between">
                                        <h3 className="mt-1">Vehicle</h3>
                                        <a onClick={handleReset} style={{ color: "#12477a" }}>
                                        Reset
                                        </a>
                                    </div> */}
                            <div className="mt-3 mb-3">
                                <select
                                    className="vehicle_select_model"
                                // onChange={(e) => setCompany(e.target.value)}
                                // value={company || ""}

                                >
                                    <option selected value={""}>
                                        Choose Car Maker
                                    </option>
                                    {/* {carName.map((e, index) => {
                                        return (
                                            <option value={e?.id} key={index}  >
                                                {e?.name}
                                            </option>
                                        );
                                    })} */}
                                </select>
                            </div>
                        </div>
                        <div className="mt-4">
                            <h3>Price</h3>
                            <div className="form_filter">
                                <label>
                                    From
                                    <input
                                        type="number"
                                        placeholder="0"
                                    // value={price.price_start}
                                    // value={Stprice || ""}
                                    // onChange={(e) => setStPrice(e.target.value)}
                                    // onChange={handlePriceChange}
                                    />
                                </label>
                                <label>
                                    To
                                    <input
                                        type="number"
                                        placeholder="250"
                                    // value={endPrice || ""}
                                    // onChange={(e) => setEndPrice(e.target.value)}
                                    />
                                </label>
                            </div>
                            <div className="form_filter_btn">
                                <button>Filter</button>
                            </div>
                        </div>
                    </form>
                </div>
            </Drawer>
        </div >
    );
}
