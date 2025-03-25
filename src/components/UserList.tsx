"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import getAllUsers from "@/libs/getUsers";
import promoteUser from "@/libs/promoteUser";

export default function UserList() {
    const { data: session, status } = useSession();
    const [users, setUsers] = useState<any[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [filter, setFilter] = useState<string>("all");
    const [showConfirm, setShowConfirm] = useState<boolean>(false);
    const [selectedUser, setSelectedUser] = useState<any | null>(null);

    useEffect(() => {
        if (status === "authenticated" && session?.user?.token) {
            setLoading(true);
            setError(null);

            getAllUsers(session.user.token)
                .then((userData) => {
                    setUsers(userData.data);
                    setFilteredUsers(userData.data);
                })
                .catch((err) => {
                    console.error("Failed to fetch users:", err);
                    setError("Failed to load users. Please try again.");
                })
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
            setError("Please log in to view users.");
        }
    }, [session, status]);

    useEffect(() => {
        if (filter === "admin") {
            setFilteredUsers(users.filter((user) => user.role === "admin"));
        } else if (filter === "user") {
            setFilteredUsers(users.filter((user) => user.role === "user"));
        } else {
            setFilteredUsers(users);
        }
    }, [filter, users]);

    const handlePromote = async () => {
        if (!session?.user?.token || !selectedUser) {
            alert("You are not authorized to perform this action.");
            return;
        }

        try {
            await promoteUser(session.user.token, selectedUser._id);
            // alert("User promoted to admin successfully!");
            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user._id === selectedUser._id ? { ...user, role: "admin" } : user
                )
            );
            setShowConfirm(false); // Close the confirmation popup
        } catch (error) {
            console.error("Failed to promote user:", error);
            alert("Failed to promote user. Please try again.");
        }
    };

    const openConfirmPopup = (user: any) => {
        setSelectedUser(user);
        setShowConfirm(true);
    };

    const closeConfirmPopup = () => {
        setSelectedUser(null);
        setShowConfirm(false);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h2 className="text-center text-2xl font-bold my-4">User List</h2>

            <div className="flex justify-center mb-4">
                <button
                    className={`px-4 py-2 mx-2 rounded ${filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                    onClick={() => setFilter("all")}
                >
                    Show All
                </button>
                <button
                    className={`px-4 py-2 mx-2 rounded ${filter === "admin" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                    onClick={() => setFilter("admin")}
                >
                    Admin Only
                </button>
                <button
                    className={`px-4 py-2 mx-2 rounded ${filter === "user" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                    onClick={() => setFilter("user")}
                >
                    User Only
                </button>
            </div>

            {filteredUsers.length === 0 ? (
                <p className="text-xl font-semibold mx-4">No users found.</p>
            ) : (
                <ul>
                    {filteredUsers.map((user) => (
                        <li className="bg-slate-200 rounded px-5 mx-5 py-2 my-2 flex justify-between items-center" key={user._id}>
                            <div>
                                <div className="text-xl">{user.name}</div>
                                <div className="text-md">Email: {user.email}</div>
                                <div className="text-md">Role: {user.role}</div>
                            </div>
                            {user.role !== "admin" && (
                                <button
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                    onClick={() => openConfirmPopup(user)}
                                >
                                    Promote
                                </button>
                            )}
                        </li>
                    ))}
                </ul>
            )}

            {/* Confirmation Popup */}
            {showConfirm && selectedUser && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center">
                    <div className="bg-white p-5 rounded shadow-lg">
                        <p className="text-lg font-bold">Confirm Promotion</p>
                        <p>Are you sure you want to promote {selectedUser.name} to admin?</p>
                        <div className="flex justify-end mt-4">
                            <button
                                className="mr-2 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                                onClick={closeConfirmPopup}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                                onClick={handlePromote}
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