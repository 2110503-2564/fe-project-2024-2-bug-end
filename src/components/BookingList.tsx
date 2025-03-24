"use client"

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import getBookings from "@/libs/getBookings";
import { BookingItem } from "../../interfaces";
import getUserProfile from "@/libs/getUserProfile";
import deleteBooking from "@/libs/deleteBooking";

interface UserProfile {
    _id: string;
    name: string;
    email: string;
    role: string;
    createdAt: string;
    telephoneNumber: string;
}

export default function BookingList() {
    const { data: session, status } = useSession();
    const [bookings, setBookings] = useState<BookingItem[]>([]);
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const [selectedBooking, setSelectedBooking] = useState<BookingItem | null>(null); // Store the selected booking

    const handleRemoveBooking = async () => {
        if (!selectedBooking) return;

        try {
            const token = session?.user.token;
            if (!token) throw new Error("Please login first");
            await deleteBooking(token, selectedBooking._id);
            setBookings((prevBookings) => prevBookings.filter((booking) => booking._id !== selectedBooking._id));
            setShowPopup(false); // Close the popup after deletion
        } catch (err) {
            console.error("Failed to delete booking:", err);
            setError("Failed to delete booking. Please try again.");
        }
    };

    const openPopup = (booking: BookingItem) => {
        setSelectedBooking(booking); // Set the selected booking
        setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);
        setSelectedBooking(null); // Clear the selected booking
    };

    useEffect(() => {
        if (status === "authenticated" && session?.user?.token) {
            setLoading(true);
            setError(null);
            getUserProfile(session.user.token)
                .then((profileData) => {
                    setProfile(profileData.data); // Ensure profile matches UserProfile
                    return getBookings(session.user.token);
                })
                .then((bdata) => {
                    setBookings(bdata.data);
                })
                .catch((err) => {
                    console.error(err);
                    setError("Failed to load bookings.");
                })
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
            setError("Please log in to view bookings.");
        }
    }, [session, status]);

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
                            <div className="text-xl">{booking.hotel.name}</div>
                            <div className="text-md">Check-in: {new Date(booking.checkIn).toLocaleDateString()}</div>
                            <div className="text-md">Check-out: {new Date(booking.checkOut).toLocaleDateString()}</div>
                            {profile?.role === "admin" && (
                                <>
                                    <div className="text-md">User: {booking.user.name}</div>
                                    <div className="text-md">Email: {booking.user.email}</div>
                                </>
                            )}
                            <button
                                className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 text-white shadow-sm my-2"
                                onClick={() => openPopup(booking)} // Pass the booking to the popup
                            >
                                Remove Booking
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            {showPopup && selectedBooking && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center">
                    <div className="bg-white p-5 rounded shadow-lg">
                        <p>Are you sure you want to delete this booking?</p>
                        <div className="mt-4">
                            <div className="text-lg font-bold">{selectedBooking.hotel.name}</div>
                            <div>Check-in: {new Date(selectedBooking.checkIn).toLocaleDateString()}</div>
                            <div>Check-out: {new Date(selectedBooking.checkOut).toLocaleDateString()}</div>
                            {profile?.role === "admin" && (
                                <>
                                    <div className="text-md">User: {selectedBooking.user.name}</div>
                                    <div className="text-md">Email: {selectedBooking.user.email}</div>
                                </>
                            )}
                        </div>
                        <div className="flex justify-end mt-4">
                            <button
                                className="mr-2 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                                onClick={closePopup}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                                onClick={handleRemoveBooking}
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}