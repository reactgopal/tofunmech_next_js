'use client';

import { FaCheckCircle } from 'react-icons/fa';
import { motion } from "framer-motion";

// import motion

export default function HeroSection() {
    return (
        <section className="hero-section">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-md-8 text-white">
                        <motion.p
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
                            className="hero-subtitle">Find Your Perfect Car Parts</motion.p>

                        <motion.h1
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
                            className="hero-title">
                            Looking for a CarParts?
                            <br className="d-none d-lg-block" />
                            You’re in the perfect spot.
                        </motion.h1>

                        <div className="hero-features d-flex flex-wrap mt-4">
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
                                className="me-4 d-flex align-items-center">
                                <FaCheckCircle className="hero-icon me-2" />
                                <span>High quality at a low cost.</span>
                            </motion.div>
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
                                        delay: 0.2
                                    }
                                }}
                                className="me-4 d-flex align-items-center">
                                <FaCheckCircle className="hero-icon me-2" />
                                <span>Premium services</span>
                            </motion.div>
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
                                        delay: 0.3
                                    }
                                }}
                                className="d-flex align-items-center">
                                <FaCheckCircle className="hero-icon me-2" />
                                <span>24/7 roadside support.</span>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
