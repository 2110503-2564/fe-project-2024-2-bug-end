"use client"

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import getBookings from "@/libs/getBookings";
import { BookingItem } from "../../interfaces";

export default function BookingList() {
    const { data : session , status } = useSession();
    const [bookings, setBookings] = useState<BookingItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (status === "authenticated" && session?.user?.token) {
            setLoading(true)
            setError(null)
            getBookings(session.user.token)
                .then((data) => {
                    setBookings(data.data)
                })
                .catch((err) => {
                    console.error(err);
                    setError("Failed to load bookings.")
                })
                .finally(() => setLoading(false))
        } else {
            setLoading(false);
            setError("Please log in to view bookings.");
        }
    }, [session, status])

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h2>My Bookings</h2>
            {bookings.length === 0 ? (
                <p>No bookings found.</p>
            ) : (
                <ul>
                    {bookings.map((booking) => (
                        <li className="bg-slate-200 rounded px-5 mx-5 py-2 my-2" key={booking._id}>
                            <div className="text-xl">{ booking.hotel.name }</div>
                            <div className="text-md">Check-in: {new Date(booking.checkIn).toLocaleDateString()}</div>
                            <div className="text-md">Check-out: {new Date(booking.checkOut).toLocaleDateString()}</div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}