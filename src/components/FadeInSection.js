"use client";

import { motion } from "framer-motion";

export default function FadeInSection({ children }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.5 }}
        >
            {children}
        </motion.div>
    );
}