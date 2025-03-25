"use client"

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import createHotel from "@/libs/createHotel";
import getUserProfile from "@/libs/getUserProfile";
import Link from "next/link";

export default function ManagePage() {

    const { data : session } = useSession()
    const [profile, setProfile] = useState<any>(null);
    const [hotelData, setHotelData] = useState({
        name: "",
        address: "",
        telephoneNumber: "",
        image: "",
      });

    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    useEffect(() => {
        if (session && session?.user?.token) {
            getUserProfile(session.user.token).then((data) => setProfile(data));
        }
    }, [session]);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setHotelData({ ...hotelData, [e.target.name]: e.target.value });
      };
    
      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage(null);
    
        if (!session || !session.user.token) {
          setError("Please login first");
          return;
        }
    
        try {
          const response = await createHotel(session.user.token, hotelData);
          if (response.success) {
            setSuccessMessage("Hotel created successfully!");
            setHotelData({ name: "", address: "", telephoneNumber: "", image: "" }); // เคลียร์ฟอร์ม
          }
        } catch (err: any) {
          setError(err.message);
        }
      };

    if (!session || !profile) return null;
    if (profile.data.role !== "admin") return <p>Access Denied</p>;

    return (
        <main className="bg-slate-100 m-5 p-5">
            {
                (profile.data.role == 'admin') ? 
                <form onSubmit={handleSubmit}>
                    <div className="text-xl text-blue-700 mb-4">Create Hotel</div>
                    <div className="flex items-center w-1/2 my-2">
                    <label className="w-auto block text-gray-700 pr-4" htmlFor="name">
                        Hotel Name
                    </label>
                    <input
                        type="text"
                        required
                        id="name"
                        name="name"
                        value={hotelData.name}
                        onChange={handleChange}
                        placeholder="Hotel Name"
                        className="bg-white border-2 border-gray-200 rounded w-full p-2 text-gray-700 focus:outline-none focus:border-blue-400"
                    />
                    </div>
                    <div className="flex items-center w-1/2 my-2">
                    <label className="w-auto block text-gray-700 pr-4" htmlFor="address">
                        Address
                    </label>
                    <input
                        type="text"
                        required
                        id="address"
                        name="address"
                        value={hotelData.address}
                        onChange={handleChange}
                        placeholder="Address"
                        className="bg-white border-2 border-gray-200 rounded w-full p-2 text-gray-700 focus:outline-none focus:border-blue-400"
                    />
                    </div>
                    <div className="flex items-center w-1/2 my-2">
                    <label className="w-auto block text-gray-700 pr-4" htmlFor="telephoneNumber">
                        Tel.
                    </label>
                    <input
                        type="text"
                        required
                        id="telephoneNumber"
                        name="telephoneNumber"
                        value={hotelData.telephoneNumber}
                        onChange={handleChange}
                        placeholder="0XXXXXXXXX"
                        className="bg-white border-2 border-gray-200 rounded w-full p-2 text-gray-700 focus:outline-none focus:border-blue-400"
                    />
                    </div>
                    <div className="flex items-center w-1/2 my-2">
                    <label className="w-auto block text-gray-700 pr-4" htmlFor="image">
                        Picture
                    </label>
                    <input
                        type="text"
                        required
                        id="image"
                        name="image"
                        value={hotelData.image}
                        onChange={handleChange}
                        placeholder="Image URL"
                        className="bg-white border-2 border-gray-200 rounded w-full p-2 text-gray-700 focus:outline-none focus:border-blue-400"
                    />
                    </div>

                    {error && <p className="text-red-500 text-center">{error}</p>}
                    {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}

                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 rounded mt-4">
                    Add New Hotel
                    </button>
                </form>
                : null
            }
        </main>
    )
}