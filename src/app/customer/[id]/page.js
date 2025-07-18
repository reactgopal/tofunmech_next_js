"use client"
import React, { useState } from "react";
import { AddReviewList } from "@/api/services/apiServices";
// import { addReview } from "../store/reducers/ProductSlice";
import { useDispatch } from "react-redux";
import { Rating } from "@mui/material";
import { useParams } from "next/navigation";

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
        <div className="product__reviews--header">
            <section className="my__account--section section--padding">
                <div className="container">
                    <div className="my__account--section__inner">
                        <h2 className="account__content--title h3 mb-20">Customer Review</h2>
                        <div className="review-form reviews__comment--area">
                            <form onSubmit={handleSubmit}>
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
                                        {/* <select value={rating} onChange={(event) => setRating(event.target.value)}>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                                </select> */}
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
                            </form>
                        </div>
                    </div>
                </div>
            </section >
        </div >
    );
};

export default CustomerReview;
