'use client'
import React from 'react'
import Link from 'next/link';
import { motion } from "framer-motion";


export default function Footer() {
    return (
        <>
            <footer className="footer__section footer__bg5 footer__color--style">
                <div className="container">
                    <div className="newsletter__area">
                        <div className="newsletter__inner d-flex justify-content-between align-items-center">
                            <div className="newsletter__content">
                                <motion.h2
                                    initial={{
                                        opacity: 0
                                        , y: -100
                                    }}
                                    whileInView={{
                                        opacity: 1,
                                        y: 0,
                                        transition: {
                                            duration: 1,
                                            delay: 0
                                        }
                                    }}
                                    className="newsletter__title">
                                    {/* Subscribe <span className="text__secondary">Newsletter</span> */}
                                    Subscribe to see secret deals prices drop the moment you sign up!

                                </motion.h2>
                                {/* <p className="newsletter__desc">
                                    Don’t wait make a smart &amp; logical quote here. Its pretty easy.
                                </p> */}
                            </div>
                            <motion.div
                                initial={{
                                    opacity: 0
                                    , y: 100
                                }}
                                whileInView={{
                                    opacity: 1,
                                    y: 0,
                                    transition: {
                                        duration: 1,
                                        delay: 0
                                    }
                                }}
                                className="newsletter__subscribe">
                                <form className="newsletter__subscribe--form" action="#">
                                    <label className='d-flex'>
                                        <input
                                            className="newsletter__subscribe--input"
                                            style={{ color: "black" }}
                                            placeholder=" Enter Your Email"
                                            type="text"
                                        />
                                    </label>
                                    <button className="newsletter__subscribe--button" disabled>
                                        Subscribe Now
                                    </button>
                                </form>
                            </motion.div>
                        </div>
                    </div>
                    <div className="main__footer">
                        <div className="row ">
                            <div className="col-lg-4 col-md-10">
                                <div className="footer__widget">
                                    <h2 className="footer__widget--title">
                                        About Us
                                        <button
                                            className="footer__widget--button"
                                            aria-label="footer widget button"
                                        />
                                    </h2>
                                    <div className="footer__widget--inner">
                                        <p className="footer__widget--desc">
                                            Corporate clients and leisure travelers has been relying on
                                            Groundlink for dependable safe, and professional chauffeured car
                                            end service in major cities across World.
                                        </p>
                                        <ul className="social__share footer__social d-flex">
                                            <li className="social__share--list">
                                                <a
                                                    className="social__share--icon__style2"
                                                    target="_blank"
                                                    href="https://www.facebook.com/"
                                                >
                                                    <svg
                                                        width={11}
                                                        height={17}
                                                        viewBox="0 0 9 15"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="M7.62891 8.625L8.01172 6.10938H5.57812V4.46875C5.57812 3.75781 5.90625 3.10156 7 3.10156H8.12109V0.941406C8.12109 0.941406 7.10938 0.75 6.15234 0.75C4.15625 0.75 2.84375 1.98047 2.84375 4.16797V6.10938H0.601562V8.625H2.84375V14.75H5.57812V8.625H7.62891Z"
                                                            fill="currentColor"
                                                        />
                                                    </svg>
                                                    <span className="visually-hidden">Facebook</span>
                                                </a>
                                            </li>
                                            <li className="social__share--list">
                                                <a
                                                    className="social__share--icon__style2"
                                                    target="_blank"
                                                    href="https://twitter.com/"
                                                >
                                                    <svg
                                                        width={16}
                                                        height={14}
                                                        viewBox="0 0 14 12"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="M12.5508 2.90625C13.0977 2.49609 13.5898 2.00391 13.9727 1.42969C13.4805 1.64844 12.9062 1.8125 12.332 1.86719C12.9336 1.51172 13.3711 0.964844 13.5898 0.28125C13.043 0.609375 12.4141 0.855469 11.7852 0.992188C11.2383 0.417969 10.5 0.0898438 9.67969 0.0898438C8.09375 0.0898438 6.80859 1.375 6.80859 2.96094C6.80859 3.17969 6.83594 3.39844 6.89062 3.61719C4.51172 3.48047 2.37891 2.33203 0.957031 0.609375C0.710938 1.01953 0.574219 1.51172 0.574219 2.05859C0.574219 3.04297 1.06641 3.91797 1.85938 4.4375C1.39453 4.41016 0.929688 4.30078 0.546875 4.08203V4.10938C0.546875 5.50391 1.53125 6.65234 2.84375 6.92578C2.625 6.98047 2.35156 7.03516 2.10547 7.03516C1.91406 7.03516 1.75 7.00781 1.55859 6.98047C1.91406 8.12891 2.98047 8.94922 4.23828 8.97656C3.25391 9.74219 2.02344 10.207 0.683594 10.207C0.4375 10.207 0.21875 10.1797 0 10.1523C1.25781 10.9727 2.76172 11.4375 4.40234 11.4375C9.67969 11.4375 12.5508 7.08984 12.5508 3.28906C12.5508 3.15234 12.5508 3.04297 12.5508 2.90625Z"
                                                            fill="currentColor"
                                                        />
                                                    </svg>
                                                    <span className="visually-hidden">Twitter</span>
                                                </a>
                                            </li>
                                            <li className="social__share--list">
                                                <a
                                                    className="social__share--icon__style2"
                                                    target="_blank"
                                                    href="https://www.instagram.com/"
                                                >
                                                    <svg
                                                        width={16}
                                                        height={15}
                                                        viewBox="0 0 14 13"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="M7.125 3.60547C5.375 3.60547 3.98047 5.02734 3.98047 6.75C3.98047 8.5 5.375 9.89453 7.125 9.89453C8.84766 9.89453 10.2695 8.5 10.2695 6.75C10.2695 5.02734 8.84766 3.60547 7.125 3.60547ZM7.125 8.80078C6.00391 8.80078 5.07422 7.89844 5.07422 6.75C5.07422 5.62891 5.97656 4.72656 7.125 4.72656C8.24609 4.72656 9.14844 5.62891 9.14844 6.75C9.14844 7.89844 8.24609 8.80078 7.125 8.80078ZM11.1172 3.49609C11.1172 3.08594 10.7891 2.75781 10.3789 2.75781C9.96875 2.75781 9.64062 3.08594 9.64062 3.49609C9.64062 3.90625 9.96875 4.23438 10.3789 4.23438C10.7891 4.23438 11.1172 3.90625 11.1172 3.49609ZM13.1953 4.23438C13.1406 3.25 12.9219 2.375 12.2109 1.66406C11.5 0.953125 10.625 0.734375 9.64062 0.679688C8.62891 0.625 5.59375 0.625 4.58203 0.679688C3.59766 0.734375 2.75 0.953125 2.01172 1.66406C1.30078 2.375 1.08203 3.25 1.02734 4.23438C0.972656 5.24609 0.972656 8.28125 1.02734 9.29297C1.08203 10.2773 1.30078 11.125 2.01172 11.8633C2.75 12.5742 3.59766 12.793 4.58203 12.8477C5.59375 12.9023 8.62891 12.9023 9.64062 12.8477C10.625 12.793 11.5 12.5742 12.2109 11.8633C12.9219 11.125 13.1406 10.2773 13.1953 9.29297C13.25 8.28125 13.25 5.24609 13.1953 4.23438ZM11.8828 10.3594C11.6914 10.9062 11.2539 11.3164 10.7344 11.5352C9.91406 11.8633 8 11.7812 7.125 11.7812C6.22266 11.7812 4.30859 11.8633 3.51562 11.5352C2.96875 11.3164 2.55859 10.9062 2.33984 10.3594C2.01172 9.56641 2.09375 7.65234 2.09375 6.75C2.09375 5.875 2.01172 3.96094 2.33984 3.14062C2.55859 2.62109 2.96875 2.21094 3.51562 1.99219C4.30859 1.66406 6.22266 1.74609 7.125 1.74609C8 1.74609 9.91406 1.66406 10.7344 1.99219C11.2539 2.18359 11.6641 2.62109 11.8828 3.14062C12.2109 3.96094 12.1289 5.875 12.1289 6.75C12.1289 7.65234 12.2109 9.56641 11.8828 10.3594Z"
                                                            fill="currentColor"
                                                        />
                                                    </svg>
                                                    <span className="visually-hidden">Instagram</span>
                                                </a>
                                            </li>
                                            <li className="social__share--list">
                                                <a
                                                    className="social__share--icon__style2"
                                                    target="_blank"
                                                    href="https://www.pinterest.com/"
                                                >
                                                    <svg
                                                        width={16}
                                                        height={17}
                                                        viewBox="0 0 14 15"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="M13.5625 7.75C13.5625 4.00391 10.5273 0.96875 6.78125 0.96875C3.03516 0.96875 0 4.00391 0 7.75C0 10.6484 1.77734 13.082 4.29297 14.0664C4.23828 13.5469 4.18359 12.7266 4.32031 12.125C4.45703 11.6055 5.11328 8.76172 5.11328 8.76172C5.11328 8.76172 4.92188 8.35156 4.92188 7.75C4.92188 6.82031 5.46875 6.10938 6.15234 6.10938C6.72656 6.10938 7 6.54688 7 7.06641C7 7.64062 6.61719 8.51562 6.42578 9.33594C6.28906 9.99219 6.78125 10.5391 7.4375 10.5391C8.64062 10.5391 9.57031 9.28125 9.57031 7.44922C9.57031 5.80859 8.39453 4.6875 6.75391 4.6875C4.8125 4.6875 3.69141 6.13672 3.69141 7.61328C3.69141 8.21484 3.91016 8.84375 4.18359 9.17188C4.23828 9.22656 4.23828 9.30859 4.23828 9.36328C4.18359 9.58203 4.04688 10.0469 4.04688 10.1289C4.01953 10.2656 3.9375 10.293 3.80078 10.2383C2.95312 9.82812 2.43359 8.59766 2.43359 7.58594C2.43359 5.45312 3.99219 3.48438 6.91797 3.48438C9.26953 3.48438 11.1016 5.17969 11.1016 7.42188C11.1016 9.74609 9.625 11.6328 7.57422 11.6328C6.89062 11.6328 6.23438 11.2773 6.01562 10.8398C6.01562 10.8398 5.6875 12.1523 5.60547 12.4531C5.44141 13.0547 5.03125 13.793 4.75781 14.2305C5.38672 14.4492 6.07031 14.5312 6.78125 14.5312C10.5273 14.5312 13.5625 11.4961 13.5625 7.75Z"
                                                            fill="currentColor"
                                                        />
                                                    </svg>
                                                    <span className="visually-hidden">Pinterest</span>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-4">
                                <div className="footer__widget">
                                    <h2 className="footer__widget--title ">
                                        My Account
                                        <button
                                            className="footer__widget--button"
                                            aria-label="footer widget button"
                                        />
                                    </h2>
                                    <ul className="footer__widget--menu footer__widget--inner">

                                        <li className="footer__widget--menu__list">
                                            <a className="footer__widget--menu__text" href="/cart">
                                                Shopping Cart
                                            </a>
                                        </li>
                                        <li className="footer__widget--menu__list">
                                            <Link className="footer__widget--menu__text" href="/#">
                                                Login
                                            </Link>
                                        </li>
                                        <li className="footer__widget--menu__list">
                                            <Link className="footer__widget--menu__text" href="/#">
                                                Register
                                            </Link>
                                        </li>
                                        <li className="footer__widget--menu__list">
                                            <a className="footer__widget--menu__text" href="#">
                                                Checkout
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-4">
                                <div className="footer__widget">
                                    <h2 className="footer__widget--title ">
                                        Resources
                                        <button
                                            className="footer__widget--button"
                                            aria-label="footer widget button"
                                        />
                                    </h2>
                                    <ul className="footer__widget--menu footer__widget--inner">
                                        <li className="footer__widget--menu__list">
                                            <Link className="footer__widget--menu__text" href="/#">
                                                Contact Us
                                            </Link>
                                        </li>
                                        <li className="footer__widget--menu__list">
                                            <Link className="footer__widget--menu__text" href="/#" >
                                                About Us
                                            </Link>
                                        </li>
                                        <li className="footer__widget--menu__list">
                                            <Link
                                                className="footer__widget--menu__text"
                                                href="/#"
                                            >
                                                Privacy Policy
                                            </Link>
                                        </li>
                                        <li className="footer__widget--menu__list">
                                            <a className="footer__widget--menu__text" href='#'>
                                                Frequently
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-2 col-md-4">
                                <div className="footer__widget">
                                    <h2 className="footer__widget--title ">
                                        Useful links
                                        <button
                                            className="footer__widget--button"
                                            aria-label="footer widget button"
                                        />
                                    </h2>
                                    <ul className="footer__widget--menu footer__widget--inner">
                                        <li className="footer__widget--menu__list">

                                            <a className="footer__widget--menu__text" href="#">
                                                Articles
                                            </a>
                                        </li>
                                        <li className="footer__widget--menu__list">

                                            <a className="footer__widget--menu__text" href='#'>
                                                Brands
                                            </a>
                                        </li>
                                        <li className="footer__widget--menu__list">
                                            <a className="footer__widget--menu__text" href='#'>
                                                Catalogues
                                            </a>
                                        </li>
                                        <li className="footer__widget--menu__list">
                                            <a className="footer__widget--menu__text" href='#'>
                                                Car Makers
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer__bottom">
                    <div className="container">
                        <div className="footer__bottom--inenr d-flex justify-content-between align-items-center">
                            <p className="copyright__content">
                                <span className="text__secondary">© 2024</span> Powered by &nbsp;
                                <a
                                    className="copyright__content--link"
                                    // target="_blank"
                                    href="/"
                                >
                                    Iconfisys
                                </a>
                                . All Rights Reserved.
                            </p>
                            {/* <div className="footer__payment">
                                <img src="assets/img/icon/payment-img.webp" alt="payment-img" />
                            </div> */}
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}
