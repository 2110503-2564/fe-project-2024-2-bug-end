export default async function getHotels() {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null
    
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/hotels` , { 
        headers: {
            "Content-Type": "application/json",
            ...(token ? { "Authorization": `Bearer ${token}` } : {}) 
        },
        cache: "no-store"
    })

    if (!response.ok) {
        const errorMessage = `Failed to fetch hotels with status code: ${response.status}`;
        throw new Error(errorMessage);
    }

    return await response.json()
}