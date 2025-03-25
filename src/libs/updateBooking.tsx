export default async function updateBooking(token : string , bookingId : string , data : any) {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/bookings/${bookingId}` , {
        method : "PUT",
        headers : {
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${token}`,
        },
        body : JSON.stringify(data),
    })

    if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData?.error || "Failed to update booking")
    }

    return await response.json()
}