import getHotel from "@/libs/getHotel"
import Image from "next/image"

export default async function HotelDetailPage({ params } : { params: { hid: string } }) {

    const hotelDetail = await getHotel(params.hid)

    return (
        <main className="text-center p-5">
            <h1 className="text-lg font-medium">Hotel ID { hotelDetail.data.id }</h1>
            <div className="flex flex-row my-5">
                <Image 
                    src={ hotelDetail.data.image }
                    alt="Hotel"
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="rounded-lg w-[30%] bg-blaack"
                />
                <div className="text-md mx-5">{ hotelDetail.data.hotelName }</div>
            </div>
        </main>
    )
}