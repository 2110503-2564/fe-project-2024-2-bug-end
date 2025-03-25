'use client'

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Banner() {
    const covers = ['/img/cover1.png', '/img/cover2.png', '/img/cover3.png'];
    const [index, setIndex] = useState(0);
    const [fade, setFade] = useState(false);
    const { data: session } = useSession();
    console.log(session);

    useEffect(() => {
        const interval = setInterval(() => {
            setFade(true);
            setTimeout(() => {
                setIndex((prevIndex) => (prevIndex + 1) % covers.length);
                setFade(false);
            }, 500);
        }, 10000);

        return () => clearInterval(interval);
    }, []);

        return (
        <div className="block m-0 w-screen h-[70vh] relative">
            <div className={`w-full h-full absolute transition-opacity duration-500 ${fade ? 'opacity-0' : 'opacity-100'}`}>
                <Image
                    src={covers[index]}
                    alt="cover"
                    fill
                    priority
                    className="object-cover rounded-bl-xl rounded-br-xl"
                />
            </div>
            <motion.div
                className="relative top-[200px] z-10 text-center text-white bg-gradient-to-r from-[#D57548] to-[#A32449] py-[10px] px-[20px]"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >
                <motion.h1
                    className="text-5xl font-bold font-serif"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                >
                    See The World for Yourself
                </motion.h1>
                <motion.h3
                    className="text-3xl font-bold font-serif mt-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                >
                    Make Your Great Trip with us
                </motion.h3>
            </motion.div>
        </div>
    );
}