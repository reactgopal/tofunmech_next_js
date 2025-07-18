'use client'

import { AddOrderList } from "@/api/services/apiServices";
import { addOrderDetails } from "@/store/reducers/ProductSlice";
import Invoice from "@/utils/Invoice";
import { BlobProvider } from "@react-pdf/renderer";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function MyOrders() {
    const router = useRouter();
    const dispatch = useDispatch();
    const { order_list } = useSelector((state) => ({ ...state.products }));
    console.log(order_list, "order list ");
    useEffect(() => {
        AddOrderList().then((res) => {
            if (res?.success) {
                dispatch(addOrderDetails(res?.data));
            } else {
                console.log(res?.message);
            }
        })
        window.scrollTo(0, 0);
    }, []);
    return (
        <div>
            <section className="order-history">
                <div className="container">
                    <div className="order-filters">
                        {/* <h2 className="order-history-title h2">Your Orders</h2> */}
                    </div>
                    {
                        order_list.length > 0 ? (
                            <div className="order-list">
                                <div className="order-card_main">
                                    {
                                        order_list?.map((order, index) => (
                                            <div className="order-card__area" key={index}>
                                                {/* Order Header */}
                                                <div className="order-header">
                                                    <span>ORDER PLACED: <b>{new Date(order?.created_at).toLocaleString()}</b></span>
                                                    <span>TOTAL: ₹{order?.total_amount}/-</span>
                                                    <span>SHIP TO: <b>{order?.name.toUpperCase()}</b></span>
                                                </div>
                                                {/* Order Content */}
                                                <div className="second-order-section">
                                                    <div className="order-content">
                                                        <div className="order-details">
                                                            {
                                                                order?.order_detail?.map((product, index) => (
                                                                    <div className="product-item border border-radius-10 mt-1" key={index}>
                                                                        {/* Product Image */}
                                                                        <div className="order-image">
                                                                            <img src="/assets/img/shop-list/1.webp" alt="product" />
                                                                        </div>
                                                                        {/* Product Info */}
                                                                        <div className="product-info">
                                                                            <p><strong>{product?.product_name}</strong></p>
                                                                            <p>Price: ₹{product?.price}/-</p>
                                                                            <p>Quantity: {product?.qty}</p>
                                                                        </div>
                                                                        {/* Review Button */}
                                                                        <div className="order-footer mt-auto">
                                                                            <Link href={`/customer/${product?.product_id}`}>
                                                                                {/* <button className="btn"> */}
                                                                                    Write a product review
                                                                                {/* </button> */}
                                                                            </Link>
                                                                        </div>
                                                                    </div>
                                                                ))
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* Order Footer */}
                                                <div className="order-footer">
                                                    {/* <a href="#" target="_blank" rel="noopener noreferrer">
                                                        Download Invoice
                                                    </a> */}
                                                    {order && typeof order === 'object' && (
                                                        <BlobProvider document={<Invoice order={order} />}>
                                                            {({ url, loading, error }) => {
                                                                if (loading) return <span>Loading PDF...</span>;
                                                                if (error) return <span>Error generating PDF</span>;
                                                                return (
                                                                    <a href={url} target="_blank" rel="noopener noreferrer">
                                                                        Download Invoice
                                                                    </a>
                                                                );
                                                            }}
                                                        </BlobProvider>
                                                    )}
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        ) : (
                            <p>No orders found</p>
                        )
                    }
                </div>
            </section>
        </div>
    );
}