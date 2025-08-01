"use client"
import React, { useState } from "react";
import { AddReviewList } from "@/api/services/apiServices";
// import { addReview } from "../store/reducers/ProductSlice";
import { useDispatch } from "react-redux";
import { Rating } from "@mui/material";
import { useParams } from "next/navigation";
import PageBreadcrumb from "@/utils/PageBreadcrumbs";

const CustomerReview = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    console.log(id, "user params");
    const [rating, setRating] = useState(0);
    const [nickname, setNickname] = useState('');
    const [summary, setSummary] = useState('');
    const [review, setReview] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        let data = {
            product_id: id, // replace with actual product id
            rating: rating,
            text: review
        };
        console.log(data, "data of porduct review")
        // dispatch(addReview(data));
        AddReviewList(data).then((res) => {
            if (res.success) {
                alert(res.message);
            }
        });
        // check if user is logged in
    }
    return (
        <div className="margin_top_all product__reviews--header">
            <div className="breadcrumb-section breadcrumb__bg">
                <div className="container">
                    <PageBreadcrumb />
                </div>
            </div>
            <section className="my__account--section ">
                <div className="container">
                    <div className="my__account--section__inner">
                        <div className="review-form reviews__comment--area">
                            {/* <form onSubmit={handleSubmit}>
                                <div className="nickname-section reviews__comment--content">
                                    <h3>Rating</h3>
                                    <div className="rating-stars">
                                        <Rating
                                            name="rating"
                                            size="large"
                                            // defaultValue={2}
                                            // precision={0.5}
                                            value={rating}
                                            onChange={(event) => setRating(event.target.value)}
                                            sx={{
                                                fontSize: 36, // increase the font size to make the stars larger
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="nickname-section reviews__comment--content">
                                    <h3 className="mb-3">Nickname</h3>
                                    <input type="text" placeholder="Enter your nickname" className="reviews__comment--reply__input" value={nickname} onChange={(event) => setNickname(event.target.value)} />
                                </div>
                                <div className="summary-section reviews__comment--content">
                                    <h3 className="my-3">Summary</h3>
                                    <input type="text" placeholder="Enter summary of your review" className="reviews__comment--reply__input" value={summary} onChange={(event) => setSummary(event.target.value)} />
                                </div>
                                <div className="review-section reviews__comment--content">
                                    <h3 className="mt-3">Review</h3>
                                    <textarea rows={10} placeholder="Enter your review" className="reviews__comment--reply__textarea" value={review} onChange={(event) => setReview(event.target.value)} />
                                </div>
                                <div className="submit-section reviews__comment--list d-flex justify-content-center ">
                                    <button type="submit" className="review__btn">Submit Review</button>
                                </div>
                            </form> */}
                            <form onSubmit={handleSubmit}>
                                {/* Rating */}
                                <div className="reviews__comment--content">
                                    <label className="reviews__label">
                                        <h3 className="reviews__field--title">Rating</h3>
                                        <Rating
                                            name="rating"
                                            size="large"
                                            value={rating}
                                            precision={0.5}
                                            onChange={(event, newValue) => setRating(newValue)}
                                            sx={{ fontSize: 36 }}
                                        />
                                    </label>
                                </div>

                                {/* Nickname */}
                                <div className="reviews__comment--content">
                                    <label className="reviews__label">
                                        <h3 className="reviews__field--title">Nickname</h3>
                                        <input
                                            type="text"
                                            placeholder="Enter your nickname"
                                            className="reviews__comment--reply__input"
                                            value={nickname}
                                            onChange={(e) => setNickname(e.target.value)}
                                        />
                                    </label>
                                </div>

                                {/* Summary */}
                                <div className="reviews__comment--content">
                                    <label className="reviews__label">
                                        <h3 className="reviews__field--title">Summary</h3>
                                        <input
                                            type="text"
                                            placeholder="Enter summary of your review"
                                            className="reviews__comment--reply__input"
                                            value={summary}
                                            onChange={(e) => setSummary(e.target.value)}
                                        />
                                    </label>
                                </div>

                                {/* Review Text */}
                                <div className="reviews__comment--content">
                                    <label className="reviews__label">
                                        <h3 className="reviews__field--title">Review</h3>
                                        <textarea
                                            placeholder="Enter your review"
                                            rows={6}
                                            className="reviews__comment--reply__textarea"
                                            value={review}
                                            onChange={(e) => setReview(e.target.value)}
                                        />
                                    </label>
                                </div>

                                {/* Submit Button */}
                                <div className="submit-section reviews__comment--list d-flex justify-content-center">
                                    <button type="submit" className="review__btn">Submit Review</button>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </section >
        </div >
    );
};

export default CustomerReview;
