'use client'

import { useState , useEffect } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";

export default function Banner() {

    const covers = ['/img/cover1.png' , '/img/cover2.png' , '/img/cover3.png']
    const [index , setIndex] = useState(0)
    const [fade, setFade] = useState(false)
    const { data : session } = useSession()

    useEffect(() => {
        const interval = setInterval(() => {
            setFade(true)
            setTimeout(() => {
                setIndex((prevIndex) => (prevIndex + 1) % covers.length)
                setFade(false)
            }, 500)
        }, 30000)

        return () => clearInterval(interval)
    }, [])

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
            <div className="relative top-[100px] z-10 text-center text-white bg-blue-400 opacity-90 rounded-lg py-[10px] px-[20px]">
                <h1 className="text-4xl font-medium">See The World for Yourself</h1>
                <h3 className="text-xl font-serif">Make Your Great Trip with us</h3>
            </div>

            {
                session ? 
                <div className="z-40 absolute top-10 right-10 font-semibold text-cyan-800 text-xl">
                    Hello { session.user?.name }
                </div> 
                : null
            }
        </div>
    );
}