'use client'
import Link from "next/link";
import { AiOutlineHeart } from 'react-icons/ai'
import { BiLogoFacebook, BiLogoInstagramAlt, BiLogoPinterest, BiLogoTwitter, BiLogoYoutube } from 'react-icons/bi'
import { usePathname } from "next/navigation";
export default function Topbar() {
    const pathname = usePathname();
    // const isHomePage = pathname === "/";
    const bgColor = pathname === "/" ? "transparent" : "#313131";



    // useEffect(() => {
    //     console.log("Mounted - pathname:", pathname);
    // }, [pathname]);
    return (

        <div className="topbar">
            <div className="header__topbar" style={{ backgroundColor: bgColor }}>
                <div className="container-fluid">
                    <div className="header__topbar--inner d-flex align-items-center justify-content-between">
                        <ul className="header__topbar--info d-none d-lg-flex">
                            <li className="header__info--list">
                                {/* <a className="header__info--link text-white" href="shop.html">
                                        STORES
                                    </a> */}
                                <Link className="header__info--link" href="#">
                                    STORES
                                </Link>
                            </li>
                            <li className="header__info--list">
                                <Link className="header__info--link " href="#">
                                    DELIVERY
                                </Link>
                            </li>
                            <li className="header__info--list">
                                <Link className="header__info--link " href="#">
                                    GUARANTEE
                                </Link>
                            </li>
                            <li className="header__info--list">
                                <Link
                                    className="header__info--link d-flex"
                                    href="mailto:info@example.com"
                                >
                                    <svg
                                        width={15}
                                        height={13}
                                        viewBox="0 0 15 13"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M7.368 9.104C7.26133 9.17867 7.13867 9.216 7 9.216C6.86133 9.216 6.744 9.17867 6.648 9.104L0.36 4.624C0.264 4.56 0.178667 4.54933 0.104 4.592C0.04 4.624 0.00800002 4.69867 0.00800002 4.816V11.984C0.00800002 12.112 0.0506667 12.2187 0.136 12.304C0.221333 12.3893 0.322667 12.432 0.44 12.432H13.56C13.6773 12.432 13.7787 12.3893 13.864 12.304C13.96 12.2187 14.008 12.112 14.008 11.984V4.816C14.008 4.69867 13.9707 4.624 13.896 4.592C13.8213 4.54933 13.736 4.56 13.64 4.624L7.368 9.104ZM6.76 8.32C6.84533 8.37333 6.92533 8.4 7 8.4C7.08533 8.4 7.16533 8.37333 7.24 8.32L12.52 4.56C12.6373 4.464 12.696 4.352 12.696 4.224V0.783999C12.696 0.666666 12.6533 0.570666 12.568 0.495999C12.4933 0.410666 12.3973 0.367999 12.28 0.367999H1.72C1.60267 0.367999 1.50667 0.410666 1.432 0.495999C1.35733 0.570666 1.32 0.666666 1.32 0.783999V4.224C1.32 4.37333 1.37333 4.48533 1.48 4.56L6.76 8.32ZM3.784 2.064H9.96C10.088 2.064 10.1947 2.112 10.28 2.208C10.3653 2.29333 10.408 2.4 10.408 2.528C10.408 2.64533 10.3653 2.74667 10.28 2.832C10.1947 2.91733 10.088 2.96 9.96 2.96H3.784C3.656 2.96 3.54933 2.91733 3.464 2.832C3.37867 2.74667 3.336 2.64533 3.336 2.528C3.336 2.4 3.37867 2.29333 3.464 2.208C3.54933 2.112 3.656 2.064 3.784 2.064ZM3.784 3.632H9.96C10.088 3.632 10.1947 3.68 10.28 3.776C10.3653 3.86133 10.408 3.96267 10.408 4.08C10.408 4.19733 10.3653 4.304 10.28 4.4C10.1947 4.48533 10.088 4.528 9.96 4.528H3.784C3.656 4.528 3.54933 4.48533 3.464 4.4C3.37867 4.31467 3.336 4.21333 3.336 4.096C3.336 3.968 3.37867 3.86133 3.464 3.776C3.54933 3.68 3.656 3.632 3.784 3.632Z"
                                            fill="#FF2D37"
                                        />
                                    </svg>
                                    info@example.com
                                </Link>
                            </li>
                        </ul>
                        <div className="header__top--right d-flex align-items-center">
                            <ul className="social__share style5 d-flex">
                                <li className="header__link--menu">
                                    <Link
                                        href="#"
                                        className="header__link--menu__text d-flex"
                                        to="/wishlist"
                                    >
                                        <AiOutlineHeart style={{ fontSize: "20px" }} />
                                        Wishlist
                                    </Link>
                                </li>
                                <li className="social__share--list">
                                    <Link
                                        className="social__share--icon"
                                        target="_blank"
                                        href="https://www.facebook.com/"
                                    >
                                        <BiLogoFacebook style={{ fontSize: "20px" }} />
                                    </Link>
                                </li>
                                <li className="social__share--list">
                                    <Link
                                        className="social__share--icon "
                                        target="_blank"
                                        href="https://twitter.com/"
                                    >
                                        <BiLogoTwitter style={{ fontSize: "20px" }} />
                                    </Link>
                                </li>
                                <li className="social__share--list">
                                    <Link
                                        className="social__share--icon "
                                        target="_blank"
                                        href="https://www.instagram.com/"
                                    >
                                        <BiLogoInstagramAlt style={{ fontSize: "20px" }} />
                                    </Link>
                                </li>
                                <li className="social__share--list">
                                    <Link
                                        className="social__share--icon "
                                        target="_blank"
                                        href="https://www.youtube.com/"
                                    >
                                        <BiLogoYoutube style={{ fontSize: "20px" }} />
                                    </Link>
                                </li>
                                <li className="social__share--list">
                                    <Link
                                        className="social__share--icon"
                                        target="_blank"
                                        href="https://www.pinterest.com/"
                                    >
                                        <BiLogoPinterest style={{ fontSize: "20px" }} />
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}   
