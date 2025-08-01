'use client'
import { useRouter } from 'next/navigation'

import { Add_To_cart_Login, LogIn } from "@/api/services/apiServices";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { addLoginCart, removeAllAddtocart } from '@/store/reducers/ProductSlice';
import Link from 'next/link';

export default function Login() {
    const dispatch = useDispatch();
    const router = useRouter();
    const [emailNumber, setEmailNumber] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const guestCart = useSelector((state) => state.products.addto_cart); // 👈 guest cart
    console.log(guestCart, "guestCart");
    useEffect(() => {
        const user = localStorage.getItem('USER');
        if (user) {
            router.replace('/'); // or '/dashboard'
        }
    }, []);

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     let data = {
    //         username: emailNumber,
    //         password: password
    //     }
    //     LogIn(data).then((res) => {
    //         if (res.success) {
    //             localStorage.setItem("USER", JSON.stringify(res));
    //             toast.success(res.message);
    //             router.push("/");
    //         } else {
    //             setError(res.message);
    //             // toast.error(res.message || "Your are not login");
    //             toast.error(res.message);
    //         }
    //     })
    // }
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            username: emailNumber,
            password: password,
        };

        LogIn(data).then(async (res) => {
            if (res.success) {
                localStorage.setItem("USER", JSON.stringify(res));
                toast.success(res.message);

                // 🔥 Merge guest cart
                if (guestCart.length > 0) {
                    try {
                        const fixedCart = guestCart.map(item => ({
                            ...item,
                            id: item.proId,
                        }));
                        await Add_To_cart_Login(fixedCart);
                        dispatch(addLoginCart(fixedCart));
                        dispatch(removeAllAddtocart());
                    } catch (err) {
                        console.error("Cart merge error:", err);
                    }
                }

                router.push("/");
            } else {
                setError(res.message);
                toast.error(res.message);
            }
        });
    };


    return (
        <div className="section--padding">
            <div className="container">
                <div className="row">
                    <div className="col-lg-5 mx-auto">
                        <div className="login__area">
                            <div className="login-content">
                                <div className="text-center">
                                    <p className="text__subtitle">Sign in</p>
                                    <h4 className="text__title">Welcome back</h4>
                                </div>
                                <div className="form-login mt-30">
                                    <form action="#" onSubmit={handleSubmit}>
                                        <div className="form-group">
                                            <input type="text" className="form-control username" value={emailNumber} onChange={(e) => setEmailNumber(e.target.value)} placeholder="Phone Number or email" />
                                        </div>
                                        <div className="form-group">
                                            <input type="password" className="form-control password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                                        </div>
                                        <div className="form-group">
                                            <div className="box-remember-forgot">
                                                <div className="remeber-me">
                                                    <label className="d-flex">
                                                        <input type="checkbox" className="cd-remember" />
                                                        Remember me
                                                    </label>
                                                </div>
                                                <div className="forgotpass">
                                                    <a href="#">Forgot password?</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group login__btn_main">
                                            <button type="submit" className="login__btn w-100">Sign in
                                                <svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="__web-inspector-hide-shortcut__">
                                                    <path d="M8 15L15 8L8 1M15 8L1 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                                    </path>
                                                </svg>

                                            </button>

                                        </div>
                                        <p className="text-md-medium neutral-500 text-center">Or connect with your social account</p>
                                        <div className="box-button-logins">
                                            <a className="btn btn-login btn-google mr-10" href="#">
                                                <img src="/assets/img/icons/google.svg" alt="Carento" />
                                                <span className="text-sm-bold d-none d-md-block"> Sign up with Google</span>
                                            </a>
                                            <a className="btn btn-login mr-10" href="#">
                                                <img src="/assets/img/icons/facebook.svg" alt="Carento" />
                                            </a>
                                            <a className="btn btn-login" href="#">
                                                <img src="/assets/img/icons/apple.svg" alt="Carento" />
                                            </a>
                                        </div>
                                        <p className="login__subtext text-center">Don’t have an account? <Link className="neutral-1000" href="/register"> Register Here !</Link>
                                        </p>

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
