import Banner from "@/components/Banner";
import BookingBox from "@/components/BookingBox";
import HotelPanel from "@/components/HotelPanel";
import getHotels from "@/libs/getHotels";

export default async function Home() {

  const hotels = await getHotels();

  return (
    <main>
      <Banner />
      <BookingBox />
      <HotelPanel HotelJson={hotels}/>
    </main>
  );
}
