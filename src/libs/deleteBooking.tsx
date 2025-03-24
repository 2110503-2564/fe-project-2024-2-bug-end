export default async function deleteBooking(token : string, id: string) {

    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/bookings/${id}` , {
        method: 'DELETE',
        headers : {
            'Content-Type' : 'application/json',
            Authorization : `Bearer ${token}`
        }
    })

    if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData?.error || "Failed to delete booking")
    }

    return await response.json()
}