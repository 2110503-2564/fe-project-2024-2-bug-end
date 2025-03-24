export default async function createBooking(token : string , data : any) {

    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/bookings` , {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json',
            Authorization : `Bearer ${token}`
        },
        body : JSON.stringify(data)
    })
        
    if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData?.error || "Failed to create booking")
    }

    return await response.json()
}