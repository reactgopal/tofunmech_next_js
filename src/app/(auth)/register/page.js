'use client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from "react";

import HideShow from "@/utils/HideShow";
import { Register } from "@/api/services/apiServices";
import { toast } from 'react-toastify';


export default function RegisterForm() {

    const router = useRouter();


    const [email, setEmail] = useState('');
    const [number, setNumber] = useState('');
    const [passwordShown, setPasswordShown] = useState(false);
    const [password, setPassword] = useState('');
    const [cpassword, setCpassword] = useState('');
    const [type, setType] = useState('');
    const [error, setError] = useState('');

    // hide and show input field
    const [isopen, setIsopen] = useState(true);
    const [isopen1, setIsopen1] = useState(true);

    useEffect(() => {
        const user = localStorage.getItem('USER');
        if (user) {
            router.replace('/'); // or '/dashboard'
        }
    }, [])

    const handleChange = (e) => {
        e.preventDefault();
        setEmail(e.target.value);
        setType('email')
        if (e.target.value.length > 0) {
            console.log("zero")
            setIsopen1(false);
        } else {
            setIsopen(true);

        }
    }
    const handleChange1 = (e) => {
        e.preventDefault();
        setNumber(e.target.value);
        setType('mobile')
        if (e.target.value.length > 0) {
            console.log("zero")
            setIsopen(false);
        } else {
            setIsopen1(true);

        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        let data = {
            type: type,
            ...type === "email" ? { email: email } : { mobile: number },
            password: password,
            device_type: 'web',
            device_token: 'abcd'
        }
        if (password === cpassword) {
            Register(data).then((res) => {
                console.log("res----", res);
                if (res.success) {
                    console.log(res);
                    localStorage.setItem("USER", JSON.stringify(res));
                    toast.success("Register successfully!");
                    router.push("/");
                    // window.location.reload();
                } else {
                    setError(res.message);
                    toast.error(res.message || "Your are not  registered.");
                }
            });
        } else {
            toast.error("please match password");
        }
    }
    return (
        <div className="section--padding">
            <div className="container">
                <div className="row">
                    <div className="col-lg-5 mx-auto">
                        <div className="login__area">
                            <div className="login-content">
                                <div className="text-center">
                                    <p className="text__subtitle">Register</p>
                                    <h4 className="text__title">Create an Account</h4>
                                </div>
                                <div className="form-login mt-30">
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-group">
                                            {
                                                isopen ? <input type="text" className="form-control username" value={email} onChange={handleChange} placeholder="Email" /> : " "
                                            }

                                        </div>

                                        {
                                            isopen & isopen1 ? <div className="my-5">
                                                <p className="position-absolute  text-black " style={{ left: "49.2%", transform: "translateX(-50%)", top: "26.5%", transform: "translateY(-50%)" }}>OR</p>
                                                <hr className="position-relative" />
                                            </div> : ""
                                        }

                                        <div className="form-group">
                                            {
                                                isopen1 ? <input type="text" className="form-control username" value={number} onChange={handleChange1} placeholder="+91 Mobile Number" /> : ""
                                            }

                                        </div>
                                        <div className="form-group">
                                            <HideShow {...{ passwordShown, setPasswordShown }}>
                                                <input type={passwordShown ? "text" : "password"} className="form-control password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                                            </HideShow>
                                        </div>
                                        <div className="form-group">
                                            <HideShow {...{ passwordShown, setPasswordShown }}>
                                                <input type={passwordShown ? "text" : "password"} className="form-control password" value={cpassword} onChange={(e) => setCpassword(e.target.value)} placeholder="Confirm Password" />
                                            </HideShow>
                                        </div>
                                        <div className="form-group">
                                            <div className="box-remember-forgot">
                                                <div className="remeber-me">
                                                    <label className="d-flex">
                                                        <input type="checkbox" className="cd-remember" />
                                                        I agree to term and conditions
                                                    </label>
                                                </div>
                                                <div className="forgotpass">

                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group login__btn_main">
                                            <button type="submit" className="login__btn w-100">Sign in
                                                {/* <svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="__web-inspector-hide-shortcut__">
                                                    <path d="M8 15L15 8L8 1M15 8L1 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                                    </path>
                                                </svg> */}

                                            </button>

                                        </div>
                                        <p className="text-md-medium neutral-500 text-center">Or connect with your social account</p>
                                        <div className="box-button-logins">
                                            <a className="btn btn-login btn-google mr-10" href="#">
                                                <img src="/assets/img/icons/google.svg" alt="Carento" />
                                                <span className="text-sm-bold">Sign up with Google</span>
                                            </a>
                                            <a className="btn btn-login mr-10" href="#">
                                                <img src="/assets/img/icons/facebook.svg" alt="Carento" />
                                            </a>
                                            <a className="btn btn-login" href="#">
                                                <img src="/assets/img/icons/apple.svg" alt="Carento" />
                                            </a>
                                        </div>
                                        <p className="login__subtext text-center">Don’t have an account? <a className="neutral-1000" href="/login"> Login Here !</a>
                                        </p>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <h1>
                Login page  
            </h1> */}
        </div>
    );
}
