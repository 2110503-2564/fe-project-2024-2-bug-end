"use client"

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Button, MenuItem, Select } from "@mui/material"
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { HotelItem, HotelJson } from "../../interfaces";
import createBooking from "@/libs/createBooking";

export default function BookingBox({ HotelJson } : { HotelJson : HotelJson }) {

    const { data: session } = useSession()

    const [hotel, setHotel] = useState("")
    const [checkInDate, setCheckInDate] = useState<Dayjs | null>(dayjs())
    const [checkOutDate, setCheckOutDate] = useState<Dayjs | null>(dayjs().add(1, "day"))

    const handleBooking = async (e : React.FormEvent) => {
        e.preventDefault()

        console.log("checkInDate : ", checkInDate?.toString())
        console.log("checkOutDate : ", checkOutDate?.toString())

        if(!hotel || !checkInDate || !checkOutDate) {
            alert("Please fill all the fields")
            return
        }

        const token = session?.user.token

        if(!token) {
            alert("Please login first")
            return
        }

        const data = {
            hotel : hotel,
            checkIn : checkInDate.toDate(),
            checkOut : checkOutDate.toDate()
        }

        try {
            const response = await createBooking(token , data)
            alert("Booking successful!")
            console.log(response)

        } catch(err) {
            console.log(err)
        }
    }

    return (
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl mx-auto mt-10 mb-[50px]">
            <div className="flex space-x-4 mb-4">
                <Button variant="outlined" className="rounded-full px-4 py-1">Overnight Stays</Button>
                <Button variant="outlined" className="rounded-full px-4 py-1">Day Use Stays</Button>
            </div>

            <form onSubmit={handleBooking}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Select 
                        variant="outlined"
                        name="hotel"
                        id="hotel"
                        value={hotel}
                        onChange={(e) => { setHotel(e.target.value) }}
                        className="w-full"
                        MenuProps={{
                            disableScrollLock: true
                        }}  
                    >
                        {
                            HotelJson.data.map((hotelItem: HotelItem) => (
                                <MenuItem key={hotelItem.id} value={hotelItem.id}>
                                    {hotelItem.name}
                                </MenuItem>
                            ))
                        }   
                    </Select>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker 
                            label="Check-in Date" 
                            value={checkInDate} 
                            onChange={(value) => setCheckInDate(value)}
                        />
                    </LocalizationProvider>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker 
                            label="Check-out Date" 
                            value={checkOutDate} 
                            onChange={(value) => setCheckOutDate(value)} 
                        />
                    </LocalizationProvider>
                </div>

                <div className="flex justify-center mt-4">
                    <Button 
                        type="submit"
                        variant="contained" 
                        color="primary" 
                        className="w-full md:w-1/2 text-lg flex items-center justify-center gap-2"
                    >
                        Booking
                    </Button>
                </div>
            </form>
        </div>
    )
}