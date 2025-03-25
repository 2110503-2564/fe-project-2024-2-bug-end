"use client"

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Button, MenuItem, Select, InputLabel, FormControl } from "@mui/material"
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
    const [error, setError] = useState<string | null>(null)
    const [successMessage, setSuccessMessage] = useState<string | null>(null)

    const handleBooking = async (e : React.FormEvent) => {
        e.preventDefault()
        setError(null)
        setSuccessMessage(null)

        if(!hotel || !checkInDate || !checkOutDate) {
            setError("Please fill all the fields")
            return
        }

        if (checkInDate.isAfter(checkOutDate)) {
            setError("Check-in date must be after check-out date")
            return
        }

        const duration = checkOutDate.diff(checkInDate, 'day');
        if (duration > 3) {
            setError("The stay cannot exceed 3 days")
            return
        }

        const token = session?.user.token

        if(!token) {
            setError("Please login first")
            return
        }

        const data = {
            hotel : hotel,
            checkIn : checkInDate.toDate(),
            checkOut : checkOutDate.toDate()
        }

        try {
            const response = await createBooking(token , data)
    
            if (response?.status === 201) {
                setSuccessMessage("Booking successful!")
            }

        } catch(err : any) {
            console.log(err)

            setError(err.message)
        }
    }

    return (
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl mx-auto mt-10 mb-[50px] ring">
            <div className="mb-4 text-xl font-bold text-center">Make your booking here!</div>
            <form onSubmit={handleBooking}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormControl fullWidth>
                        <InputLabel id="hotel-label">Hotel</InputLabel>
                        <Select 
                            labelId="hotel-label" 
                            label="Hotel"
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
                    </FormControl>

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

                {error && <div className="text-red-500 text-center mt-4">{error}</div>}
                {successMessage && <div className="text-green-500 text-center mt-4">{successMessage}</div>}
                
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