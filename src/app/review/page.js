'use client'
import { useRouter } from "next/navigation";
import Link from 'next/link';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CartList, InsuranceCompanyList, MakeOrderId, OrderComplete } from "@/api/services/apiServices";
import { addLoginCart, add_insurance_companyname, coupon_Pricevalue, removeAllAddtocart, removeAllLoginCart, remove_coupon_code } from "@/store/reducers/ProductSlice";
import { IoIosArrowBack } from "react-icons/io";
import { AiOutlineClose } from "react-icons/ai";
// import Breadcrumb from "../Utils/breadcrumb";
import { MdReviews } from "react-icons/md";
import { toast } from "react-toastify";
import { Banknote, CreditCard, Smartphone } from "lucide-react";
import { Button } from "@mui/material";

const Review = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const {
        coupon_code,
        login_cart,
        add_ship,
        selected_value_address,
        coupon_value,
        insurance_name
    } = useSelector((state) => ({ ...state.products }));
    const productsArray = [];
    login_cart.map((obj) => {
        const payload = {
            productId: obj?.product_id,
            price: obj?.price,
            qty: obj?.qty,
            // image: obj?.product?.images[0]?.image,
            name: obj?.product?.name,
            pn: obj?.product?.PN
        };
        productsArray.push(payload);
    });

    const user = JSON.parse(localStorage.getItem("USER"));
    const [orderId, setOrderId] = useState("");
    const [receipt, setReceipt] = useState("");
    const [currency, setCurrency] = useState("");
    const [razorpayPaymentId, setRazorpayPaymentId] = useState("");
    const [razorpaySignatureId, setRazorpaySignatureId] = useState("");
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState('');

    //
    const [isInsuranceOpen, setInsuranceOpen] = useState(false);
    const [Insuranceval, setInsuranceval] = useState(null);
    const [policyNumber, setpolicyNumber] = useState(null);
    const [carNumber, setcarNumber] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState('credit-card');

    const [type, setType] = useState('');

    const countTotal = (items) => {
        return items.reduce((acc, curr) => acc + curr.qty * curr.price, 0);
    }

    useEffect(() => {
        CartList().then((res) => {
            if (res.success) {
                dispatch(addLoginCart(res?.data));
            }
        });
        if (user?.data?.mobile) {
            setEmail(user?.data?.mobile);
        } else {
            setEmail(user?.data?.email);
        }

        InsuranceCompanyList().then((res) => {
            if (res.success) {
                dispatch(add_insurance_companyname(res?.data))
            }
        })

        window.scrollTo(0, 0);
    }, []);

    const handleCompleteOrder = (data) => {
        const payload = {
            use_for: type,
            insurance_id: Insuranceval ? parseInt(Insuranceval) : null,
            policy_number: policyNumber,
            car_number: carNumber,
            // coupon_code: coupon_value?.coupon,
            // coupon_value: coupon_value?.coupon_value,
            coupon_code: coupon_code?.coupon_code,
            coupon_value: coupon_code?.coupon_value,
            order_status: "placed",
            payment_status: "success",
            total_amount: data.amount,
            currency: data.currency,
            receipt_id: data.receipt,
            razorpay_payment_id: data.razorpay_payment_id,
            razorpay_order_id: data.razorpay_order_id,
            razorpay_signature: data.razorpay_signature,
            address_id: selected_value_address.id,
            products: JSON.stringify(productsArray),
        };
        console.log(payload, "payload of hamdlecomplete order");

        OrderComplete(payload).then((res) => {
            console.log(res, "order completed called");
            if (res?.success) {
                dispatch(removeAllLoginCart())
                localStorage.removeItem("rzp_device_id");
                localStorage.removeItem("rzp_checkout_anon_id");
                // navigate(`/thank-you/${data.razorpay_payment_id}`);
                router.push(`/thank-you/${data.razorpay_payment_id}`);
                // navigate("/");
            }
        });
    };

    const handleOpenRazorpay = (data) => {
        const options = {
            key: "rzp_test_AZtWJgBQanQ0EK",
            amount: parseInt(data.amount * 100),
            currency: data.currency,
            order_id: data.id,
            name: "Shopping App",
            image:
                "https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg",
            description: "Payment for the products you have purchased.",
            handler: function (response) {
                response["currency"] = data.currency;
                response["amount"] = data.amount / 100;
                response["receipt"] = data.receipt;
                setRazorpayPaymentId(response.razorpay_payment_id);
                setRazorpaySignatureId(response.razorpay_signature);
                handleCompleteOrder(response);
            },
            theme: {
                color: "#ebe4db",
            },
        };
        console.log(options, "handleOpenRazorpay razorpay");

        const rzp = new window.Razorpay(options);
        rzp.on("payment.failed", function (response) {
            console.log(response);
        });
        rzp.open();
    };

    const handleSubmit = () => {
        if (!type && !Insuranceval && !policyNumber) {
            // setErrors()
            toast.error("Please select Type of Insurance or Personal Use");
        } else {
            // debugger
            if (type == 'insurance') {
                if (!Insuranceval || !policyNumber || !carNumber) {

                    toast.error("Please select Insurance Company and Policy Number and Car number");
                    return;
                }
            }
            let data = {
                currency: "INR",
                amount:
                    Math.round(
                        (countTotal(login_cart) - countTotal(login_cart) * (coupon_code?.coupon_discount / 100) ? countTotal(login_cart) - (countTotal(login_cart) * (coupon_code?.coupon_discount / 100)).toFixed(2) : countTotal(login_cart))) * 100,
            };
            console.log(coupon_code.coupon_discount, "coupon_discount");
            console.log(countTotal(login_cart), "countTotal(login_cart)");
            console.log(coupon_code?.coupon_discount / 100, "coupon_code?.coupon_discount /100");

            console.log(data, "handlesubmit function is called")
            MakeOrderId(data).then((res) => {
                if (res?.success) {
                    setOrderId(res.data.id);
                    setReceipt(res.data.receipt);
                    setCurrency(res.data.currency);
                    handleOpenRazorpay(res.data);
                }
            });
        }
    };

    const handleChange = () => {
        setErrors("")
        setType('personal')
        setInsuranceOpen(false);
        setpolicyNumber('');
        setInsuranceval('')
        setcarNumber('');
    }

    const handleChange1 = (e) => {
        setType('insurance')
        setInsuranceOpen(true)
    }

    return (
        // <main className="margin_top_all">
        <main className="text-black">
            {/* Start checkout page area */}
            {login_cart?.length >= 1 ?
                <div className="checkout__page--area section--padding">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-7 col-md-6">
                                <div className="checkout__mian">
                                    <div className="checkout__content--step section__contact--information">
                                        <div className="section__header checkout__section--header d-flex align-items-center justify-content-between mb-25">
                                            <h2 className="section__header--title h3">
                                                Billing Details
                                            </h2>
                                        </div>
                                        <div className="customer__information">
                                            <div className="checkout__email--phone mb-12">
                                                <label>
                                                    <input
                                                        className="checkout__input--field border-radius-5"
                                                        placeholder="Email or mobile phone mumber"
                                                        type="text"
                                                        value={email}
                                                        disabled
                                                    />
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="checkout__content--step section__shipping--address">
                                        <label
                                            className="checkout__input--label"
                                            htmlFor="input1"
                                        >
                                            Select Type
                                            <span className="checkout__input--label__star">
                                                *
                                            </span>
                                        </label>
                                        <div className="d-flex justify-content-center gap-3">
                                            <button className={`${type == 'personal' ? 'selected_btn' : "personal_btn"}  `} onClick={handleChange}>Personal Use</button>
                                            <button className={`${type == 'insurance' ? 'selected_btn' : "personal_btn"}  `} onClick={handleChange1}>Insurance</button>
                                        </div>
                                        {errors && <span className="error">{errors}</span>}

                                        {
                                            isInsuranceOpen &&
                                            <div className="mt-3">
                                                <label
                                                    className="checkout__input--label"
                                                    htmlFor="input1"
                                                >
                                                    Insurance Company Name
                                                    <span className="checkout__input--label__star">
                                                        *
                                                    </span>
                                                </label>
                                                <div>
                                                    <select className="search__filter--select__field" onChange={(e) => setInsuranceval(e.target.value)}>
                                                        <option value={0}>Select Insurance Company</option>
                                                        {
                                                            insurance_name && insurance_name?.map((e, index) => {
                                                                return (
                                                                    <option value={e?.id} key={index}>{e?.name}</option>
                                                                )
                                                            })
                                                        }
                                                    </select>
                                                </div>
                                                <label
                                                    className="checkout__input--label mt-3"
                                                    htmlFor="input1"
                                                >
                                                    Claim Number
                                                    <span className="checkout__input--label__star">
                                                        *
                                                    </span>
                                                </label>
                                                <div>
                                                    <input className='policy_input' type="text" placeholder='Claim Number' value={policyNumber} onChange={(e) => setpolicyNumber(e.target.value)} />
                                                </div>
                                                <label
                                                    className="checkout__input--label mt-3"
                                                    htmlFor="input1"
                                                >
                                                    Car Number
                                                    <span className="checkout__input--label__star">
                                                        *
                                                    </span>
                                                </label>
                                                <div>
                                                    <input className='policy_input' type="text" placeholder='Car Number' value={carNumber} onChange={(e) => setcarNumber(e.target.value)} />
                                                    {/* <input className='policy_input' type="text" placeholder='Car Number' value={carNumber} onChange={handleCarNumberChange} /> */}
                                                    {/* {carNumberError && <span className="error">{carNumberError}</span>} Show error if any */}

                                                </div>
                                            </div>
                                        }
                                        <br />
                                        <hr />
                                        <div className="section__shipping--address__content mt-4">
                                            <div className="row">
                                                <div className="col-lg-6 col-md-6 col-sm-6 mb-20">
                                                    <div className="checkout__input--list ">
                                                        <label
                                                            className="checkout__input--label"
                                                            htmlFor="input1"
                                                        >
                                                            First Name
                                                            <span className="checkout__input--label__star">
                                                                *
                                                            </span>
                                                        </label>
                                                        <input
                                                            className="checkout__input--field border-radius-5"
                                                            placeholder="First name"
                                                            type="text"
                                                            value={selected_value_address?.first_name}
                                                            disabled
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-md-6 col-sm-6 mb-20">
                                                    <div className="checkout__input--list">
                                                        <label
                                                            className="checkout__input--label"
                                                            htmlFor="input2"
                                                        >
                                                            Last Name
                                                            <span className="checkout__input--label__star">
                                                                *
                                                            </span>
                                                        </label>
                                                        <input
                                                            className="checkout__input--field border-radius-5"
                                                            placeholder="Last name"
                                                            type="text"
                                                            value={selected_value_address?.last_name}
                                                            disabled
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-12 mb-20">
                                                    <div className="checkout__input--list">
                                                        <label
                                                            className="checkout__input--label"
                                                            htmlFor="input3"
                                                        >
                                                            Company Name
                                                            <span className="checkout__input--label__star">
                                                                *
                                                            </span>
                                                        </label>
                                                        <input
                                                            className="checkout__input--field border-radius-5"
                                                            placeholder="Company (optional)"
                                                            type="text"
                                                            value={selected_value_address?.company_name}
                                                            disabled
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-12 mb-20">
                                                    <div className="checkout__input--list">
                                                        <label
                                                            className="checkout__input--label"
                                                            htmlFor="input4"
                                                        >
                                                            Address
                                                            <span className="checkout__input--label__star">
                                                                *
                                                            </span>
                                                        </label>
                                                        <input
                                                            className="checkout__input--field border-radius-5"
                                                            placeholder="Address"
                                                            type="text"
                                                            value={selected_value_address?.address}
                                                            disabled
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 mb-20">
                                                    <div className="checkout__input--list">
                                                        <label
                                                            className="checkout__input--label"
                                                            htmlFor="input5"
                                                        >
                                                            City
                                                            <span className="checkout__input--label__star">
                                                                *
                                                            </span>
                                                        </label>
                                                        <input
                                                            className="checkout__input--field border-radius-5"
                                                            placeholder="City"
                                                            type="text"
                                                            value={selected_value_address?.city}
                                                            disabled
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 mb-20">
                                                    <div className="checkout__input--list">
                                                        <label
                                                            className="checkout__input--label"
                                                            htmlFor="input5"
                                                        >
                                                            State
                                                            <span className="checkout__input--label__star">
                                                                *
                                                            </span>
                                                        </label>
                                                        <input
                                                            className="checkout__input--field border-radius-5"
                                                            placeholder="State"
                                                            type="text"
                                                            value={selected_value_address?.state}
                                                            disabled
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 mb-20">
                                                    <div className="checkout__input--list">
                                                        <label
                                                            className="checkout__input--label"
                                                            htmlFor="input6"
                                                        >
                                                            Country/region
                                                            <span className="checkout__input--label__star">
                                                                *
                                                            </span>
                                                        </label>
                                                        <input
                                                            className="checkout__input--field border-radius-5"
                                                            placeholder="country"
                                                            type="text"
                                                            value={selected_value_address?.country}
                                                            disabled
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 mb-20">
                                                    <div className="checkout__input--list">
                                                        <label
                                                            className="checkout__input--label"
                                                            htmlFor="input6"
                                                        >
                                                            Pin Code
                                                            <span className="checkout__input--label__star">
                                                                *
                                                            </span>
                                                        </label>
                                                        <input
                                                            className="checkout__input--field border-radius-5"
                                                            placeholder="Pin code"
                                                            type="number"
                                                            value={selected_value_address?.pincode}
                                                            disabled
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="checkout__content--step__footer d-flex justify-content-between align-items-center">
                                        <Link className="previous__link--content d-flex align-items-center" href="/checkout">
                                            <IoIosArrowBack /> Return to Information
                                        </Link>
                                        <button
                                            className="continue__shipping--btn"
                                            id="rzp-button1"
                                            onClick={handleSubmit}
                                        >
                                            Continue To Payment
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-5 col-md-6">
                                <aside className="checkout__sidebar sidebar border-radius-10">
                                    <h2 className="checkout__order--summary__title text-center mb-15">
                                        Your Order Summary
                                    </h2>
                                    <div className="cart__table checkout__product--table">
                                        <table className="cart__table--inner">
                                            <tbody className="cart__table--body">
                                                {login_cart?.map((e, index) => {
                                                    return (
                                                        <tr className="cart__table--body__items" key={index}>
                                                            <td className="cart__table--body__list">
                                                                <div className="product__image two  d-flex align-items-center">
                                                                    <div className="product__thumbnail border-radius-5">
                                                                        <a className="display-block">
                                                                            <img
                                                                                className="display-block border-radius-5"
                                                                                // src={e?.product?.images[0].image}
                                                                                src='https://avatars.mds.yandex.net/i?id=1b4bc532efe7ab812edc8fbb4f3290913c22ff63-9149598-images-thumbs&n=13'
                                                                                alt="cart-product"
                                                                            />
                                                                        </a>
                                                                        <span className="product__thumbnail--quantity">
                                                                            {e?.qty}
                                                                        </span>
                                                                    </div>
                                                                    <div className="product__description">
                                                                        <h4 className="product__description--name">
                                                                            <p>{e?.product?.name}</p>
                                                                            <p>PN:- {e?.product?.PN}</p>
                                                                        </h4>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="cart__table--body__list">
                                                                <span className="cart__price">
                                                                    ₹ {(e?.price * e?.qty)?.toLocaleString("en-IN")}/-
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="checkout__total">
                                        <table className="checkout__total--table">
                                            <tbody className="checkout__total--body">
                                                <tr className="checkout__total--items">
                                                    <td className="checkout__total--title text-left">
                                                        Subtotal
                                                    </td>
                                                    <td className="checkout__total--amount text-right">
                                                        <h4>₹{countTotal(login_cart)?.toLocaleString("en-IN")}/-</h4>
                                                    </td>
                                                </tr>
                                                <tr className="checkout__total--items">
                                                    <td className="checkout__total--title text-left">
                                                        Discount {add_ship?.coupon}
                                                    </td>
                                                    <td className="checkout__total--calculated__text text-right">
                                                        ₹{countTotal(login_cart) *
                                                            (coupon_code?.coupon_discount / 100)
                                                            ? (
                                                                countTotal(login_cart) *
                                                                (coupon_code?.coupon_discount / 100)
                                                            ).toFixed(2)
                                                            : 0}
                                                        /-
                                                    </td>
                                                </tr>
                                            </tbody>
                                            <tfoot className="checkout__total--footer">
                                                <tr className="checkout__total--footer__items">
                                                    <td className="checkout__total--footer__title checkout__total--footer__list text-left">
                                                        Total
                                                    </td>
                                                    <td className="checkout__total--footer__amount checkout__total--footer__list text-right">
                                                        ₹{
                                                            Math.round((countTotal(login_cart) -
                                                                countTotal(login_cart) *
                                                                (coupon_code?.coupon_discount / 100)
                                                                ? countTotal(login_cart) -
                                                                (
                                                                    countTotal(login_cart) *
                                                                    (coupon_code?.coupon_discount / 100)
                                                                ).toFixed(2)
                                                                : countTotal(login_cart)))?.toLocaleString("en-IN")
                                                        }
                                                        /-
                                                    </td>
                                                </tr>
                                            </tfoot>
                                        </table>
                                    </div>

                                    <div className="payment__history mb-30">
                                        <h3 className="payment__history--title mb-20">Payment</h3>
                                        <ul className="payment__history--inner d-flex">
                                            <li className="payment__history--list">
                                                <button
                                                    className="payment__history--link continue__shipping--btn ms-2"
                                                    type="submit"
                                                >
                                                    Credit Card
                                                </button>
                                            </li>
                                            <li className="payment__history--list">
                                                <button
                                                    className="payment__history--link continue__shipping--btn ms-2"
                                                    type="submit"
                                                >
                                                    Bank Transfer
                                                </button>
                                            </li>
                                            <li className="payment__history--list">
                                                <button
                                                    className="payment__history--link continue__shipping--btn ms-2"
                                                    type="submit"
                                                >
                                                    Paypal
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                </aside>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <>
                    <img
                        style={{
                            marginLeft: "auto",
                            marginRight: "auto",
                            display: "block",
                        }}
                        src="https://nmkonline.com/images/pages/tumbleweed.gif"
                        alt=""
                    />
                </>
            }
        </main>
    );
};

export default Review;
