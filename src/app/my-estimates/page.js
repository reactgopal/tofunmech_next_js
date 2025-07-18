'use client'
import React, { useEffect, useRef, useState } from "react";
import { EstimateOrdersList } from "@/api/services/apiServices";
import { dateFormate } from "@/utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { addEstimate, addOrderDetails, removeAllEastimate } from "@/store/reducers/ProductSlice";
import { MdOutlineFileDownload } from "react-icons/md";
import { toast } from "react-toastify";
import EstimateInvoice from "@/components/pdf/EstimateInvoice";
import { BlobProvider } from "@react-pdf/renderer";


const MyEstimates = () => {
    const dispatch = useDispatch();
    const { estimate_list } = useSelector((state) => ({ ...state.products }));
    console.log(estimate_list, "-----------------------");
    useEffect(() => {
        dispatch(removeAllEastimate())
        EstimateOrdersList().then((res) => {
            console.log(res);
            if (res.success) {
                dispatch(addEstimate(res?.data))
            } else {
                // dispatch(addEstimate([]))
                toast.error(res.message);
            }
        })
        window.scrollTo(0, 0);

    }, [])





    return (
        <div className="">
            {/*  <!-- my account section start --> */}
            <section className="my__account--section section--padding">
                <div className="container">
                    <div className="my__account--section__inner border-radius-10 d-flex">
                        <div className="account__wrapper">
                            <div className="account__content">
                                <h2 className="account__content--title h3 mb-20">Estimates History</h2>
                                <div className="account__table--area">
                                    {
                                        estimate_list?.length > 0 ?
                                            <>
                                                <table className="account__table">
                                                    <thead className="account__table--header">
                                                        <tr className="account__table--header__child">
                                                            <th className="account__table--header__child--items">
                                                                Estimate ID
                                                            </th>
                                                            <th className="account__table--header__child--items">Date</th>
                                                            <th className="account__table--header__child--items">
                                                                Total Items
                                                            </th>
                                                            <th className="account__table--header__child--items">
                                                                Total Amount
                                                            </th>
                                                            <th className="account__table--header__child--items">
                                                                Invoice
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="account__table--body mobile__none" >
                                                        {
                                                            estimate_list?.map((e, index) => {
                                                                return (
                                                                    <tr className="account__table--body__child" key={index}>
                                                                        <td className="account__table--body__child--items">{e?.uniqid}</td>
                                                                        <td className="account__table--body__child--items">
                                                                            {dateFormate(e?.created_at)}
                                                                        </td>
                                                                        <td className="account__table--body__child--items">
                                                                            {e?.products?.length}
                                                                        </td>
                                                                        <td className="account__table--body__child--items">{(e?.final_total)} /-</td>
                                                                        <td className="account__table--body__child--items">
                                                                            <BlobProvider
                                                                                document={<EstimateInvoice order={e.products} total={e?.final_total} />}
                                                                            >
                                                                                {({ blob, url, loading, error }) => (
                                                                                    <a
                                                                                        href={url}
                                                                                        target="_blank"
                                                                                        style={{
                                                                                            backgroundColor: "lightblue",
                                                                                            padding: "0px 12px",
                                                                                            fontSize: "1.5rem",
                                                                                            fontWeight: "500",
                                                                                            borderRadius: "10px",
                                                                                        }}
                                                                                    >
                                                                                        <MdOutlineFileDownload size={20} />
                                                                                    </a>
                                                                                )}
                                                                            </BlobProvider>
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            })
                                                        }
                                                    </tbody>
                                                    <tbody className="account__table--body mobile__block">
                                                        {
                                                            estimate_list?.map((e, index) => {
                                                                return (
                                                                    <tr className="account__table--body__child" key={index}>
                                                                        <td className="account__table--body__child--items">
                                                                            <strong>Estimate ID</strong>
                                                                            <span>{e?.uniqid}</span>
                                                                        </td>
                                                                        <td className="account__table--body__child--items">
                                                                            <strong>Date</strong>
                                                                            <span>{dateFormate(e?.created_at)}</span>
                                                                        </td>
                                                                        <td className="account__table--body__child--items">
                                                                            <strong>Total Items</strong>
                                                                            <span> {e?.products?.length}</span>
                                                                        </td>
                                                                        <td className="account__table--body__child--items">
                                                                            <strong>Total Amount</strong>
                                                                            <span>{(e?.final_total)}</span>
                                                                        </td>
                                                                        <td className="account__table--body__child--items">
                                                                            <strong>Invoice No</strong>
                                                                            <BlobProvider
                                                                                document={<EstimateInvoice order={e.products} total={e?.final_total} />}
                                                                            >
                                                                                {({ blob, url, loading, error }) => (
                                                                                    <a
                                                                                        href={url}
                                                                                        target="_blank"
                                                                                        style={{
                                                                                            backgroundColor: "lightblue",
                                                                                            padding: "0px 12px",
                                                                                            fontSize: "1rem",
                                                                                            fontWeight: "500",
                                                                                            borderRadius: "10px",
                                                                                        }}
                                                                                    >
                                                                                        <MdOutlineFileDownload size={16} />
                                                                                    </a>
                                                                                )}
                                                                            </BlobProvider>
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            })
                                                        }
                                                    </tbody>
                                                </table>
                                            </>
                                            :
                                            <>
                                                <p>No Record Found</p>
                                            </>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
        </div >
    );
};

export default MyEstimates;
