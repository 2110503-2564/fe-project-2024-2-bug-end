import Banner from "@/components/Banner";
import BookingBox from "@/components/BookingBox";
import HotelCard from "@/components/HotelCard";

export default function Home() {
  return (
    <main>
      <Banner />
      <BookingBox />
      <div style={{margin:"20px" , display:"flex" , flexDirection:"row" , alignContent:"space-around" , justifyContent:"space-around" , flexWrap:"wrap"}}>
        <HotelCard />
        <HotelCard />
        <HotelCard />
        <HotelCard />
      </div>
    </main>
  );
}
