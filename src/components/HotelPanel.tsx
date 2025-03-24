import Link from "next/link"
import HotelCard from "./HotelCard"
import { HotelItem, HotelJson } from "../../interfaces"

export default async function CardPanel({ HotelJson } : { HotelJson : HotelJson }) {

    const hotelJsonReady = await HotelJson

    return (
        <div>
            <div className="text-center font-bold text-2xl">
                Explore { hotelJsonReady.count } Hotels in our catalog
            </div>
            <div className="m-[20px] flex flex-row content-around justify-around flex-wrap p-[10px]">
                {
                    hotelJsonReady.data.map((HotelItem:HotelItem) => (
                        <Link href={`/hotel/${ HotelItem.id }`} className="w-[100%] sm:w-[50%] md:w-[30%] lg:w-[20%] p-2 sm:p-4 md:p-4 lg:p-8">
                            <HotelCard hotelName={ HotelItem.name } imgSrc={ HotelItem.image }/>
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}