export default async function getBookings(token : string) {
    
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/bookings` , { 
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization : `Bearer ${token}`
        },
    })

    if (!response.ok) {
        const errorMessage = `Failed to fetch hotels with status code: ${response.status}`;
        throw new Error(errorMessage);
    }

    return await response.json()
}