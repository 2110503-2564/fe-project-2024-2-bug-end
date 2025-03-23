"use client"

import { Button, MenuItem, Select } from "@mui/material"
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";

export default function BookingBox() {

    const [hotel, setHotel] = useState("")
    const [checkInDate, setCheckInDate] = useState<Dayjs | null>(dayjs())
    const [checkOutDate, setCheckOutDate] = useState<Dayjs | null>(dayjs().add(1, "day"))

    return (
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl mx-auto mt-10 mb-[150px]">
            <div className="flex space-x-4 mb-4">
                <Button variant="outlined" className="rounded-full px-4 py-1">Overnight Stays</Button>
                <Button variant="outlined" className="rounded-full px-4 py-1">Day Use Stays</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Select 
                    variant="standard"
                    name="hotel"
                    id="hotel"
                    value={hotel}
                    onChange={(e) => { setHotel(e.target.value) }}
                    className="w-full"
                >
                    <MenuItem value="H1">Hotel1</MenuItem>
                    <MenuItem value="H2">Hotel2</MenuItem>
                    <MenuItem value="H3">Hotel3</MenuItem>
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
                    variant="contained" 
                    color="primary" 
                    className="w-full md:w-1/2 text-lg flex items-center justify-center gap-2"
                >
                    Booking
                </Button>
            </div>
        </div>
    )
}