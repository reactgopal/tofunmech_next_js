'use client'
import Link from 'next/link';
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from 'react';
import { AiOutlineMenu, AiOutlineClose, AiOutlineUser, AiOutlineHome } from 'react-icons/ai';
import { FaAngleDown } from 'react-icons/fa';
import { FaSearch } from "react-icons/fa";
import { IoClose, IoCloseSharp } from "react-icons/io5";
import { AiOutlineHeart, AiOutlineShoppingCart } from 'react-icons/ai'
import { IoIosArrowDown, IoMdContact } from 'react-icons/io'

import Drawer from 'react-modern-drawer';
// import Drawers from '@mui/material/Drawer';

// icons for bottom bar
import { BiLogoFacebook, BiLogoInstagramAlt, BiLogoPinterest, BiLogoTwitter, BiLogoYoutube } from 'react-icons/bi'
import { BsShop } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Modal } from '@mui/material';
import { removeAllItemWishlist, removeAllLoginCart } from '@/store/reducers/ProductSlice';

export default function Header() {
    const dispatch = useDispatch();
    const router = useRouter();
    const pathname = usePathname();
    const pathName = location.pathname;
    const user = JSON.parse(localStorage.getItem("USER"));
    const { login_cart, addto_cart, add_wish } = useSelector((state) => ({ ...state.products }));
    const cartCount = useSelector((state) => state.products.cart_count);

    // console.log(cartCount, "cartCount   cartCount cartCount");

    const [isOpen, setIsOpen] = useState(false);
    const [open, setOpen] = useState(false);
    const [scroll, setScroll] = useState(false);

    const [openDelete, setOpenDelete] = useState(false);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);

    const [searchActive, setSearchActive] = useState(false);
    const searchInputRef = useRef(null);
    const PLACEHOLDER = "Search Parts Numbers...";

    const textColor = pathname === "/" ? "white" : "#000";
    const isActive = (path) => pathname === path;

    useEffect(() => {
        if (searchActive && searchInputRef.current) {
            const input = searchInputRef.current;

            setTimeout(() => {
                input.focus();
                const length = input.value.length;
                input.setSelectionRange(length, length);
            }, 100);
        }
    }, [searchActive]);

    const handleLogout = () => {
        localStorage.removeItem('USER')
        dispatch(removeAllItemWishlist())
        dispatch(removeAllLoginCart())
        setOpenDelete(false);
        window.location.reload();
    }
    const handleSearchClick = (e) => {
        console.log(e, "handle search click ")
        console.log(e.target.value, "e target value in handle search click")
        setSearch(e.target.value)
    }

    const handleSearch = (e) => {
        e.preventDefault()
        console.log(search, "search")
        if (search !== null && search.length > 0) {
            setSearchActive(false); // 👈 Close the overlay

            router.push(`/search/${search}`)
            setOpen(!open);
        }
        // window.location.reload();
    };
    const handleToggleDrawer = () => {
        setOpen(!open);
    };

    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState)
    }

    const toggleClose = () => {
        setIsOpen(false)
    }
    const handleOpenDelete = () => {
        setOpenDelete(true);
    };

    const handleCloseDelete = () => {
        setOpenDelete(false);
    };

    const handleCloseModal = () => {
        setIsModalOpenOffer(false);
    };


    return (
        <div>

            <header className="header-section header sticky-top">
                {/* // <header className={`main__header ${scroll ? "header__stickyclose" : "header__sticky"}`}> */}

                <div className="container-fluid">
                    <div className="main__header--inner d-flex justify-content-between align-items-center">
                        <div className='toggle_icon'>
                            <a onClick={toggleDrawer}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="ionicon offcanvas__header--menu__open--svg" viewBox="0 0 512 512"><path fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="32" d="M80 160h352M80 256h352M80 352h352" /></svg>
                            </a>
                        </div>
                        <div className="main__logo">
                            <h1 className="main__logo--title">
                                <a className="main__logo--link" href="/">
                                    <img
                                        className="main__logo--img"
                                        src="/assets/img/logo/logo-d.svg"
                                        alt="logo"
                                    />
                                </a>
                            </h1>
                        </div>
                        {/* Desktop Navigation */}
                        <div className="header__menu style3 d-none d-lg-block">
                            <nav className="header__menu--navigation">
                                <ul className="header__menu--wrapper d-flex">
                                    <li className="header__menu--items">
                                        <Link href="/" className={`header__menu--link ${isActive('/') ? 'active' : ''}`} style={{ color: textColor }}>
                                            Home
                                        </Link>
                                    </li>
                                    <li className="header__menu--items">
                                        <Link href="/" className={`header__menu--link ${isActive('/shop-list') ? 'active' : ''}`} style={{ color: textColor }}>
                                            Tools & Equiments
                                        </Link>
                                    </li>
                                    <li className="header__menu--items">
                                        <Link href="/" className={`header__menu--link ${isActive('/shop-details') ? 'active' : ''}`} style={{ color: textColor }}>
                                            Market Place
                                        </Link>
                                    </li>
                                    <li className="header__menu--items">
                                        <Link
                                            href="/case-studies" className={`header__menu--link ${isActive('/case-studies') ? 'active' : ''}`} style={{ color: textColor }}>

                                            Car Exchange
                                        </Link>
                                    </li>
                                    <li className="header__menu--items">
                                        <Link href="/insights" className={`header__menu--link ${isActive('/insights') ? 'active' : ''}`} style={{ color: textColor }}>
                                            Others
                                            <FaAngleDown className="ms-1 mt-1" />
                                        </Link>
                                        <ul className="header__sub--menu" >
                                            <li>
                                                {
                                                    user?.success === true ? "" :
                                                        <Link href="/login" className="header__sub--menu__link" >login</Link>
                                                }
                                            </li>
                                            <li>
                                                {
                                                    user?.success === true ?
                                                        <Link href="/wishlist" className="header__sub--menu__link" prefetch={false} >Wishlist</Link>
                                                        : ""
                                                }
                                            </li>
                                            <li>
                                                {
                                                    user?.success === true ?
                                                        <Link href="/my-orders" className="header__sub--menu__link" prefetch={false} >My Orders</Link>
                                                        : ""
                                                }
                                            </li>
                                            <li>
                                                {
                                                    user?.success === true ?
                                                        <Link href="/my-address" className="header__sub--menu__link" prefetch={false} >My Address</Link>
                                                        : ""
                                                }
                                            </li>
                                            <li>
                                                {
                                                    user?.success === true ?
                                                        <Link href="/my-estimates" className="header__sub--menu__link" prefetch={false} >My Estimate</Link>
                                                        : ""
                                                }
                                            </li>
                                            <li>
                                                {
                                                    user?.success === true ?
                                                        <Link href="/cart" className="header__sub--menu__link" >Cart</Link>
                                                        : ""
                                                }
                                            </li>
                                            <li><Link href="/privacy-policy" className="header__sub--menu__link" >Privacy Policy</Link></li>
                                        </ul>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                        {/* Right Side */}
                        <div className="d-flex align-items-center">
                            <ul className="header__account--wrapper d-flex align-items-center">
                                <li className='header__account--items'>
                                    {/* Floating Search Button */}
                                    <motion.div
                                        className="control"
                                        initial={{ opacity: 1 }}
                                        animate={{ opacity: searchActive ? 0 : 1, scale: searchActive ? 0.8 : 1 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <motion.button
                                            className="btn-material"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => setSearchActive(true)}
                                        >
                                            <FaSearch className="icon-material-search" />
                                        </motion.button>
                                    </motion.div>
                                    {/* Fullscreen Animated Search Overlay */}
                                    <AnimatePresence>
                                        {searchActive && (
                                            <motion.div
                                                className="custom-search-wrapper"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 0.4 }}
                                            >
                                                <motion.i
                                                    className="icon-close"
                                                    onClick={() => setSearchActive(false)}
                                                    initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
                                                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                                    exit={{ opacity: 0, scale: 0.5, rotate: 45 }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    <IoClose />
                                                </motion.i>

                                                <motion.div
                                                    className="search-input"
                                                    initial={{ x: 40, opacity: 0 }}
                                                    animate={{ x: 0, opacity: 1 }}
                                                    exit={{ x: 40, opacity: 0 }}
                                                    transition={{ delay: 0.2, duration: 0.4 }}
                                                >
                                                    <input
                                                        ref={searchInputRef}
                                                        className="input-search"
                                                        type="text"
                                                        value={search}
                                                        placeholder={PLACEHOLDER}
                                                        onChange={(e) => setSearch(e.target.value)}
                                                        onKeyDown={(e) => e.key === "Enter" && handleSearch(e)}
                                                    />

                                                </motion.div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </li>
                                <li className="header__account--items d-none d-lg-block">
                                    <Link href="/wishlist" className="header__account--btn">
                                        <AiOutlineHeart style={{ fontSize: "28px" }} />
                                        {
                                            add_wish?.length > 0 ? <span className="items__count">{add_wish?.length}</span> : ""
                                        }
                                    </Link>
                                </li>
                                <li className="header__account--items d-none d-lg-block">
                                    <Link href="/cart" className="header__account--btn">
                                        <AiOutlineShoppingCart style={{ fontSize: "28px" }} />
                                        {
                                            user?.success !== true ? <>
                                                {
                                                    addto_cart?.length !== 0 ? <span className="items__count">{addto_cart?.length}</span> : ""
                                                }
                                            </> : <>
                                                {
                                                    cartCount?.length !== 0 ? <span className="items__count">{cartCount}</span> : ""
                                                }
                                            </>
                                        }
                                    </Link>
                                </li>
                                <li className="header__account--items d-none d-lg-block">
                                    {
                                        user?.success !== true ?
                                            <Link className="header__account--btn" href="/login">
                                                <IoMdContact style={{ fontSize: "28px" }} />
                                            </Link>
                                            : ""
                                    }
                                </li>
                                <li className="header__menu--items">
                                    <a className="header__menu--links">
                                        {
                                            user?.success !== true ?
                                                ""
                                                :
                                                <div className="circle" title='User'>
                                                    <p className="circle-inner">{user?.data?.email ? (user?.data?.email).substring(0, 1).toUpperCase() : 'M'}</p>
                                                </div>
                                        }
                                    </a>
                                    <ul className="header__sub--menu">
                                        <li className="header__sub--menu__items">
                                            {
                                                user?.success !== true ?
                                                    ""
                                                    :
                                                    <a className="header__account--btn" title='Logout' onClick={handleOpenDelete}>
                                                        Logout
                                                    </a>
                                            }
                                        </li>
                                    </ul>
                                </li>
                                {/* add singup */}
                                {/* {
                            user?.success === true ? (
                                <Link href="/" className="position-relative  ms-2">
                                    <div className='circle'>
                                        <span className='circle-inner'>{user?.data?.email ? (user?.data?.email).substring(0, 1).toUpperCase() : 'M'}</span>
                                    </div>
                                </Link>
                            ) : <Link href="/login" className="position-relative btn btn-outline ms-2">
                                <AiOutlineUser style={{ fontSize: "28px" }} />
                            </Link>
                        } */}
                            </ul>
                        </div>
                    </div>
                </div>
                {/* start toggle open */}

            </header >
            {/* Start Offcanvas stikcy toolbar */}
            <div className="offcanvas__stikcy--toolbar">
                <ul className="d-flex justify-content-between text-center">
                    <li className="offcanvas__stikcy--toolbar__list">
                        <a className="offcanvas__stikcy--toolbar__btn" href="/">
                            <AiOutlineHome style={{ fontSize: "20px" }} className={`${window.location.pathname == "/" ? "icon_toolbar_active" : ""}`} />
                            <span className="offcanvas__stikcy--toolbar__label">Home</span>
                        </a>
                    </li>
                    <li className="offcanvas__stikcy--toolbar__list">
                        <a className="offcanvas__stikcy--toolbar__btn" href="/market-place">
                            <BsShop style={{ fontSize: "20px" }} className={`${window.location.pathname == "/market-place" ? "icon_toolbar_active" : ""}`} />
                            <span className="offcanvas__stikcy--toolbar__label">Market Place</span>
                        </a>
                    </li>
                    <li className="offcanvas__stikcy--toolbar__list">
                        <a className="offcanvas__stikcy--toolbar__btn" href="/cart">
                            <AiOutlineShoppingCart style={{ fontSize: "22px" }} className={`${window.location.pathname == "/cart" ? "icon_toolbar_active" : ""}`} />
                            <span className="offcanvas__stikcy--toolbar__label">Cart</span>
                        </a>
                    </li>
                    <li className="offcanvas__stikcy--toolbar__list">
                        <Link className="offcanvas__stikcy--toolbar__btn" href="/wishlist">
                            <AiOutlineHeart style={{ fontSize: "24px" }} className={`${window.location.pathname == "/wishlist" ? "icon_toolbar_active" : ""}`} />
                            <span className="offcanvas__stikcy--toolbar__label">Wishlist</span>
                            {
                                add_wish?.length !== 0 ? <span className="items__count">{add_wish?.length}</span> : ""
                            }
                        </Link>
                    </li>
                </ul>
            </div>
            {/* Logout Model */}
            <Modal
                open={openDelete}
                onClose={handleCloseDelete}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 400,
                        maxWidth: 380,
                        bgcolor: "background.paper",
                        boxShadow: 24,
                        p: 4,
                        borderRadius: "10px"
                    }}
                >
                    <div style={{ position: "relative" }}>
                        <h2 className="my-5 text-center text-black">Are you sure logout?</h2>
                        <IoCloseSharp
                            style={{
                                position: "absolute",
                                right: "-10%",
                                top: "-30%",
                                transform: "translate(-50%, -50%)",
                                cursor: "pointer",
                                fontSize: "24px",
                                backgroundColor: "black",
                                borderRadius: "50%",
                                color: "white",
                            }}
                            onClick={handleCloseDelete}
                        />
                        <button className="primary__btn w-100" onClick={handleLogout}>
                            Logout
                        </button>
                    </div>
                </Box>
            </Modal>
            {/* side off canvas */}
            <div className="toggle_open">
                <Drawer
                    open={isOpen}
                    onClose={toggleDrawer}
                    direction='left'
                    className='bla bla bla'
                    style={{ zIndex: 999 }}
                >
                    <div className="offcanvas__inner">
                        <div className="offcanvas__logo">
                            <a className="offcanvas__logo_link" href="/">
                                <img
                                    src="assets/img/logo/mechx.png"
                                    alt="Grocee Logo"
                                    width={158}
                                    height={36}
                                />
                            </a>
                            <AiOutlineClose style={{ fontSize: "24px", color: "black" }} onClick={toggleClose} />

                        </div>
                        <nav className="offcanvas__menu">
                            <ul className="offcanvas__menu_ul">
                                <li className="offcanvas__menu_li">
                                    <Link className="offcanvas__menu_item" href="/" onClick={toggleDrawer}>
                                        Home
                                    </Link>
                                </li>
                                <li className="offcanvas__menu_li">
                                    <Link className="offcanvas__menu_item" href="/market-place" onClick={toggleDrawer}>
                                        Market Place
                                    </Link>
                                </li>
                                <li className="offcanvas__menu_li">
                                    <Link className="offcanvas__menu_item" href="/tools-equiments" onClick={toggleDrawer}>
                                        Tool & Equimdent
                                    </Link>
                                </li>
                                <li className="offcanvas__menu_li">
                                    <Link className="offcanvas__menu_item" href="/car-exchange" onClick={toggleDrawer}>
                                        Car Exchange
                                    </Link>
                                </li>
                                <li className="offcanvas__menu_li">
                                    <Link className="offcanvas__menu_item" href="/car-insurance" onClick={toggleDrawer}>
                                        Car Insurance
                                    </Link>
                                </li>
                                <li className="offcanvas__menu_li">
                                    <Link className="offcanvas__menu_item" href="/my-orders" onClick={toggleDrawer}>
                                        My Orders
                                    </Link>
                                </li>
                                <li className="offcanvas__menu_li">
                                    <Link className="offcanvas__menu_item" href="/my-estimates" onClick={toggleDrawer}>
                                        My Estimates
                                    </Link>
                                </li>
                                <li className="offcanvas__menu_li">
                                    <Link className="offcanvas__menu_item" href="/my-address" onClick={toggleDrawer}>
                                        My Address
                                    </Link>
                                </li>
                                <li className="offcanvas__menu_li">
                                    <Link className="offcanvas__menu_item" href="/wishlist" onClick={toggleDrawer}>
                                        My WishList
                                    </Link>
                                </li>
                                <li className="offcanvas__menu_li">
                                    <Link className="offcanvas__menu_item" href="/privacy-policy" onClick={toggleDrawer}>
                                        Privacy Policy
                                    </Link>
                                </li>
                            </ul>
                            <div className="offcanvas__account--items">
                                {
                                    user?.success !== true ?
                                        <>
                                            <Link
                                                href="/login"
                                                className="offcanvas__account--items__btn d-flex align-items-center"
                                            >
                                                <span className="offcanvas__account--items__icon">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="20.51"
                                                        height="19.443"
                                                        viewBox="0 0 512 512"
                                                    >
                                                        <path
                                                            d="M344 144c-3.92 52.87-44 96-88 96s-84.15-43.12-88-96c-4-55 35-96 88-96s92 42 88 96z"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={32}
                                                        />
                                                        <path
                                                            d="M256 304c-87 0-175.3 48-191.64 138.6C62.39 453.52 68.57 464 80 464h352c11.44 0 17.62-10.48 15.65-21.4C431.3 352 343 304 256 304z"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeMiterlimit={10}
                                                            strokeWidth={32}
                                                        />
                                                    </svg>
                                                </span>
                                                <span className="offcanvas__account--items__label" onClick={toggleDrawer}>
                                                    Login / Register
                                                </span>
                                            </Link>
                                        </>
                                        :
                                        <>
                                            <Link href="/login" onClick={handleOpenDelete}>
                                                <span className="offcanvas__account--items__label" onClick={toggleDrawer}>
                                                    Logout
                                                </span>
                                            </Link>
                                        </>
                                }
                            </div>
                        </nav>
                    </div>
                </Drawer>
            </div>
        </div>
    );
}
