"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { motion } from "framer-motion";


const brands = [
    { name: "Acura", src: "/assets/img/slider/acura.png" },
    { name: "BMW", src: "/assets/img/slider/bmw.png" },
    { name: "Chevrolet", src: "/assets/img/slider/chevrolet.png" },
    { name: "Honda", src: "/assets/img/slider/honda.png" },
    { name: "Jaguar", src: "/assets/img/slider/jaguar.png" },
    { name: "Lexus", src: "/assets/img/slider/lexus.png" },
    { name: "Mercedes‑Benz", src: "/assets/img/slider/mer.png" },
    { name: "Toyota", src: "/assets/img/slider/toyota.png" },
];

export default function CarBrandSlider() {
    return (
        <div className="brand__main section--padding">
            <div className="container">
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
                    <h3 className="section__heading--maintitle">Premium Brands</h3>
                    <p>Unveil the Finest Selection of High-End Vehicles</p>
                </motion.div>
                <Swiper
                    modules={[Autoplay, Navigation]}
                    spaceBetween={24}
                    slidesPerView={5}
                    loop={true}
                    autoplay={{ delay: 2500, disableOnInteraction: false }}
                    breakpoints={{
                        320: { slidesPerView: 2 },
                        576: { slidesPerView: 3 },
                        768: { slidesPerView: 4 },
                        992: { slidesPerView: 5 },
                        1200: { slidesPerView: 6 },
                    }}
                    className="brand-slider"
                >
                    {brands.map((brand) => (
                        <SwiperSlide key={brand.name}>
                            <div className="brand__box">
                                <img
                                    src={brand.src}
                                    alt={brand.name}
                                    className="img-fluid"
                                // style={{ " width: 36.688; height: 27.984; "}}
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}
