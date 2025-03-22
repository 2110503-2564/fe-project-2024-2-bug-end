import Image from 'next/image'
import styles from './productcard.module.css'

export default function ProductCard() {
    return (
        <div className="w-[250px] h-[300px] bg-white shadow-lg rounded-xl pt-2">
            <div className="w-full h-[70%] relative">
                <Image 
                    src={'/img/hotel1.png'}
                    alt='Hotel'
                    fill
                    objectFit='cover'
                />
            </div>
            <div className="p-[10px] h-[30%]">Hotel 1</div>
        </div>
    )
}