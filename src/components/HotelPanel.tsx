import Link from "next/link"
import HotelCard from "./HotelCard"
import { HotelItem, HotelJson } from "../../interfaces"

export default async function HotelPanel({ HotelJson } : { HotelJson : HotelJson }) {

    const hotelJsonReady = await HotelJson

    return (
        <div>
            <div className="text-center font-bold text-2xl">
                Explore { hotelJsonReady.count } Hotels in our catalog
            </div>
            <div className="m-[20px] flex flex-row content-around justify-around flex-wrap p-[10px]">
                {
                    hotelJsonReady.data.map((HotelItem:HotelItem) => (
                        <Link href={`/hotel/${ HotelItem.id }`} className="w-1/5">
                            <HotelCard hotelName={ HotelItem.name } imgSrc={ HotelItem.image }/>
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}