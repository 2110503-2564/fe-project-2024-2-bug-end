export default async function getHotel(id:string) {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null

    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/hotels/${id}` , {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { "Authorization": `Bearer ${token}` } : {})
        },
        cache: "no-store"
    })

    if(!response.ok) throw new Error("Failed to fetch hotel")

    return await response.json()
}