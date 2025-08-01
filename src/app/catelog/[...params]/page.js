"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "@/store/reducers/categorySlice";
import { findCategoryById, isValidCategoryPath } from "@/utils/helpers";


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
    console.log(subCategory, "subCategory")

    // text animation
    const headLineText = "Shop By Categories";
    const words = headLineText.split(" ");
    const cateWord = "Categories";
    const catewords = cateWord.split(" ");
    console.log(words, "words")

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
        <div className="">
            <div className="shop-list-header d-none d-md-block">
                <div className="custom-container position-relative mx-auto">
                    <div className="bg-overlay rounded-4 overflow-hidden">
                        <img src="/assets/img/pageHeader/banner1.png" alt="Carento" />
                    </div>
                    <div className="container position-absolute z-1 top-50 start-50 `pb-[20px] translate-middle text-center">
                        <span className="shop-list-header__subtitle text-sm-bold rounded-4 ">Find cars for sale and for rent near you</span>
                        <h2>
                            Find the Perfect Part at the
                            <br />
                            Best Price for Your Vehicle's Comfort
                        </h2>
                    </div>
                    <div className="shop-list__breadcrumb navigation-page">
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
                    <div className="box-content-main shop-list-section--padding">
                        <div className="content-right">
                            <div className="shop-list-toolbar p-0">
                                <div className="row align-items-center">
                                    <div className="shop-list-toolbar__left col-xl-4 col-md-4 mb-10 text-lg-start text-center">
                                        <div className="shop-list-toolbar__view-options">
                                            <motion.div
                                                className="section__heading"
                                            // style={{ marginLeft: "35px" }}
                                            >
                                                {
                                                    words.map((word, index) => (
                                                        <motion.h2
                                                            initial={{ filter: "blur(5px)", opacity: 0, y: 12 }}
                                                            animate={{ filter: "blur(0)", opacity: 1, y: 0 }}
                                                            transition={{ duration: 0.5, delay: 0.1 * index }}
                                                            key={index}
                                                            className="shop-list-category__view-title me-1 h2 ">
                                                            {word}
                                                        </motion.h2>
                                                    ))
                                                }
                                            </motion.div>
                                            {/* <button className="btn d-block d-lg-none " onClick={toggleDrawer}>Filter</button> */}
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
                            <div className="">
                                <ul className="categories__shop--inner">
                                    {subCategory?.children?.length > 0 ? (
                                        subCategory.children.map((item, index) => {
                                            const newPath = `/catelog/${params.join("/")}/${item.id}`;
                                            const cateLevel = params.length + 1;
                                            const cateParam = cateLevel === 2 ? "cate2" : "cate3";

                                            // Determine final href
                                            const href = item.children?.length > 0
                                                ? newPath
                                                : `/shop/${item.name}?cate=${cateParam}`;

                                            return (
                                                <li
                                                    className="categories__shop--card"
                                                    key={index}
                                                >
                                                    <motion.div className="box">
                                                        <Link href={href} className="categories__shop--card__link" style={{ cursor: "pointer", display: "block" }}>
                                                            {/* <div className="category-products__image new_img_height">
                                                            <img src={item.image} alt={item.name} />
                                                        </div>
                                                        <div className="text-center">
                                                            <div className="categories__content--title">
                                                                {item.name}
                                                            </div>
                                                        </div> */}

                                                            <div className="categories__thumbnail new_img_height">
                                                                <img
                                                                    className="categories__thumbnail--img"
                                                                    src={item?.image ? item?.image : Placeholder_view}
                                                                    alt="categories-img"
                                                                    loading="lazy"
                                                                />
                                                            </div>
                                                            <div className="categories__content">
                                                                <h2 className="categories__content--title">
                                                                    {item?.name}
                                                                    {/* {e?.Description} */}
                                                                </h2>
                                                            </div>
                                                        </Link>
                                                    </motion.div>
                                                </li>
                                            );
                                        })
                                    ) : (
                                        <p className="mt-4 text-gray-600">No subcategories</p>
                                    )}
                                    {/* {subCategory?.children?.length > 0 ? (
                                        subCategory.children.map((item) => {
                                            const newPath = `/catelog/${params.join("/")}/${item.id}`;
                                            const cateLevel = params.length + 1;
                                            const cateParam = cateLevel === 2 ? "cate2" : "cate3";

                                            const handleClick = () => {
                                                if (item.children?.length > 0) {
                                                    router.push(newPath);
                                                } else {
                                                    router.push(`/shop/${item.name}?cate=${cateParam}`);
                                                }
                                            };
                                            return (
                                                <div key={item.id} className="col-lg-3 col-md-6">
                                                    <div
                                                        className="category-list-products__card"
                                                        onClick={handleClick}
                                                        style={{ cursor: "pointer" }}
                                                    >
                                                        <div className="category-products__image new_img_height">
                                                            <img src={item.image} alt={item.name} />
                                                        </div>
                                                        <div className="text-center">
                                                            <div className="category-list-products__title">
                                                                {item.name}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })
                                    ) : (
                                        <p className="mt-4 text-gray-600">No subcategories</p>
                                    )} */}
                                </ul>

                                {/* <div className="row">
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
                                </div> */}
                            </div>
                        </div>
                        {/* filter area code  */}
                        <div className="content-left order-lg-first d-none d-lg-block">
                            <div className="shop-list-filter-categories m-0 shop__sidebar--widget">
                                <div className="shop-list-filter-categories__wrapper">
                                    <div className="shop-list-filter-categories__block">
                                        <motion.div className="shop-list-filter-categories__title">
                                            {
                                                catewords.map((word, index) => (
                                                    <motion.h6
                                                        initial={{ filter: "blur(5px)", opacity: 0, y: 12 }}
                                                        animate={{ filter: "blur(0)", opacity: 1, y: 0 }}
                                                        transition={{ duration: 0.5, delay: 0.1 * index }}
                                                        key={index}
                                                        className="shop-list-filter-categories__title me-1 ">
                                                        {word}
                                                    </motion.h6>
                                                ))
                                            }
                                        </motion.div>
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
                </div >
            </section >

            <Drawer
                open={isOpen}
                onClose={toggleDrawer}
                direction='left'
                className='bla bla bla'
                style={{ zIndex: 1000 }}

            >
                <ul className="widget__categories--menu" style={{ height: "100vh", overflowY: "scroll" }}>
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
            </Drawer>
        </div >
    );
};

export default CatelogPage;
