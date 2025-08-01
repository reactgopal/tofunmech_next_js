'use client'
import { useParams, useRouter, useSearchParams } from 'next/navigation';

import Drawer from 'react-modern-drawer'
import { useEffect, useState } from "react";
import { CarCompanies, Product, WishListLoginDelete } from '@/api/services/apiServices';
import { useDispatch, useSelector } from 'react-redux';
import { addProducts, addToWishlist, emptyProducts, removeProductWishlist } from '@/store/reducers/ProductSlice';
import InfiniteScroll from 'react-infinite-scroll-component';
import Link from 'next/link';
import Breadcrumbs from '@/utils/Breadcrumbs';

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";

//import styles 👇
import { CgMenuGridR } from "react-icons/cg";
import { TfiMenuAlt } from "react-icons/tfi";
import { RxCross2 } from "react-icons/rx";
import { IoMdHeartEmpty } from "react-icons/io";
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { findCategoryById } from '@/utils/helpers';
import { motion } from 'framer-motion';
import NotFound from '@/app/not-found';
import NoDataFound from '@/utils/NoDataFound';
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
    const { categories, status } = useSelector((state) => state.categories);

    const [currentItems, setCurrentItems] = useState([]);
    const itemPerPage = 20;
    const [offset, setOffset] = useState(0);
    const [hasmore, setHasMore] = useState(true)
    const [carName, setCarName] = useState([]);

    // filter state 
    const [filterData, setFilterData] = useState({});
    const [origin, setOrigin] = useState(null);
    const [company, setCompany] = useState(null);
    const [Stprice, setStPrice] = useState(null);
    const [endPrice, setEndPrice] = useState(null);
    const [sortBy, setSortBy] = useState({ key: "price", order: "ASC", });
    console.log(origin, "origin");

    // drower and mange state
    const [isOpen, setIsOpen] = useState(false);
    const [loader, setLoader] = useState(false);
    const [selectedValues, setSelectedValues] = useState();
    const [gridOpen, setGridOpen] = useState(true);
    const [trifOpen, setTrifOpen] = useState(true);
    const [expanded, setExpanded] = useState(false);

    if (!cate) {
        return <div><NotFound /></div>; // or return a loading image
    }

    const currentCategoryId = params ? params[params.length - 1] : null;
    const subCategory = findCategoryById(categories, currentCategoryId);

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
        // console.log(obj, "obj")
        productwishIdsArray.push(obj.product_id);
    });
    // console.log(add_wish, "add_wish");
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
        CarCompanies().then((res) => {
            setCarName(res?.data);
        });
    }, []);
    const fetchCategoriesList = (customOffset = offset, isFilter = false) => {
        setLoader(true);
        const data = {
            [cate]: cate_name,
            // offset: offset,
            offset: customOffset,
            limit: itemPerPage,
            type: origin,
            company_id: company,
            price_start: Stprice,
            price_end: endPrice,
            // sort_action: sortOrder,
            // sort_by: sortKey,
        }
        console.log(data, "data of fetchCategoriesList");

        Product(data).then((res) => {
            setLoader(false);
            if (res.success === true) {
                const fetchedData = res?.data || [];

                if (isFilter) {
                    dispatch(emptyProducts());                      // 👈 Clear Redux product list
                    dispatch(addProducts(fetchedData));             // 👈 Add new filtered products
                    setCurrentItems(fetchedData);                   // 👈 Set filtered results locally
                    setOffset(1);
                    console.log("first time")                                // 👈 Reset offset for next scroll
                } else {
                    dispatch(addProducts(fetchedData));
                    setCurrentItems((prev) => [...prev, ...fetchedData]);
                    // setOffset((prevOffset) => prevOffset + 1);
                    setOffset(customOffset + 1); // ✅ Increment correctly

                    console.log("second time")                                // 👈 Reset offset for next scroll
                }

                if (fetchedData.length === 0 || fetchedData.length < itemPerPage) {
                    setHasMore(false);
                } else {
                    setHasMore(true);
                }
            } else {
                setLoader(false);

                // console.log("No categories found.");

                // <p>No categories found.</p>;
                // router.push("*");
            }
        }).catch((e) => {
            console.error(e);
            alert("Something went wrong while fetching products.");
        });
        // Product(data).then((res) => {
        //     console.log(res);
        //     if (res.success === true) {
        //         dispatch(addProducts(res?.data));
        //         setCurrentItems([...currentItems, ...res.data]);
        //         if (res.data.length === 0 || res.data.length < 20) {
        //             setHasMore(false)
        //         } else {
        //             // setOffset(offset + 20);
        //             setOffset(offset + 1);
        //         }
        //     } else {
        //         router.push("*");
        //     }
        // }).catch((e) => {
        //     console.log(e);
        //     alert(e);
        // })
    }
    const handleFinalFilterClick = (e) => {
        e.preventDefault();
        // Clear products, reset scroll and offset
        setOffset(0);
        setCurrentItems([]);
        setHasMore(true);
        setIsOpen(false);

        // Use a timeout or callback to ensure state is updated before fetching
        fetchCategoriesList(0, true);
    }
    const sortClick = (value) => {
        const [key, order] = value.split(",");
        // e.preventDefault();
        setSortBy({ key, order });
        setOffset(0);
        setCurrentItems([]);
        setHasMore(true);
        fetchCategoriesList(0, true);
    }
    const handleResetFilter = () => {
        setOrigin(null);
        setCompany(null);
        setStPrice(null);
        setEndPrice(null);
        // setOffset(0);
        setCurrentItems([]);
        setHasMore(true);
        setIsOpen(false);

        fetchCategoriesList(0, true);
    }
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState);
    };

    return (
        <div className=''>
            <div className="shop-list-header  d-none d-md-block">
                <div className="custom-container position-relative mx-auto">
                    <div className="bg-overlay rounded-4 overflow-hidden">
                        <img src="/assets/img/pageHeader/banner1.png" alt="Carento" />
                    </div>
                    <div className="container position-absolute z-1 top-50 start-50 pb-[20px] translate-middle text-center">
                        <span className="shop-list-header__subtitle text-sm-bold rounded-4">Find cars for sale and for rent near you</span>
                        <h2>
                            Find the Perfect Part at the
                            <br />
                            Best Price for Your Vehicle's Comfort
                        </h2>
                    </div>
                    <div className="shop-list__breadcrumb navigation-page">
                        {/* <a className="neutral-700 text-md-medium" href="/">Home</a>
                        <span className="@@ds-prev-page">
                            <img src="/assets/img/icons/arrow-right.svg" alt="Carento" />
                        </span>
                        <a className="neutral-1000 text-md-bold" href="#">Shop</a>
                        <span>
                            <img src="/assets/img/icons/arrow-right.svg" alt="Carento" />
                        </span>
                        <a className="neutral-1000 text-md-bold text-nowrap" href="#">All items</a> */}
                        <Breadcrumbs />
                    </div>
                </div>
            </div>
            <section className="shop-list-header__text">
                <div className="container">
                    <div className="row align-items-end">
                        <div className="col-md-9 mb-30 ">
                            <div className="d-block d-md-none">
                                <Breadcrumbs />
                            </div>
                            <div>
                                <h4 className="shop-list-header__title">Latest Products</h4>
                                <p className="text-[18px] text-bold neutral-500 ">Experience The Best Car Services In Carento</p>
                            </div>
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
                                            {/* <span className="shop-list-toolbar__result-count">64 items found</span> */}
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

                                            {/* <div className="shop-list-toolbar__dropdown">
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
                                            </div> */}

                                            <div className="product-sort-wrapper d-flex align-items-center">
                                                <label htmlFor="sortSelect" className="product-sort-label">
                                                    Sort By:
                                                </label>
                                                <div className="product-sort-select-wrapper">
                                                    <select
                                                        id="sortSelect"
                                                        className="product-sort-select"
                                                    // onChange={(e) => sortClick(e.target.value)}
                                                    // value={`${sortBy.key},${sortBy.order}`}
                                                    >
                                                        <option value="price,ASC">LOW TO HIGH</option>
                                                        <option value="price,DESC">HIGH TO LOW</option>
                                                        <option value="latest,ASC">OLD TO NEW</option>
                                                        <option value="latest,DESC">NEW TO OLD</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <button
                                                onClick={toggleDrawer}
                                                className="d-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black border border-gray-300 shadow-sm hover:shadow-md hover:bg-gray-100 transition-all duration-200 d-block d-lg-none"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L15 13.414V19a1 1 0 01-1.447.894l-4-2A1 1 0 019 17v-3.586L3.293 6.707A1 1 0 013 6V4z" />
                                                </svg>
                                                <span className="font-medium text-[12px]">Filter</span>
                                            </button>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="shop-list-products">
                                {loader && currentItems.length === 0 ? (
                                    // Initial loading
                                    <h4 style={{ textAlign: "center", marginTop: "20px", fontWeight: "bold" }}>
                                        Loading...
                                    </h4>
                                ) : currentItems.length === 0 ? (
                                    // Empty state
                                    <div className="text-center text-muted fw-bold text-black">
                                        <NoDataFound />
                                    </div>
                                ) : (
                                    <InfiniteScroll
                                        style={{ overflow: "hidden" }}
                                        dataLength={currentItems.length}
                                        next={() => fetchCategoriesList(offset)}  // ✅ Correctly controlled call
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
                                                                    <div

                                                                        className="shop-list-products__card">
                                                                        <motion.div
                                                                            initial={{
                                                                                opacity: 0, y: 100
                                                                            }}
                                                                            animate={{
                                                                                opacity: 1, y: 0
                                                                            }}
                                                                            transition={{
                                                                                duration: 1,
                                                                                delay: 0
                                                                            }}
                                                                            className="shop-list-products__image">
                                                                            {
                                                                                user?.success === true ? (
                                                                                    <>
                                                                                        {productwishIdsArray.includes(e?.id) ? (
                                                                                            <span className="shop-list-products__wishlist">
                                                                                                <BsHeartFill
                                                                                                    style={{ cursor: "pointer", fontSize: "20px", color: "black" }}
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
                                                                                                    style={{ cursor: "pointer", fontSize: "20px" }}
                                                                                                    className='text-black'
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
                                                                        </motion.div>
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
                                                                <div className="car-list-card d-flex align-items-center position-relative">
                                                                    <div className="car-list-card__image">
                                                                        <img src={e?.image} alt={e?.name} />
                                                                    </div>
                                                                    <div className="car-list-card__content">
                                                                        <div className="shop-list-products__rating">
                                                                            {/* <span className="shop-list-products__rating-value"> */}
                                                                            {/* 4.9 5 <span className="text-xs-medium neutral-500">(672 reviews)</span> */}
                                                                            {/* <BsHeart /> */}
                                                                            {/* </span> */}
                                                                            {
                                                                                user?.success === true ? (
                                                                                    <>
                                                                                        {productwishIdsArray.includes(e?.id) ? (
                                                                                            <span className="shop-list-products__rating-value">
                                                                                                <BsHeartFill
                                                                                                    style={{ cursor: "pointer", fontSize: "20px", color: "black" }}
                                                                                                    onClick={() => removeElement(e?.id)}
                                                                                                />
                                                                                            </span>
                                                                                        ) : (
                                                                                            <span className="shop-list-products__rating-value">
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
                                                                                            <span className="shop-list-products__rating-value">
                                                                                                <IoMdHeartEmpty
                                                                                                    // style={{ cursor: "pointer", fontSize: "20px" }}
                                                                                                    className='text-black' style={{ color: "black" }}
                                                                                                />
                                                                                            </span>
                                                                                        </a>
                                                                                    </>
                                                                                )
                                                                            }
                                                                        </div>
                                                                        <Link href={`/productsdetail/${e?.id}/${e?.PN}`}>
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
                                                                                <button>
                                                                                    View Details
                                                                                </button>
                                                                                {/* <a className="btn btn-gray" href="/shop-details">View Details</a> */}

                                                                            </div>
                                                                        </Link>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>

                                                </>
                                            )
                                        }
                                    </InfiniteScroll>
                                )}
                            </div>


                        </div>
                        {/* filter area code  */}
                        <div className="content-left order-lg-first d-none d-lg-block shop__sidebar--widget">
                            <div className="shop-list-filter-categories">
                                <div className="shop-list-filter-categories__wrapper">
                                    <div className="d-flex justify-content-between">
                                        <h2 className='text-black'>Filters</h2>
                                        <a
                                            // onClick={handleReset}
                                            onClick={() => handleResetFilter()}
                                            className="ms-5 mt-1"
                                            style={{ textDecoration: "underline", color: "red" }}
                                        >
                                            Reset
                                        </a>
                                    </div>
                                    <hr />
                                    <div className="filter-box">
                                        <form onSubmit={handleFinalFilterClick}>
                                            {/* Origin Section */}
                                            <div className="filter-section">
                                                <h6 className="filter-title">Origin</h6>
                                                <label className="radio-label">
                                                    <input type="radio" name="origin" checked={origin === 'oem'} onChange={() => setOrigin('oem')} />
                                                    <span>OEM</span>
                                                </label>
                                                <select name="carMaker" className="vehicle-select"
                                                    onChange={(e) => setCompany(e.target.value)}
                                                    value={company || ""}
                                                >
                                                    <option selected value={""}>Choose Car Maker</option>
                                                    {carName.map((e, index) => {
                                                        return (
                                                            <option value={e?.id} key={index}  >
                                                                {e?.name}
                                                            </option>
                                                        );
                                                    })}
                                                </select>
                                            </div>

                                            {/* Price Section */}
                                            <div className="filter-section">
                                                <h6 className="filter-title">Price</h6>
                                                <div className="price-range">
                                                    <div className="price-input">
                                                        <span>From</span>
                                                        <input type="number" placeholder="0"
                                                            value={Stprice || ""}
                                                            onChange={(e) => setStPrice(e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="price-input">
                                                        <span>To</span>
                                                        <input type="number" placeholder="250"
                                                            value={endPrice || ""}
                                                            onChange={(e) => setEndPrice(e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="filter-button">
                                                <button >Filter</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>

                            <div className="shop-list-filter-categories">
                                <div className="shop-list-filter-categories__wrapper">
                                    <div className="shop-list-filter-categories__block">
                                        <h6 className="shop-list-filter-categories__title">Categories</h6>
                                        <hr />
                                        <div className="shop-list-filter-categories__collapse">
                                            <ul className="shop-list-filter-categories__checkbox-list" style={{ maxHeight: "600px", overflowY: "auto" }}>
                                                {/* {categories?.map((category) => (
                                                    <div key={category.id} className="sidebar-category">
                                                        <Accordion
                                                            expanded={currentCategoryId === category.id || expanded === category.id}
                                                            onChange={handleChange(category.id)}
                                                            disableGutters
                                                            elevation={0}
                                                            square
                                                        >
                                                            <AccordionSummary
                                                                expandIcon={category.children?.length > 0 ? <ExpandMoreIcon fontSize="small" /> : null}
                                                                className="sidebar-category-title"
                                                            >
                                                                <span>{category.name}</span>
                                                            </AccordionSummary>

                                                            {category.children.map((child) => (
                                                                <li key={child.id}>
                                                                    <Link href={`/catelog/${category.id}`} className="sidebar-subitem">
                                                                        {child.name}
                                                                    </Link>

                                                                    {child.children?.length > 0 && (
                                                                        <ul className="sidebar-subchild">
                                                                            {child.children.map((subChild) => (
                                                                                <li key={subChild.id}>
                                                                                    <Link href={`/shop/${subChild.name}`} className="sidebar-subchild-item">
                                                                                        ▸ {subChild.name}
                                                                                    </Link>
                                                                                </li>
                                                                            ))}
                                                                        </ul>
                                                                    )}
                                                                </li>
                                                            ))}

                                                        </Accordion>
                                                    </div>
                                                ))} */}
                                                {categories?.map((category) => (
                                                    <div key={category.id} className="sidebar-category">
                                                        <Accordion
                                                            expanded={currentCategoryId === category.id || expanded === category.id}
                                                            onChange={handleChange(category.id)}
                                                            disableGutters
                                                            elevation={0}
                                                            square
                                                        >
                                                            <AccordionSummary
                                                                expandIcon={category.children?.length > 0 ? <ExpandMoreIcon fontSize="small" /> : null}
                                                                className={`sidebar-category-title ${currentCategoryId === category.id ? 'active-parent' : ''}`}
                                                            >
                                                                <span>{category.name}</span>
                                                            </AccordionSummary>

                                                            <AccordionDetails className="sidebar-submenu">
                                                                <ul>
                                                                    {category.children?.map((child) => (
                                                                        <li key={child.id}>
                                                                            <Link href={`/catelog/${category.id}`} className={`sidebar-subitem ${currentCategoryId === child.id ? 'active-child' : ''}`}>
                                                                                {child.name}
                                                                            </Link>

                                                                            {child.children?.length > 0 && (
                                                                                <ul className="sidebar-subchild">
                                                                                    {child.children.map((subChild) => (
                                                                                        <li key={subChild.id}>
                                                                                            <Link href={`/shop/${subChild.name}`} className="sidebar-subchild-item">
                                                                                                {/* <span className="arrow">▸</span> */}
                                                                                                {subChild.name}
                                                                                            </Link>
                                                                                        </li>
                                                                                    ))}
                                                                                </ul>
                                                                            )}
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </AccordionDetails>
                                                        </Accordion>
                                                    </div>
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
                style={{ zIndex: 9999 }}
            >
                <div className="single__widget price__filter widget__bg ">
                    <div className="d-flex justify-content-between">
                        <h2 className='text-black'>Filters</h2>
                        <a
                            // onClick={handleReset}
                            onClick={() => handleResetFilter()}
                            className="ms-5 mt-1"
                            style={{ textDecoration: "underline", color: "red" }}
                        >
                            Reset
                        </a>
                    </div>
                    <div className="">
                        <form onSubmit={handleFinalFilterClick}>
                            {/* Origin Section */}
                            <div className="filter-section">
                                <h6 className="filter-title">Origin</h6>
                                <label className="radio-label">
                                    <input type="radio" name="origin" checked={origin === 'oem'} onChange={() => setOrigin('oem')} />
                                    <span>OEM</span>
                                </label>
                                <select name="carMaker" className="vehicle-select"
                                    onChange={(e) => setCompany(e.target.value)}
                                    value={company || ""}
                                >
                                    <option selected value={""}>Choose Car Maker</option>
                                    {carName.map((e, index) => {
                                        return (
                                            <option value={e?.id} key={index}  >
                                                {e?.name}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>

                            {/* Price Section */}
                            <div className="filter-section">
                                <h6 className="filter-title">Price</h6>
                                <div className="price-range">
                                    <div className="price-input">
                                        <span>From</span>
                                        <input type="number" placeholder="0"
                                            value={Stprice || ""}
                                            onChange={(e) => setStPrice(e.target.value)}
                                        />
                                    </div>
                                    <div className="price-input">
                                        <span>To</span>
                                        <input type="number" placeholder="250"
                                            value={endPrice || ""}
                                            onChange={(e) => setEndPrice(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="filter-button">
                                <button >Filter</button>
                            </div>
                        </form>
                    </div>
                </div>

            </Drawer>
        </div >
    );
}
