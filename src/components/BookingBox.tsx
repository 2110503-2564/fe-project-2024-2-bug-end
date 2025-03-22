"use client"

import { Button, MenuItem, TextField } from "@mui/material"
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";

export default function BookingBox() {

    const [location, setLocation] = useState("");
    const [checkInDate, setCheckInDate] = useState<Dayjs | null>(dayjs());
    const [checkOutDate, setCheckOutDate] = useState<Dayjs | null>(dayjs().add(1, "day"));
    const [guests, setGuests] = useState(1);

    return (
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl mx-auto mt-10">
            <div className="flex space-x-4 mb-4">
                <Button variant="outlined" className="rounded-full px-4 py-1">Overnight Stays</Button>
                <Button variant="outlined" className="rounded-full px-4 py-1">Day Use Stays</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <TextField 
                    label="Enter a destination or property" 
                    variant="outlined" 
                    fullWidth
                    value={location} 
                    onChange={(e) => setLocation(e.target.value)}
                />

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker 
                        label="Check-in Date" 
                        value={checkInDate} 
                        onChange={setCheckInDate} 
                    />
                </LocalizationProvider>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker 
                        label="Check-out Date" 
                        value={checkOutDate} 
                        onChange={setCheckOutDate} 
                    />
                </LocalizationProvider>

                <TextField
                    select
                    label="Guests"
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    variant="outlined"
                    fullWidth
                >
                    {[1, 2, 3, 4, 5].map((num) => (
                        <MenuItem key={num} value={num}>
                            {num} {num === 1 ? "Adult" : "Adults"}
                        </MenuItem>
                    ))}
                </TextField>
            </div>

            {/* Search Button */}
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