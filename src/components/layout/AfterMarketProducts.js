'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { motion } from 'framer-motion';
import 'swiper/css';
import 'swiper/css/navigation';

// Container controls stagger
const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.2,
        },
    },
};

// Card animation: fade in from left
const cardVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: (i) => ({
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.6,
            delay: i * 0.2,
            ease: 'easeOut',
        },
    }),
};

export default function AfterMarketProducts() {
    const products = [
        { id: 1, img: '/assets/img/aftermarket/img-1.png' },
        { id: 2, img: '/assets/img/aftermarket/img-2.png' },
        { id: 3, img: '/assets/img/aftermarket/img-3.png' },
        { id: 4, img: '/assets/img/aftermarket/img-4.png' },
        { id: 5, img: '/assets/img/aftermarket/img-5.png' },
    ];

    return (
        <div className="section--padding">
            <div className="container">
                {/* Section Title */}
                <motion.div
                    whileInView="visible"
                    initial="hidden"
                    viewport={{ once: true, amount: 0.6 }}
                    className="brand__title"
                >
                    <h3 className="section__heading--maintitle">Aftermarket Products</h3>
                    <p>Unveil the Finest Selection of High-End Vehicles</p>
                </motion.div>

                {/* Swiper Navigation */}
                <div className="brand__slider position-relative">
                    <div className="swiper__button_main">
                        <div className="custom-swiper-button-prev custom-swiper-button">‹</div>
                        <div className="custom-swiper-button-next custom-swiper-button">›</div>
                    </div>

                    {/* Animated Swiper */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.4 }}
                    >
                        <Swiper
                            modules={[Autoplay, Navigation]}
                            spaceBetween={50}
                            slidesPerView={3}
                            loop={true}
                            // autoplay={{ delay: 2500, disableOnInteraction: false }}
                            navigation={{
                                nextEl: '.custom-swiper-button-next',
                                prevEl: '.custom-swiper-button-prev',
                            }}
                            breakpoints={{
                                320: { slidesPerView: 1, spaceBetween: 20 },
                                576: { slidesPerView: 1, spaceBetween: 30 },
                                768: { slidesPerView: 2, spaceBetween: 40 },
                                992: { slidesPerView: 2, spaceBetween: 50 },
                                1200: { slidesPerView: 3, spaceBetween: 60 },
                            }}
                            className="mySwiper"
                        >
                            {products.map((item, index) => (
                                <SwiperSlide key={item.id}>
                                    <motion.div
                                        custom={index}
                                        variants={cardVariants}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true, amount: 0.5 }}
                                    >
                                        <div className="card">
                                            <div className="card-img">
                                                <img src={item.img} alt={`Aftermarket ${item.id}`} />
                                            </div>
                                            <div className="card-body">
                                                <h5 className="card-title">
                                                    {item.id} Special title treatment
                                                </h5>
                                                <p className="card-text">
                                                    With supporting text below as a natural lead-in to additional content.
                                                </p>
                                                <a href="#" className="btn btn-primary2">
                                                    View Details
                                                </a>
                                            </div>
                                        </div>
                                    </motion.div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
