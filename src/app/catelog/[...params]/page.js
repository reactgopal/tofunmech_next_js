"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "@/store/reducers/categorySlice";
import { findCategoryById, isValidCategoryPath } from "@/utils/helpers";

import 'react-modern-drawer/dist/index.css'
import Drawer from 'react-modern-drawer'
import { motion } from "framer-motion";

//import styles 👇
import { CgMenuGridR } from "react-icons/cg";
import { TfiMenuAlt } from "react-icons/tfi";
import { RxCross2 } from "react-icons/rx";
import { useState } from "react";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Link from "next/link";
import Breadcrumbs from "@/utils/Breadcrumbs";
const CatelogPage = () => {

    // debugger
    const router = useRouter();
    const { params } = useParams(); // assuming your route is [...params]
    console.log({ params }, "params");
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [childExpanded, setChildExpanded] = useState(false);

    const { categories, status } = useSelector((state) => state.categories);
    // const category = useSelector((state) => state.categories.categories);
    console.log(categories, "category");
    const currentCategoryId = params ? params[params.length - 1] : null;
    console.log(currentCategoryId, "currentCategoryId")

    const subCategory = findCategoryById(categories, currentCategoryId);
    console.log(subCategory, "subCategoryf")

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchCategories());
        }
    }, [status, dispatch]);
    useEffect(() => {
        if (categories.length && params?.length) {
            const isValid = isValidCategoryPath(categories, params);
            if (!isValid) {
                const fallbackId = fallbackProduct.id;
                const fallbackPN = encodeURIComponent(fallbackProduct.PN);
                router.replace(`/productsdetail/${fallbackId}/${fallbackPN}`);
            }
        }
    }, [categories, params]);

    if (!params) {
        return <p>Loading...</p>;
    }

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    const handleChildChange = (panel) => (event, isExpanded) => {
        setChildExpanded(isExpanded ? panel : false);
    };
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
                                            {/* <a className="shop-list-toolbar__view-icon" href="/cars-list-4">View</a>
                                            <a className="shop-list-toolbar__view-icon" href="/cars-list-4">View</a> */}
                                            <button
                                                // className={`product__grid--column__buttons--icons ${gridOpen == true ? "active" : ""
                                                //     } `}
                                                className="shop-list-toolbar__view-icon"
                                                aria-label="grid btn"
                                                data-toggle="tab"
                                                data-target="#product_grid"
                                                // onClick={handleGridClick}
                                                title="Grid"
                                            >
                                                <CgMenuGridR style={{ color: "black" }} />
                                            </button>
                                            <button
                                                // className={`product__grid--column__buttons--icons ${gridOpen == true ? "" : "active"
                                                //     }`}
                                                className="shop-list-toolbar__view-icon"
                                                aria-label="list btn"
                                                data-toggle="tab"
                                                data-target="#product_list"
                                                // onClick={handleTfiClick}
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
                                <div className="row">
                                    {subCategory?.children?.length > 0 ? (
                                        subCategory.children.map((item) => (
                                            <div key={item.id} className="col-lg-3 col-md-6">
                                                <div className="category-list-products__card">
                                                    <div className="category-products__image new_img_height">
                                                        <img src={item.image} alt={item.name} />
                                                    </div>
                                                    <div className="text-center">
                                                        <div className="category-list-products__title">
                                                            <button
                                                                onClick={() => {
                                                                    const newPath = `/catelog/${params.join("/")}/${item.id}`;
                                                                    if (item.children?.length > 0) {
                                                                        router.push(newPath);
                                                                    } else {
                                                                        const cateLevel = params.length + 1; // calculate the category level
                                                                        const cateParam = cateLevel === 2 ? 'cate2' : 'cate3';
                                                                        router.push(`/shop/${item.name}?cate=${cateParam}`);
                                                                        // router.push(`/shop-list/${item.name}?cate=cate2`);
                                                                    }
                                                                }}
                                                            >
                                                                {item.name}
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="mt-4 text-gray-600">No subcategories</p>
                                    )}
                                </div>
                            </div>
                        </div>
                        {/* filter area code  */}
                        <div className="content-left order-lg-first d-none d-lg-block">
                            <div className="shop-list-filter-categories">
                                <div className="shop-list-filter-categories__wrapper">
                                    <div className="shop-list-filter-categories__block">
                                        <h6 className="shop-list-filter-categories__title">Categories</h6>
                                        <div className="shop-list-filter-categories__collapse">
                                            <ul className="shop-list-filter-categories__checkbox-list" style={{ maxHeight: "600px", overflowY: "auto" }}>
                                                {categories?.map((category) => (
                                                    <motion.div
                                                        key={category.id}
                                                        initial={{ opacity: 0, y: -10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ duration: 0.3 }}
                                                        className="mb-2 shadow-sm rounded-lg bg-white"
                                                    >
                                                        <Accordion
                                                            expanded={currentCategoryId == category.id || expanded === category.id}
                                                            onChange={handleChange(category.id)}
                                                            sx={{ backgroundColor: "white", boxShadow: "none" }}
                                                        >
                                                            <AccordionSummary
                                                                expandIcon={
                                                                    category.children?.length > 0 ? (
                                                                        <ExpandMoreIcon style={{ fontSize: "20px" }} />
                                                                    ) : null
                                                                }
                                                                className="hover:bg-gray-100 rounded-md"
                                                            >
                                                                <span className="font-medium text-black px-2">{category.name}</span>
                                                            </AccordionSummary>

                                                            {category?.children?.length > 0 && (
                                                                <AccordionDetails className="child_category-details">
                                                                    <ul className="child_category-list">
                                                                        {category.children.map((child) => (
                                                                            <li key={child.id} className="child_category_sublist">
                                                                                <Link href={`/catelog/${category.id}`}>
                                                                                    <div className=" child_category_name">{child.name}</div>
                                                                                </Link>

                                                                                <AccordionDetails sx={{ paddingTop: 0, paddingBottom: 0 }}>

                                                                                    {child.children?.length > 0 && (
                                                                                        <ul className="pe-4 mt-1 mb-1">
                                                                                            {child.children.map((subChild) => (
                                                                                                <li className="subchild__main" key={subChild.id}>
                                                                                                    <Link href={`/shop/${subChild.name}`}>
                                                                                                        <span className="subchild_list">
                                                                                                            ▸ {subChild.name}
                                                                                                        </span>
                                                                                                    </Link>
                                                                                                </li>
                                                                                            ))}
                                                                                        </ul>
                                                                                    )}

                                                                                </AccordionDetails>
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                </AccordionDetails>
                                                            )}
                                                        </Accordion>
                                                    </motion.div>
                                                ))}
                                                {categories?.map((category) => (
                                                    <motion.div
                                                        key={category.id}
                                                        initial={{ opacity: 0, y: -10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ duration: 0.3 }}
                                                        className="mb-2 shadow-sm rounded-lg bg-white"
                                                    >
                                                        <Accordion
                                                            expanded={currentCategoryId == category.id || expanded === category.id}
                                                            onChange={handleChange(category.id)}
                                                            sx={{ backgroundColor: "white", boxShadow: "none" }}
                                                        >
                                                            <AccordionSummary
                                                                expandIcon={
                                                                    category.children?.length > 0 ? (
                                                                        <ExpandMoreIcon style={{ fontSize: "20px" }} />
                                                                    ) : null
                                                                }
                                                                className="hover:bg-gray-100 rounded-md"
                                                            >
                                                                <span className="font-medium text-black px-2">{category.name}</span>
                                                            </AccordionSummary>

                                                            {category?.children?.length > 0 && (
                                                                <AccordionDetails className="px-4 py-2 bg-gray-50 rounded-b-lg">
                                                                    <ul className="space-y-3">
                                                                        {category.children.map((child) => (
                                                                            <li key={child.id}>
                                                                                <Link href={`/catelog/${category.id}`}>
                                                                                    <div className="text-base font-semibold text-gray-800 hover:text-blue-600 transition duration-200 cursor-pointer">
                                                                                        {child.name}
                                                                                    </div>
                                                                                </Link>

                                                                                {child.children?.length > 0 && (
                                                                                    <ul className="ml-4 mt-2 space-y-2 border-l border-gray-300 pl-4">
                                                                                        {child.children.map((subChild) => (
                                                                                            <li key={subChild.id}>
                                                                                                <Link href={`/shop/${subChild.name}`}>
                                                                                                    <span className="text-sm text-gray-600 hover:text-blue-500 transition duration-200 cursor-pointer">
                                                                                                        ▸ {subChild.name}
                                                                                                    </span>
                                                                                                </Link>
                                                                                            </li>
                                                                                        ))}
                                                                                    </ul>
                                                                                )}
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                </AccordionDetails>
                                                            )}
                                                        </Accordion>
                                                    </motion.div>
                                                ))}


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
                        </div>
                    </div>
                </div>
            </section >

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
                                    <option selected value={"car"}>
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
};

export default CatelogPage;
