import Link from "next/link"
import HotelCard from "./HotelCard"
import { HotelItem, HotelJson } from "../../interfaces"

export default function HotelPanel({ HotelJson } : { HotelJson : HotelJson }) {

    return (
        <>
            Explore { HotelJson.count } Hotels in our catalog
            <div className="m-[20px] flex flex-row content-around justify-around flex-wrap p-[10px]">
                {
                    HotelJson.data.map((HotelItem:HotelItem) => (
                        <Link href={`/hotel/${ HotelItem.id }`} className="w-1/5">
                            <HotelCard hotelName={HotelItem.hotelName} imgSrc={ HotelItem.image }/>
                        </Link>
                    ))
                }
            </div>
        </>
    )
}