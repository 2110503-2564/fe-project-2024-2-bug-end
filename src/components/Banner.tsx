'use client'

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Banner() {

    const covers = ['/img/cover1.jpg' , '/img/cover2.jpg' , '/img/cover3.jpg']
    const [index , setIndex] = useState(0)
    const router = useRouter()
    const { data : session } = useSession()

    console.log(session?.user?.token)

    return (
        <div 
            className="block p-[5px] m-0 w-screen h-[70vh] relative" 
            onClick={ ()=>{ setIndex(index + 1) } }
        >
            <Image 
                src={covers[index % 3]} 
                alt='cover'
                fill={true}
                priority
                className="object-cover"
            />
            <div className="relative top-[100px] left-auto z-10 text-center text-white bg-blue-400 opacity-90 rounded-lg py-[10px] px-[20px]">
                <h1 className="text-4xl font-medium">See The World for Yourself</h1>
                <h3 className="text-xl font-serif">Make Your Great Trip with us</h3>
            </div>

            {
                session ? 
                <div className="z-20 absolute top-5 right-10 font-semibold text-cyan-800 text-xl">
                    Hello { session.user?.name }
                </div> 
                : null
            }

            <button 
                className="bg-white text-cyan-600 border border-cyan-600 font-semibold py-2 px-2 m-2 rounded z-30 absolute bottom-0 right-0 hover:bg-cyan-600 hover:text-white hover:border-transparent"
                onClick={ (e)=>{ e.stopPropagation(); router.push('/car') } }
            >
                Select Your Hotel that you want to stay
            </button>
        </div>
    );
}