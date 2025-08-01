"use client"
import { useRouter } from "next/navigation";
import { Categories } from "@/api/services/apiServices";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCategory } from "@/store/reducers/ProductSlice";

import { motion } from "framer-motion";
import Link from "next/link";


export default function ShopCategory() {
    // animation 
    // const ref = useRef < HTMLDivElement > (null);
    // const { scrollYProgress } = useScroll({
    //     target: ref,
    //     offset: ["0 0.8", "0.8 1"]
    // });
    // const scale = useTransform(scrollYProgress, [0, 1], [0.5, 1]);
    // const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

    const router = useRouter();
    const dispatch = useDispatch();
    const { category_list } = useSelector((state) => ({ ...state.products }));
    const [displayedCategory, setDisplayedCategory] = useState([]);
    const [visibleItemCount, setVisibleItemCount] = useState(5);
    const remainingItemCount = category_list?.length - visibleItemCount;
    console.log(displayedCategory, "displayedCategory")
    useEffect(() => {
        Categories().then((res) => {
            if (res?.success) {
                dispatch(addCategory(res?.data))
                setDisplayedCategory(res?.data.slice(0, visibleItemCount));
            }
        }).catch((e) => {
            console.log(e);
        })
    }, [])
    const handleCategoryClick = (e) => {
        if (e.children?.length > 0) {
            router.push(`/catelog/${e.id}`);
        } else {
            router.push(`/shop/${e.name}?cate=cate1`);
        }
    }


    const handleLoadMore = () => {
        setVisibleItemCount(category_list.length);
        setDisplayedCategory(category_list);
    };
    const handleHide = () => {
        setVisibleItemCount(5);
        setDisplayedCategory(category_list?.slice(0, 5));
    }

    return (
        <div
            // ref={ref}
            // style={{
            //     scale,
            //     opacity
            // }}
            className="shop-category section--padding">
            <div className="container">
                <div className="shop-category__area">
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
                        <h3 className="section__heading--maintitle">Shop By Category</h3>
                        <p>Find the perfect ride for any occasion</p>
                    </motion.div>

                    <div className="category-grid ">
                        {displayedCategory?.map((e, i) => {
                            const href = e.children?.length > 0
                                ? `/catelog/${e.id}`
                                : `/shop/${e.name}?cate=cate1`;
                            return (
                                <motion.div className="category-card" key={i}>
                                    {/* <a
                                        onClick={(event) => {
                                            event.preventDefault();
                                            handleCategoryClick(e)
                                        }}
                                    > */}
                                    <Link href={href}>
                                        <img src={e.image || "assets/img/shop-category/1.png"} alt={e.name} className="center" />
                                        <div className="category-content">
                                            <div className="category-title">
                                                {/* <a href={`/catelog/${e.id}`}>{e.name}</a> */}
                                                <h2 style={{ color: "black", textAlign: "center" }} className="categories__content--title">{e.name}</h2>
                                            </div>
                                            {/* <div className="vehicle-count">
                                                <div className="vehicle-count__text">parts</div>
                                                <div className="arrow-icon">→</div>
                                            </div> */}
                                        </div>
                                    </Link>
                                    {/* </a> */}
                                </motion.div>
                            )
                        })}

                    </div>
                    {/* <div>
                        <button className="btn btn-primary" onClick={handleLoadMore}>
                            load more
                        </button>
                    </div> */}
                    <div className="load_btn">
                        {remainingItemCount > 0 && (
                            // <button onClick={handleLoadMore} className="load_more">
                            //   Load More
                            // </button>
                            <motion.button
                                type="button"
                                whileHover={{ scale: 1.1 }}
                                onClick={handleLoadMore}
                                className="load_more"
                            >
                                Load More
                            </motion.button>
                        )}
                    </div>
                    <div className="load_btn">
                        {visibleItemCount === category_list?.length && (
                            <motion.button
                                type="button"
                                whileHover={{ scale: 1.1 }}
                                onClick={handleHide}
                                className="load_more"
                            >
                                Hide
                            </motion.button>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
}
