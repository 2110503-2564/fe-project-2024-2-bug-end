import Image from 'next/image'
import InteractiveCard from './InteractiveCard'

export default function HotelCard({ hotelName , imgSrc } 
: { hotelName : string , imgSrc : string }) {
    return (
        <InteractiveCard contentName={ hotelName }>
            <div className="w-full h-[70%] relative rounded-t-lg">
                <Image 
                    src={ imgSrc }
                    alt='Hotel picture'
                    fill
                    className='object-cover rounded-lg'
                />
            </div>
            <div className="w-full p-[10px] h-[30%]">{ hotelName }</div>
        </InteractiveCard>
    )
}