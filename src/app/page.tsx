import Banner from "@/components/Banner";
import BookingBox from "@/components/BookingBox";
import HotelPanel from "@/components/HotelPanel";
import getHotels from "@/libs/getHotels";
import { Suspense } from "react";
import { LinearProgress } from "@mui/material";
import CardPanel2 from "@/components/hotelscroll";

export default async function Home() {

  const hotels = await getHotels();

  return (
    <main>
      <Banner />
      <BookingBox />
      <Suspense fallback={ <p>Loading... <LinearProgress /></p> }>
        <HotelPanel HotelJson={hotels}/>
      </Suspense>
    </main>
  );
}
