"use client"

import userRegister from "@/libs/userRegister";
import { useState } from "react";
import { useRouter } from "next/navigation"

export default function RegisterPage() {
    const [name, setName] = useState('')
    const [tel, setTel] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const router = useRouter()

    const handleRegister = async (e : React.FormEvent) => {
        e.preventDefault();
        setError('')

        try {
            const user = await userRegister({userName : name , userTel: tel , userEmail : email , userPassword : password})

            router.push('/')
        } catch(err) {
            setError("Failed to register. Please try again later.")
            console.log(err)
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-6">Register</h2>

                <form onSubmit={handleRegister}>
                    <div>
                        <label>Name</label>
                        <input 
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Name"
                        />
                    </div>
                    <div>
                        <label>Tel</label>
                        <input 
                            type="text"
                            value={tel}
                            onChange={(e) => setTel(e.target.value)}
                            required
                            className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Telephone"
                        />
                    </div>
                    <div>
                        <label>Email</label>
                        <input 
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Email"
                        />
                    </div>
                    <div>
                        <label>Password</label>
                        <input 
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full p-3 mb-6 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Password"
                        />
                    </div>

                    {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

                    <div>
                        <button 
                            type="submit"
                            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600"
                        >
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}