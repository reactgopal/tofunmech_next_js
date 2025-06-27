'use client'
import Link from 'next/link';
import { usePathname } from "next/navigation";
import { useState } from 'react';
import { AiOutlineMenu, AiOutlineClose, AiOutlineUser } from 'react-icons/ai';
import { FaAngleDown } from 'react-icons/fa';

// icons for bottom bar
import { AiOutlineHeart, AiOutlineShoppingCart } from 'react-icons/ai'
import { IoIosArrowDown, IoMdContact } from 'react-icons/io'
import { BiLogoFacebook, BiLogoInstagramAlt, BiLogoPinterest, BiLogoTwitter, BiLogoYoutube } from 'react-icons/bi'
import { BsShop } from 'react-icons/bs'
import { useSelector } from 'react-redux';

export default function Header() {
    const pathname = usePathname();
    const pathName = location.pathname;
    const user = JSON.parse(localStorage.getItem("USER"));
    const { login_cart, addto_cart, add_wish } = useSelector((state) => ({ ...state.products }));
    const [isOpen, setIsOpen] = useState(false);
    const textColor = pathname === "/" ? "white" : "#000";
    const isActive = (path) => pathname === path;
    console.log(addto_cart, "addto_cart");
    console.log(add_wish, "add_wish ");
    const toggleDrawer = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header className="header-section header sticky-top">
            <div className="container-fluid">
                <div className="d-flex justify-content-between align-items-center">
                    {/* Logo */}
                    <div className="d-flex align-items-center" style={{
                        marginRight: 0,
                        minWidth: 170
                    }}>
                        <Link href="/">
                            <img src="/assets/img/logo/logo-d.svg" alt="logo" />
                        </Link>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button className="btn d-sm-block d-lg-none" onClick={toggleDrawer}>
                        {isOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
                    </button>

                    {/* Desktop Navigation */}
                    <nav className="d-none d-lg-block">
                        <ul className="nav">
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
                                {/* <ul className="header__sub--menu" >
                                    <li><Link href="#" className="header__sub--menu__link" style={{ color: textColor }}>Submenu item 1</Link></li>
                                    <li><Link href="#" className="header__sub--menu__link" style={{ color: textColor }}>Submenu item 2</Link></li>
                                    <li><Link href="#" className="header__sub--menu__link" style={{ color: textColor }}>Submenu item 2</Link></li>
                                    <li><Link href="#" className="header__sub--menu__link" style={{ color: textColor }}>Submenu item 2</Link></li>
                                    <li><Link href="#" className="header__sub--menu__link" style={{ color: textColor }}>Submenu item 2</Link></li>
                                </ul> */}
                                <ul className="header__sub--menu" >
                                    <li><Link href="/login" className="header__sub--menu__link" >login</Link></li>
                                    <li>
                                        {
                                            user?.success === true ?
                                                <Link href="/wishlist" className="header__sub--menu__link" prefetch={false} >wishlist</Link>
                                                : ""
                                        }
                                    </li>
                                    <li>
                                        {
                                            user?.success === true ?
                                                <Link href="/my-orders" className="header__sub--menu__link" prefetch={false} >my orders</Link>
                                                : ""
                                        }
                                    </li>
                                    <li><Link href="/cart" className="header__sub--menu__link" >cart</Link></li>
                                    <li><Link href="/privacy-policy" className="header__sub--menu__link" >privacy policy</Link></li>
                                </ul>
                            </li>
                        </ul>
                    </nav>

                    {/* Right Side */}
                    <div className="d-flex align-items-center ">
                        <Link href="/wishlist" className="position-relative btn btn-outline ms-2">
                            <AiOutlineHeart style={{ fontSize: "28px" }} />
                            {
                                add_wish?.length > 0 ? <span className="items__count">{add_wish?.length}</span> : ""
                            }
                        </Link>
                        <Link href="/cart" className="position-relative btn btn-outline ms-2">
                            <AiOutlineShoppingCart style={{ fontSize: "28px" }} />
                            {
                                user?.success !== true ? <>
                                    {
                                        addto_cart?.length !== 0 ? <span className="items__count">{addto_cart?.length}</span> : ""
                                    }
                                </> : <>
                                    {
                                        login_cart?.length !== 0 ? <span className="items__count">{login_cart?.length}</span> : ""
                                    }
                                </>
                            }
                        </Link>
                        {/* add singup */}
                        {
                            user?.success === true ? (
                                <Link href="/" className="position-relative  ms-2">
                                    {/* <span>{user?.data?.email.charAt(0)}</span> */}
                                    <div className='circle'>
                                        <span className='circle-inner'>{user?.data?.email ? (user?.data?.email).substring(0, 1).toUpperCase() : 'M'}</span>
                                    </div>
                                </Link>
                            ) : <Link href="/login" className="position-relative btn btn-outline ms-2">
                                <AiOutlineUser style={{ fontSize: "28px" }} />
                            </Link>
                        }
                    </div>
                </div>
                <div className="offcanvas__stikcy--toolbar">
                    <ul className="d-flex justify-content-between text-center">
                        {/* <li className="offcanvas__stikcy--toolbar__list">
                        <a className="offcanvas__stikcy--toolbar__btn" href="/">
                            <AiOutlineHome style={{ fontSize: "20px" }} className={`${window.location.pathname == "/" ? "icon_toolbar_active" : ""}`} />
                            <span className="offcanvas__stikcy--toolbar__label">Home</span>
                        </a>
                    </li>    */}
                        <li className="offcanvas__stikcy--toolbar__list">
                            <a className="offcanvas__stikcy--toolbar__btn" href="/wishlist">
                                <AiOutlineHeart style={{ fontSize: "24px" }} className={`${window.location.pathname == "/" ? "icon_toolbar_active" : ""}`} />
                                <span className="offcanvas__stikcy--toolbar__label">Wishlist</span>
                            </a>
                        </li>
                        <li className="offcanvas__stikcy--toolbar__list">
                            <a className="offcanvas__stikcy--toolbar__btn" href="/market-place">
                                <BsShop style={{ fontSize: "20px" }} className={`${window.location.pathname == "/market-place" ? "icon_toolbar_active" : ""}`} />
                                <span className="offcanvas__stikcy--toolbar__label">Market Place</span>
                            </a>
                        </li>
                        <li className="offcanvas__stikcy--toolbar__lis ">
                            <a className="offcanvas__stikcy--toolbar__btn" href="/cart">
                                <AiOutlineShoppingCart style={{ fontSize: "22px" }} className={`${window.location.pathname == "/cart" ? "icon_toolbar_active" : ""}`} />
                                <span className="offcanvas__stikcy--toolbar__label">Cart</span>
                            </a>
                        </li>
                        <li className="offcanvas__stikcy--toolbar__list">
                            <Link className="offcanvas__stikcy--toolbar__btn" href="/wishlist">
                                <AiOutlineHeart style={{ fontSize: "24px" }} className={`${window.location.pathname == "/wishlist" ? "icon_toolbar_active" : ""}`} />
                                <span className="offcanvas__stikcy--toolbar__label">Wishlist</span>
                            </Link>
                        </li>

                    </ul>
                </div>
                {/* Mobile Drawer */}
                {isOpen && (
                    <div className="mt-3 d-lg-block">
                        <ul className="nav flex-column">
                            <li className="nav-item mb-2">
                                <Link href="/" className="nav-link d-flex align-items-center">
                                    <span>Home</span>
                                    <FaAngleDown className="ms-1" />
                                </Link>
                            </li>
                            <li className="nav-item mb-2">
                                <Link href="/about" className="nav-link d-flex align-items-center">
                                    <span>About</span>
                                    <FaAngleDown className="ms-1" />
                                </Link>
                            </li>
                            <li className="nav-item mb-2">
                                <Link href="/login" className="nav-link d-flex align-items-center">
                                    <span>login</span>
                                    <FaAngleDown className="ms-1" />
                                </Link>
                            </li>
                            <li className="nav-item mb-2">
                                <Link href="/register" className="nav-link d-flex align-items-center">
                                    <span>register</span>
                                    <FaAngleDown className="ms-1" />
                                </Link>
                            </li>
                            <li className="nav-item mt-2">
                                <button className="btn btn-dark w-100">GET IN TOUCH</button>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </header >
    );
}
