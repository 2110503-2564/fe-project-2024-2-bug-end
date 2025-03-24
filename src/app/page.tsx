import Banner from "@/components/Banner";
import BookingBox from "@/components/BookingBox";
import HotelPanel from "@/components/HotelPanel";
import getHotels from "@/libs/getHotels";
import { Suspense } from "react";
import { LinearProgress } from "@mui/material";

export default async function Home() {

  const hotels = await getHotels();

  return (
    <main>
      <Banner />
      <BookingBox HotelJson={hotels}/>
      <Suspense fallback={ <p>Loading... <LinearProgress /></p> }>
        <HotelPanel HotelJson={hotels}/>
      </Suspense>
    </main>
  );
}
