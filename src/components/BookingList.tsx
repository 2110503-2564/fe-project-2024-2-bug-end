"use client"

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import getBookings from "@/libs/getBookings";
import { BookingItem, UserProfile } from "../../interfaces";
import getUserProfile from "@/libs/getUserProfile";
import deleteBooking from "@/libs/deleteBooking";
import updateBooking from "@/libs/updateBooking";

export default function BookingList() {
    const { data: session, status } = useSession();
    const [bookings, setBookings] = useState<BookingItem[]>([]);
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const [selectedBooking, setSelectedBooking] = useState<BookingItem | null>(null); // Store the selected booking
    const [isUpdating, setIsUpdating] = useState<boolean>(false);
    const [checkIn, setCheckIn] = useState<string>("");
    const [checkOut, setCheckOut] = useState<string>("");

    const handleRemoveBooking = async () => {
        if (!selectedBooking) return
        try {
            const token = session?.user.token;
            if (!token) throw new Error("Please login first");
            await deleteBooking(token, selectedBooking._id);
            setBookings((prevBookings) => prevBookings.filter((booking) => booking._id !== selectedBooking._id));
            setShowPopup(false); // Close the popup after deletion
        } catch (err) {
            console.error("Failed to delete booking:", err);
            setError("Failed to delete booking. Please try again.");
            window.location.reload();
        }
    };

    const handleUpdateBooking = async () => {
        if(!selectedBooking) return
        try {
            const token = session?.user.token
            if(!token) throw new Error("Please login first")

            if (!checkIn || !checkOut) {
                setError("Please select both check-in and check-out dates.");
                return;
            }

            const checkInDate = new Date(checkIn);
            const checkOutDate = new Date(checkOut);
            const diffDays = (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24);

            if (checkInDate >= checkOutDate) {
                setError("Check-in date must be before check-out date.");
                return;
            }

            if (diffDays > 3) {
                setError("Check-in and check-out dates must be within 3 days.");
                return;
            }

            const updatedBooking = await updateBooking(token, selectedBooking._id, {
                user: selectedBooking.user,
                hotel: selectedBooking.hotel,
                checkIn,
                checkOut
            })

            if (!updatedBooking?.data) throw new Error("Update failed")

            const updatedBookings = await getBookings(session.user.token);
            setBookings(updatedBookings.data);
            setShowPopup(false)

        } catch(err) {
            console.error("Failed to update booking:", err);
            setError("Failed to update booking. Please try again.");
            window.location.reload();
        }
    }

    const openDeletePopup = (booking: BookingItem) => {
        setSelectedBooking(booking); // Set the selected booking
        setIsUpdating(false)
        setShowPopup(true);
    };

    const openUpdatePopup = (booking: BookingItem) => {
        setSelectedBooking(booking);
        setCheckIn(booking.checkIn.split("T")[0]); // แปลง format วัน
        setCheckOut(booking.checkOut.split("T")[0]);
        setIsUpdating(true);
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

            const storageBookings = sessionStorage.getItem("bookings")
            if(storageBookings) {
                setBookings(JSON.parse(storageBookings))
                setLoading(false)
            } else {
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
            }
        } else {
            setLoading(false);
            setError("Please log in to view bookings.");
        }
    }, [session, status]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h2 className="text-center text-2xl font-bold my-4">My Bookings</h2>

            {
                bookings.length === 0 ? (
                <p className="text-xl font-semibold mx-4">No bookings found.</p>
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
                            <div className="flex gap-2 mt-2">
                                <button
                                    className="rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 text-white shadow-sm"
                                    onClick={() => openUpdatePopup(booking)}
                                >
                                    Update Booking
                                </button>
                                <button
                                    className="rounded-md bg-red-600 hover:bg-red-700 px-3 py-2 text-white shadow-sm"
                                    onClick={() => openDeletePopup(booking)}
                                >
                                    Remove Booking
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
            

            {
                showPopup && selectedBooking && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center">
                    <div className="bg-white p-5 rounded shadow-lg">
                        {
                            isUpdating ? (
                                <div>
                                    <p className="text-lg font-bold">Update Booking</p>
                                    <div className="mt-4">
                                        <div className="text-lg font-bold">{ selectedBooking.hotel.name }</div>
                                        <label className="block mt-2">
                                            Check-in:{" "}
                                            <input 
                                                type="date"
                                                className="border rounded px-2 py-1"
                                                value={checkIn}
                                                onChange={e => setCheckIn(e.target.value)} 
                                            />
                                        </label>
                                        <label className="block mt-2">
                                            Check-out:{" "}
                                            <input 
                                                type="date"
                                                className="border rounded px-2 py-1"
                                                value={checkOut}
                                                onChange={e => setCheckOut(e.target.value)} 
                                            />
                                        </label>
                                    </div>
                                    <div className="flex justify-end mt-4">
                                        <button 
                                            className="mr-2 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                                            onClick={closePopup}
                                        >
                                            Cancel
                                        </button>
                                        <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700" 
                                        onClick={handleUpdateBooking}>
                                            Save
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <p>Are you sure you want to delete this booking?</p>
                                    <div className="mt-4">
                                    <div className="text-lg font-bold">{selectedBooking.hotel.name}</div>
                                    <div>Check-in: {new Date(selectedBooking.checkIn).toLocaleDateString()}</div>
                                    <div>Check-out: {new Date(selectedBooking.checkOut).toLocaleDateString()}</div>
                                    {
                                        profile?.role === "admin" && (
                                            <div>
                                                <div className="text-md">User: {selectedBooking.user.name}</div>
                                                <div className="text-md">Email: {selectedBooking.user.email}</div>
                                            </div>
                                        )
                                    }
                                    </div>
                                    <div className="flex justify-end mt-4">
                                        <button className="mr-2 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400" onClick={closePopup}>
                                            Cancel
                                        </button>
                                        <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700" onClick={handleRemoveBooking}>
                                            Confirm
                                        </button>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            )}
        </div>
    );
}