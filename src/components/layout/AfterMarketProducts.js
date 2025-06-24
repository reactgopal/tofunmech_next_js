'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from "swiper/modules";
import { motion } from "framer-motion";


export default function AfterMarketProducts() {
    return (
        <div className="section--padding">
            <div className="container">
                <div>
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
                        className="brand__title">
                        <h3 className='section__heading--maintitle'>Aftermarket Products</h3>
                        <p>Unveil the Finest Selection of High-End Vehicles</p>
                    </motion.div>
                </div>
                <div className='brand__slider position-relative'>
                    <div className="swiper__button_main">
                        <div className="custom-swiper-button-prev custom-swiper-button">‹</div>
                        <div className="custom-swiper-button-next custom-swiper-button">›</div>
                    </div>

                    <Swiper
                        modules={[Autoplay, Navigation]} // ✅ Add Autoplay module here
                        spaceBetween={50}
                        slidesPerView={3}
                        loop={true}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                        }}
                        navigation={{
                            nextEl: ".custom-swiper-button-next",  // 👈 custom class
                            prevEl: ".custom-swiper-button-prev",  // 👈 custom class
                        }}
                        breakpoints={{
                            320: {
                                slidesPerView: 1,
                                spaceBetween: 20,
                            },
                            576: {
                                slidesPerView: 1,
                                spaceBetween: 30,
                            },
                            768: {
                                slidesPerView: 2,
                                spaceBetween: 40,
                            },
                            992: {
                                slidesPerView: 2,
                                spaceBetween: 50,
                            },
                            1200: {
                                slidesPerView: 3,
                                spaceBetween: 60,
                            },
                        }}


                        className="mySwiper"
                    >
                        <SwiperSlide>
                            {/* card ui goes here */}
                            <div className="card">
                                <div className='card-img'>
                                    <img src="/assets/img/aftermarket/img-1.png" alt="" />
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">1 Special title treatment</h5>
                                    <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                                    <a href="#" className="btn btn-primary2">View Details</a>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="card">
                                <div className='card-img'>
                                    <img src="/assets/img/aftermarket/img-2.png" alt="" />
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">1 Special title treatment</h5>
                                    <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                                    <a href="#" className="btn btn-primary2">View Details</a>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="card">
                                <div className='card-img'>
                                    <img src="/assets/img/aftermarket/img-3.png" alt="" />
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">1 Special title treatment</h5>
                                    <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                                    <a href="#" className="btn btn-primary2">View Details</a>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="card">
                                <div className='card-img'>
                                    <img src="/assets/img/aftermarket/img-4.png" alt="" />
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">1 Special title treatment</h5>
                                    <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                                    <a href="#" className="btn btn-primary2">View Details</a>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="card">
                                <div className='card-img'>
                                    <img src="/assets/img/aftermarket/img-5.png" alt="" />
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">1 Special title treatment</h5>
                                    <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                                    <a href="#" className="btn btn-primary2">View Details</a>
                                </div>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
        </div>
    );
}
