import getHotel from "@/libs/getHotel"
import Image from "next/image"
import Link from "next/link"

export default async function HotelDetailPage({ params }: { params: { hid: string } }) {

    const hotelDetail = await getHotel(params.hid)

    return (
        <main className="p-5 md:p-10">
            <h1 className="text-3xl font-semibold mb-6 text-gray-800 text-left">{hotelDetail.data.name}</h1>
            <div className="flex flex-col md:flex-row my-5 space-y-6 md:space-y-0 md:space-x-8">
                <div className="flex justify-center md:w-1/3">
                    <Image
                        src={hotelDetail.data.image}
                        alt="Hotel"
                        width={500}
                        height={300}
                        className="rounded-lg shadow-lg object-cover"
                    />
                </div>

                <div className="flex flex-col justify-start md:w-2/3 text-left">
                    <div className="text-md text-gray-600 mb-2">
                        <span className="font-semibold">Address:</span> {hotelDetail.data.address}
                    </div>
                    <div className="text-md text-gray-600 mb-2">
                        <span className="font-semibold">Telephone:</span> {hotelDetail.data.telephoneNumber}
                    </div>

                    <div className="mt-6 text-left">
                        <Link 
                            href="/"
                            className="inline-block px-6 py-3 bg-blue-500 text-white rounded-lg text-lg font-semibold hover:bg-blue-600"
                        >
                            Book Now
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    )
}