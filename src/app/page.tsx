import Banner from "@/components/Banner";
import BookingBox from "@/components/BookingBox";
import HotelCard from "@/components/HotelCard";

export default function Home() {
  return (
    <main>
      <Banner />
      <BookingBox />
      <div style={{margin:"20px" , display:"flex" , flexDirection:"row" , alignContent:"space-around" , justifyContent:"space-around" , flexWrap:"wrap"}}>
        <HotelCard hotelName="Hotel 1" imgSrc="/img/hotel1.png"/>
        <HotelCard hotelName="Hotel 2" imgSrc="/img/hotel1.png"/>
        <HotelCard hotelName="Hotel 3" imgSrc="/img/hotel1.png"/>
        <HotelCard hotelName="Hotel 4" imgSrc="/img/hotel1.png"/>
      </div>
    </main>
  );
}
