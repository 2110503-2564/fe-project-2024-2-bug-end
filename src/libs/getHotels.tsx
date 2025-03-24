export default async function getHotels() {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null
    
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/hotels` , { 
        headers: {
            "Content-Type": "application/json",
            ...(token ? { "Authorization": `Bearer ${token}` } : {}) 
        },
        next : { tags : ['hotels'] },
        cache: "no-store"
    })

    if(!response.ok) throw new Error("Failed to fetch hotels")
    

    return await response.json()
}